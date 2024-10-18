import swagger, { FastifyDynamicSwaggerOptions } from '@fastify/swagger';
import { fastify, type FastifyInstance } from 'fastify';
import split from 'split2';
import tap from 'tap';
import t from 'tap';
import addSchema from '../src';
import { defaultJsonSchema, defaultService } from './fixtures';
import fastifySwaggerUi, { FastifySwaggerUiOptions } from '@fastify/swagger-ui';
import formatsPlugin from 'ajv-formats';
import keywordsPlugin from 'ajv-keywords';

type Test = (typeof tap)['Test']['prototype'];

t.cleanSnapshot = (s) => {
  return s.replace(/"date": ".* GMT"+/gim, '"date": "dateString"').replace(/"Date: .* GMT"+/gim, '"Date: dateString"');
};

const buildApp = async ({
  t,
  service,
  jsonSchema = defaultJsonSchema,
  prepare,
}: {
  t: Test;
  service?: typeof defaultService;
  jsonSchema?: typeof defaultJsonSchema;
  prepare?: (app: FastifyInstance) => unknown;
}) => {
  let stream = split(() => {});

  const app = fastify({
    ajv: {
      plugins: [formatsPlugin, [keywordsPlugin, ['typeof', 'instanceof']]],
    },
    logger: {
      stream,
      serializers: {
        req: (req) => {
          t.matchSnapshot(
            {
              Params: req.params,
              Query: req.query,
              Headers: req.headers,
              Body: req.body,
              schema: req.routeOptions.schema,
            },
            `request path:${req.method} ${req.url} id:${req.id}`,
          );

          return {};
        },
        res: (res) => {
          if (res.raw?.finished) {
            t.matchSnapshot(
              {
                Payload: (res.raw as any)._lightMyRequest.payloadChunks.map((x: any) => {
                  try {
                    return JSON.parse(x.toString());
                  } catch (e) {
                    return x.toString();
                  }
                }),
                Headers: (res.raw as any)._header?.split('\r\n').filter(Boolean),
              },
              `response path:${res.request?.method} ${res.request?.url} id:${res.request?.id}`,
            );
          }
          return {
            statusCode: res.statusCode,
          };
        },
        err: (err) => {
          if (err.constructor.name !== 'Error') {
            console.log(err);
            t.fail('should not happen', err);
          } else {
            t.matchSnapshot(err, 'error logs');
          }
          return {
            ...err,
            type: err.name,
            message: err.toString(),
            stack: err.stack ?? '',
          };
        },
      },
    },
  });

  service ??= defaultService;

  await app.register(swagger, {
    exposeRoute: true,
    swagger: {
      info: {
        title: 'api',
        description: 'api',
        version: '0.0.0',
      },
      basePath: '/',
    },
    hideUntagged: false,
  } as FastifyDynamicSwaggerOptions);

  await app.register(fastifySwaggerUi, {
    routePrefix: '/openapi',
    uiConfig: {
      docExpansion: 'full',
      deepLinking: false,
    },
  } satisfies FastifySwaggerUiOptions);

  addSchema(app, {
    jsonSchema,
    service,
  });

  await Promise.resolve(prepare?.(app));
  await app.ready();

  t.teardown(async () => app.close());

  return app;
};

const requiredHeaders = {
  authorization: 'required',
  getHeader: 'isHere',
};

t.test('app starts and GET / works', async (t) => {
  const app = await buildApp({ t });
  const res = await app.inject({
    url: '/',
    headers: requiredHeaders,
  });

  t.matchSnapshot(res.json(), 'happy path');
});

t.test('it sends headers', async (t) => {
  const app = await buildApp({ t });
  const res = await app.inject({
    url: '/',
    headers: requiredHeaders,
  });

  t.matchSnapshot(res.headers, 'x-custom header is present');
});

t.test('response is validated', async (t) => {
  const app = await buildApp({
    t,
    service: {
      ...defaultService,
      'GET /': (req, reply) => {
        return (
          reply
            .status(200)
            .header('x-custom', '1')
            //@ts-expect-error
            .send({ invalid: 1 })
        );
      },
    },
  });

  const res = await app.inject({
    url: '/',
    headers: requiredHeaders,
  });

  t.matchSnapshot(res.json(), 'invalid response');
});

t.test('it validates get query param against schema', async (t) => {
  const app = await buildApp({ t });

  const res = await app.inject({
    url: '/',
    headers: requiredHeaders,
    query: {
      getQueryParam: '1',
    },
  });

  t.matchSnapshot(res.json(), 'wrong type of query param');
});

t.test('it validates headers', async (t) => {
  const app = await buildApp({ t });

  const responses = await Promise.all([
    app.inject({
      url: '/',
      headers: {
        getHeader: 'isHere',
      },
    }),
    app.inject({
      url: '/',
      headers: {
        authorization: 'isHere',
      },
    }),
  ]);

  t.matchSnapshot(
    responses.map((res) => res.json()),
    'missing headers',
  );
});

t.test('GET /user_and_obj works', async (t) => {
  const app = await buildApp({ t });
  const res = await app.inject({
    url: '/user_and_obj',
    method: 'GET',
  });

  t.matchSnapshot(res.json(), 'user_and_obj');
});

t.test('POST / works', async (t) => {
  const app = await buildApp({ t });
  const res = await app.inject({
    url: '/',
    method: 'POST',
    headers: requiredHeaders,
    payload: {
      user: {
        name: 'Test User',
      },
    },
  });

  t.matchSnapshot(res.json(), 'contains user name in msg');
});

t.test('POST / rejects invalid payload', async (t) => {
  const app = await buildApp({ t });
  const res = await app.inject({
    url: '/',
    method: 'POST',
    headers: requiredHeaders,
    payload: {
      user: {
        name: [123, '123'],
      },
    },
  });

  t.matchSnapshot(res.json(), 'invalid user name');
});

t.test('POST / type casts payload when possible', async (t) => {
  const app = await buildApp({ t });
  const res = await app.inject({
    url: '/',
    method: 'POST',
    headers: requiredHeaders,
    payload: {
      user: {
        name: 123,
      },
    },
  });

  t.matchSnapshot(res.json(), '123 was casted to string');
});

t.test('POST /redirect works', async (t) => {
  const app = await buildApp({ t });
  const res = await app.inject({
    url: '/redirect',
    method: 'POST',
  });

  t.equal(res.statusCode, 302);
  t.equal(res.headers.location, 'example.com');
});

t.test('GET /empty works', async (t) => {
  const app = await buildApp({ t });
  const res = await app.inject({
    url: '/empty',
    method: 'GET',
  });

  t.equal(res.statusCode, 204);
});

t.test('POST /params/:id/:subid works', async (t) => {
  const app = await buildApp({ t });
  const res = await app.inject({
    url: '/params/11/22',
    method: 'POST',
  });

  t.equal(res.statusCode, 200);
});

t.test('POST /testframe works', async (t) => {
  const app = await buildApp({ t });
  const res = await app.inject({
    url: '/testframe',
    method: 'POST',
  });

  t.equal(res.statusCode, 200);
});

t.test('GET /inferredParams/:id', async (t) => {
  const app = await buildApp({ t });
  const res = await app.inject({
    url: '/inferredParams/321/123',
    method: 'GET',
  });

  t.equal(res.body, 'id type is string and castedToNumber type is number');
});

t.test('swagger integration works', async (t) => {
  const app = await buildApp({ t });
  const res = await app.inject({
    url: '/openapi/json',
    method: 'GET',
  });

  t.matchSnapshot(res.json(), 'swagger openapi schema');
});

t.test('objectid', async (t) => {
  const app = await buildApp({ t });
  const res = await app.inject({
    url: '/objectid',
    method: 'GET',
  });

  t.matchSnapshot(res.json(), 'swagger openapi schema');
});

t.test('invalid schema', async (t) => {
  await t.rejects(
    buildApp({
      t,
      service: defaultService,
      jsonSchema: {} as typeof defaultJsonSchema,
    }),
  );
});

t.test('invalid GET /matches', async (t) => {
  const app = await buildApp({ t });
  const res = await app.inject({
    url: '/matches',
    method: 'GET',
    query: {
      match: '/invalid',
    },
  });
  t.same(res.json(), { value: 'false' });
});
t.test('valid GET /matches', async (t) => {
  const app = await buildApp({ t });
  const res = await app.inject({
    url: '/matches',
    method: 'GET',
    query: {
      match: '/matches',
    },
  });
  t.same(res.json(), { value: 'true' });
});

t.test('valid GET /asReply', async (t) => {
  const app = await buildApp({ t });
  const res = await app.inject({
    url: '/asReply',
    method: 'GET',
    query: {
      reply: 'unknown',
    },
  });
  t.equal(res.statusCode, 200);
  t.same(res.json(), { value: 'known' });
});

t.test('valid GET /asReply', async (t) => {
  const app = await buildApp({ t });
  const res = await app.inject({
    url: '/asReply',
    method: 'GET',
    query: {
      reply: 'known',
    },
  });
  t.equal(res.statusCode, 200);
  t.same(res.json(), { value: 'known' });
});

t.test('it does not interfere with prefixed plugin', async (t) => {
  const app = await buildApp({
    t,
    prepare: async (fastify) => {
      await fastify.register(
        (app, opts, done) => {
          const schema = {
            response: {
              200: {
                type: 'string',
              },
            },
          };
          app.get('/', { schema }, (req) => {
            return String(req.routeOptions.schema === schema);
          });
          done();
        },
        { prefix: '/prefixed' },
      );
    },
  });

  const res = await app.inject({ url: '/prefixed' });
  t.same(res.body, 'true');
});

t.test('it works with /jsonify', async (t) => {
  const app = await buildApp({ t });
  const res = await app.inject({
    url: '/jsonify',
    method: 'POST',
    payload: { date: new Date(0), regexp: /test/.toString() },
  });

  t.equal(res.statusCode, 200);
  t.same(res.json(), {
    date: new Date(0).toJSON(),
    dateString: 'Thu Jan 01 1970',
    type: 'string',
    regexpType: 'string',
  });
});
t.test('it works with /jsonify 2', async (t) => {
  const app = await buildApp({ t });
  const date = new Date(0).toJSON();
  const res2 = await app.inject({
    url: '/jsonify',
    method: 'POST',
    payload: { date, regexp: '' },
  });
  t.equal(res2.statusCode, 200);

  t.same(res2.json(), { date, dateString: 'Thu Jan 01 1970', type: 'string', regexpType: 'string' });
});
