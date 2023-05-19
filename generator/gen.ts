// import { resolve } from 'path';
import * as TJS from 'typescript-json-schema';
import { promises as fs, default as nodeFs } from 'fs';
import path from 'path';
import sha256 from 'crypto-js/sha256';
import type { TsConfigJson } from 'type-fest';
import traverse from 'json-schema-traverse';
import mergeAllOf from 'json-schema-merge-allof';
import type { JSONSchema7 } from 'json-schema';

const revision = '__v' + require('../package.json').version; // + Date.now();

async function normalizeSchema(originalSchema: JSONSchema7, rootId: string, newRootId: string) {
  const mergedSchema: JSONSchema7 = mergeAllOf(originalSchema);

  const rootKey = `${rootId}#`;

  // Workaround for fastify-swagger mutations https://github.com/Coobaha/typed-fastify/pull/50
  rootId = `${rootId}#/definitions/`;
  newRootId = `${newRootId}#/properties/`;

  const escapeGenerics = (key: string) => key.replace(/</gim, '__').replace(/>/gim, '__');

  const allValues = new Map<string, JSONSchema7>();

  traverse(mergedSchema, (schema, jsonPtr) => {
    allValues.set(jsonPtr, schema);
  });

  const getRef = ($ref: string) => allValues.get($ref.replace(rootKey, ''));

  traverse(mergedSchema, (schema, jsonPtr, rootSchema, parentJsonPtr, parentKeyword, parentSchema, keyIndex) => {
    // resolve $refs type for array items, otherwise fastify won't compile
    if (schema.type === 'array' && schema.items) {
      const items = schema.items as JSONSchema7['items'];
      if (Array.isArray(items)) {
        items.forEach((item) => {
          if (typeof item === 'object' && item.$ref && !item.type) {
            item.type = getRef(item.$ref)?.type ?? 'object';
          }
        });
      }
    }
    /*{
        "type": "array",
        "items": {
           // Missing TYPE object
          "allOf": [
            {
              "$ref": "..."
            },
          ]
        }
      }*/
    if (schema.type === 'array' && schema.items.allOf && !schema.items.type) {
      schema.items.type = 'object';
    }

    // The "type" keywords with multiple types (other than with "null") are prohibited. Read more https://ajv.js.org/strict-mode.html#strict-types
    if (Array.isArray(schema.type)) {
      schema.anyOf = schema.type.map((type) => ({ type }));
      delete schema.type;
    }

    if (parentSchema && keyIndex && parentKeyword === 'definitions' && jsonPtr.includes('<') && jsonPtr.endsWith('>')) {
      const escapedKey = escapeGenerics(String(keyIndex));
      parentSchema[parentKeyword][escapedKey] = parentSchema[parentKeyword][keyIndex];
      delete parentSchema[parentKeyword][keyIndex];
    }

    if (schema.$ref) {
      schema.$ref = schema.$ref.replace(rootId, newRootId);
      if (schema.type) {
        schema.$ref = escapeGenerics(schema.$ref);
      }
    }
    /* fixes schema extension for response only
     *
     *   type
     *   properties: [...]
     *
     *  to
     *   type
     *   allOf: [$ref, properties]
     * */
    if (schema.type && schema.$ref && parentSchema && parentKeyword && parentSchema[parentKeyword]) {
      if (keyIndex === 'request') {
        const [_, _defs, _schemaName, _props, paths, _props2, _routePath, ...rest] = parentJsonPtr?.split('/') ?? [];
        if (rest.length === 0 && paths === 'paths') {
          return;
        }
      }
      const { $ref, type, ...rest } = schema;
      const next = {
        type,
        allOf: [{ $ref: schema.$ref }, { type, ...rest }],
      };
      if (keyIndex !== undefined) {
        parentSchema[parentKeyword][keyIndex] = next;
      } else {
        parentSchema[parentKeyword] = next;
      }
    }
  });

  mergedSchema.properties = mergedSchema.definitions;
  delete mergedSchema.definitions;

  return mergeAllOf(mergedSchema);
}
export default async (params: { files: string[] }) => {
  const compilerOptions: TsConfigJson['compilerOptions'] = {
    resolveJsonModule: false,
    diagnostics: false,
    checkJs: true,
    skipLibCheck: true,
    skipDefaultLibCheck: true,
    strict: true,
  };

  const PLACEHOLDER_ID = '@__PLACEHOLDER_ID__@' + Date.now();
  const settings: TJS.PartialArgs = {
    required: true,
    ref: true,
    aliasRef: false,
    topRef: true,
    ignoreErrors: true,
    strictNullChecks: true,
    id: PLACEHOLDER_ID,
  };

  let { files } = params;
  files = files.map((file) => path.resolve(process.cwd(), file));
  let program: TJS.Program | undefined = undefined;
  for (const file of files) {
    const { name, dir } = path.parse(file);
    const contents = await fs.readFile(file, 'utf-8');
    const saved = `${dir}/${name}.gen.json`;
    const savedExists = nodeFs.existsSync(saved);
    const $hash = sha256(contents).toString() + revision;
    try {
      if (savedExists) {
        const existing = JSON.parse(await fs.readFile(saved, 'utf-8'));
        if (existing.$hash === $hash) {
          continue;
        }
      }
    } catch (e) {
      console.log(e);
    }

    if (!program) {
      program = TJS.getProgramFromFiles(files, compilerOptions);
    }

    const generator = TJS.buildGenerator(program, settings);

    const symbols = generator?.getMainFileSymbols(program, [file]) ?? [];

    const jsonschema = generator?.getSchemaForSymbols(symbols, true);
    const schema = await normalizeSchema(jsonschema as JSONSchema7, PLACEHOLDER_ID, name);

    console.log('Generating', symbols, 'for', file);

    const fastify: Record<string, { request: Object; response: Object }> = {};

    const $defs = schema.properties ?? {};
    for (const [defName, def] of Object.entries($defs)) {
      if (typeof def === 'boolean') continue;
      if (!def?.properties) continue;
      if (typeof def?.properties.paths === 'boolean') continue;

      const tag = def.properties['__SCHEMA_TAG__'];
      if (!tag || typeof tag === 'boolean') continue;

      if (tag.enum?.length === 1 && tag.enum?.[0] === 'BETTER-FASTIFY-SCHEMA') {
        delete $defs[defName];
      }

      const paths = Object.entries(def.properties.paths?.properties ?? {});

      for (const [path, config] of paths) {
        if (typeof config !== 'object') continue;
        const schema = config?.properties ?? {};

        const key = path;

        if (fastify[key]) {
          throw Error('duplicate found');
        }
        if (typeof schema.response === 'boolean') continue;
        if (typeof schema.response?.properties?.content === 'boolean') continue;

        const response = Object.entries(schema.response?.properties ?? {}).reduce((acc, [status, response]) => {
          if (typeof response !== 'boolean' && response?.properties?.content) {
            acc[status] = response.properties.content;
          }
          return acc;
        }, {} as Record<string, TJS.DefinitionOrBoolean>);
        fastify[key] = {
          // @ts-ignore
          security: schema.security ? true : undefined,
          request: schema.request || {},
          response: response,
        };
      }
    }
    const existing = savedExists ? await fs.readFile(saved, { encoding: 'utf8' }).catch(() => {}) : '';

    schema.$id = name;
    schema.type = 'object';
    schema.properties = $defs;

    const newContents = JSON.stringify(
      {
        schema,
        fastify,
        $hash,
      },
      null,
      2,
    );
    if (existing !== newContents) {
      await fs.writeFile(saved, newContents, { encoding: 'utf8', flag: 'w' });
    }
  }
};
