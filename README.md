# Typed Fastify

[![Build Status](https://img.shields.io/github/actions/workflow/status/coobaha/typed-fastify/ci.yml?branch=main&logo=github&style=for-the-badge)](https://github.com/coobaha/typed-fastify/actions/workflows/ci.yml)
[![NPM Version](https://img.shields.io/npm/v/@coobaha/typed-fastify.svg?style=for-the-badge)](https://www.npmjs.com/package/@coobaha/typed-fastify)
[![](https://img.shields.io/npm/dm/@coobaha/typed-fastify.svg?style=for-the-badge)](https://www.npmjs.com/package/@coobaha/typed-fastify)

This package adds strong TypeScript support to Fastify request handlers and enforces
handlers to have typed schema which is used to validate request params and replies. From this schema it does two
things:

- static typechecking against TypeScript Schema
  - `request.body`
  - `request.headers`
  - `request.querystring`
  - `request.params`
  - `route.path.params` are also inferred and mapped to `request.params`, it is also not possible to make a typo in schema params
  - `reply` is always based on status, developer won't be able to use plain `reply.send()` but
    forced to explicitly set status first, based on which response type will be inferred
- JSON schema generation from TS Schema (using [typescript-json-schema](https://github.com/YousefED/typescript-json-schema) with custom
  transforms, all `@tjs` annotations can be used to fine-tune output)
  - since we use `typejescript-json-schema`: all known limitations of lib are inherited:
    - Records are not transformed correctly, use `{ [k: string]: string }` instead or hint with `@tjs`
- Runtime validation using generated JSON schema (optional but strongly recommended as it brings extra safety to runtime and ensures that code assumptions about data are correct)

[demo video](https://user-images.githubusercontent.com/2446638/108409543-08b45f00-722f-11eb-905c-06505b57f5fe.mp4)

## Usage

```sh
npm i @coobaha/typed-fastify

pnpm i @coobaha/typed-fastify

yarn add @coobaha/typed-fastify

```

Example of service we want to build

```
GET / => Hello ($querystring.name || world)
```

Simple implementation without schema generation will be following

```typescript
import addSchema, { Schema } from '@coobaha/typed-fastify';
import fastify from 'fastify';

export interface ExampleSchema extends Schema {
  paths: {
    'GET /': {
      request: {
        querystring: {
          name?: string;
        };
      };
      response: {
        200: {
          content: string;
        };
      };
    };
  };
}

const exampleService: Service<ExampleSchema> = {
  'GET /': (req, reply) => {
    // typescript will infer correct types for us
    const name = req.query.name ?? 'World';

    // Calling send directly is not allowed
    // reply.send(`Hello ${name}`)
    // Calling send with wrong payload will result in an error
    // reply.status(200).send(new Date())

    return reply.status(200).send(`Hello ${name}`);
  },
};

const app = fastify();
addSchema(app, {
  // it is strongly recommended to generate json schema to guaruntee runtime validity
  jsonSchema: {},
  service: exampleService,
});

// Start listening.
app.listen(3000, (err: any) => {
  if (err) {
    app.log.error(err);
    process.exit(1);
  }
});
```

Complex examples can be found [typescript tests](./test/typed-fastify.test-d.ts) and
in [integration.test.ts](./test/integration.test.ts).

## JSON schema generation

You can generate json schema from your TS types by using `typed-fastify-schema` or `tfs` bins

```sh
npx tfs gen
```

```
tfs gen [files]

Generates json schemas next to corresponding ts files

Positionals:
  files  glob pattern of files                               [string] [required]

Options:
  --help     Show help                                                 [boolean]
  --version  Show version number                                       [boolean]
```

```sh
# it will generate example_schema.gen.json next to file
npx tfs gen example_schema.ts
```

When schema is generated - just pass it to plugin to have runtime validations 🎉

```typescript
import jsonSchema from './example_schema.gen.json';

// ...

addSchema(app, {
  jsonSchema,
  service,
});
```

### Writing service

1. Handlers in one object
   Type inference will work nicely in this case, you just make TS happy and things are working 🥳

2. Handlers in a different file or separate functions - you will need to hint TS with exact type of handler.

```typescript
import { RequestHandler, Schema } from '@coobaha/typed-fastify';

interface MySchema extends Schema {}

const myHandler: RequestHandler<MySchema, 'GET /hello'>['AsRoute'] = (req, reply) => {};
```

3. When you want to have complex shared handler for multiple endpoints that intersect (share same
   props)

```typescript
import { RequestHandler, Schema } from '@coobaha/typed-fastify';

interface MySchema extends Schema {}

const myHandlers: RequestHandler<MySchema, 'GET /hello' | `GET /hello2`>['AsRoute'] = (req, reply) => {};
```

4. Sometimes properties won't be the same (for instance GET never has body and POST will). In this case you will probably be asked to add types to function params

```typescript
import { RequestHandler, Schema } from '@coobaha/typed-fastify';

interface MySchema extends Schema {}

type MyHandlers = RequestHandler<MySchema, 'GET /hello' | `POST /hello`>;
const myHandlers = (req: MyHandlers['Request'], reply: MyHandlers['Reply']): MyHandlers['Return'] => {};

// if handler is async/await
const myHandlersAsync = async (req: MyHandlers['Request'], reply: MyHandlers['Reply']): MyHandlers['ReturnAsync'] => {};

addSchema(app, {
  jsonSchema: {},
  service: {
    'GET /hello': myHandlers,
    'GET /hello2': myHandlers,
  },
});
```

It might be that TS can't infer exact type of complex handler when passed to `addSchema` so you'll
need to do it manually

```typescript
addSchema(app, {
  jsonSchema: {},
  service: {
    'GET /hello': myHandlers,
    'GET /hello2': myHandlers as RequestHandler<ExtendedSchema, 'GET /hello2'>['AsRoute'],
  },
});
```

### Annotating types

This library is using [typescript-json-schema](https://github.com/YousefED/typescript-json-schema) with custom
transforms for schema generation. All `@tjs` [annotations](https://github.com/YousefED/typescript-json-schema#annotations) can be used to fine-tune schema output

- `@type` can be used to specify end type after using `toJSON, toString` methods of objects like `ObjectID` from MogoDB

- since we use `typejescript-json-schema`: all known limitations are also inherited: - Records are not transformed correctly, use `{ [k: string]: string }` instead or hint with `@tjs`
