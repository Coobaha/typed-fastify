import fastify from 'fastify';
import tap from 'tap';
import t from 'tap';
import addSchema, { Service } from '../src';
import { TestSchema } from './test_schema';
import jsonSchema from './test_schema.gen.json';
import split from 'split2';
type Test = typeof tap['Test']['prototype'];
t.cleanSnapshot = (s) => {
  return s.replace(/"date": ".* GMT"+/gim, '"date": "dateString"').replace(/"Date: .* GMT"+/gim, '"Date: dateString"');
};

const defaultService: Service<TestSchema> = {
  'GET /': (req, reply) => {
    return reply.status(200).headers({ 'x-custom': '1' }).send({ name: 'hello' });
  },
  'POST /': (req, reply) => {
    const { user: userData } = req.body;
    return reply.status(200).send({
      user: userData,
      msg: `Hello, ${userData.name}, ${typeof userData.name}`,
    });
  },
  'GET /empty': async (req, reply) => {
    const fastifyReply = reply.status(204);
    return fastifyReply.send();
  },
  'POST /redirect': async (req, reply) => {
    return reply.redirect('example.com');
  },
  'POST /params/:id/:subid': (req, reply) => {
    return reply.status(200).send();
  },
  'POST /paramswithtypo/:Ids/:subid': (req, reply) => {
    return reply.status(200).send();
  },
  'POST /testframe': (req, reply) => {
    return reply.status(200).send({
      frame: {
        type: 'TEST',
        id: 'string',
      },
    });
  },
};

const buildApp = async (t: Test, service?: Service<TestSchema>) => {
  let stream = split(() => {});

  const app = fastify({
    logger: {
      // @ts-ignore
      stream: stream,
      serializers: {
        req: (req: any) => {
          t.matchSnapshot(
            {
              Params: req.params,
              Query: req.query,
              Headers: req.headers,
              Body: req.body,
              schema: req.context.schema,
            },
            `request path:${req.method} ${req.url} id:${req.id}`,
          );
          return {};
        },
        res: (res: any) => {
          if (res.raw.finished) {
            t.matchSnapshot(
              {
                Payload: res.raw._lightMyRequest.payloadChunks.map((x: any) => JSON.parse(x.toString())),
                Headers: res.raw._header?.split('\r\n').filter(Boolean),
              },
              `response path:${res.request.method} ${res.request.url} id:${res.request.id}`,
            );
          }
          return {
            statusCode: res.statusCode,
          };
        },
        err: (err) => {
          if (err.constructor.name !== 'Error') {
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

  addSchema(app, {
    jsonSchema: jsonSchema,
    service,
  });
  await app.ready();
  t.teardown(async () => app.close());
  return app;
};

const requiredHeaders = {
  authorization: 'required',
  getHeader: 'isHere',
};

t.test('app starts and GET / works', async (t) => {
  const app = await buildApp(t);
  const res = await app.inject({
    url: '/',
    headers: requiredHeaders,
  });

  t.matchSnapshot(res.json(), 'happy path');
});

t.test('it sends headers', async (t) => {
  const app = await buildApp(t);
  const res = await app.inject({
    url: '/',
    headers: requiredHeaders,
  });

  t.matchSnapshot(res.headers, 'x-custom header is present');
});

t.test('response is validated', async (t) => {
  const app = await buildApp(t, {
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
  });

  const res = await app.inject({
    url: '/',
    headers: requiredHeaders,
  });

  t.matchSnapshot(res.json(), 'invalid response');
});

t.test('it validates get query param against schema', async (t) => {
  const app = await buildApp(t);

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
  const app = await buildApp(t);

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

t.test('POST / works', async (t) => {
  const app = await buildApp(t);
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
  const app = await buildApp(t);
  const res = await app.inject({
    url: '/',
    method: 'POST',
    headers: requiredHeaders,
    payload: {
      user: {
        name: [123],
      },
    },
  });

  t.matchSnapshot(res.json(), 'invalid user name');
});

t.test('POST / type casts payload when possible', async (t) => {
  const app = await buildApp(t);
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
  const app = await buildApp(t);
  const res = await app.inject({
    url: '/redirect',
    method: 'POST',
  });

  t.equal(res.statusCode, 302);
  t.equal(res.headers.location, 'example.com');
});

t.test('GET /empty works', async (t) => {
  const app = await buildApp(t);
  const res = await app.inject({
    url: '/empty',
    method: 'GET',
  });

  t.equal(res.statusCode, 204);
});

t.test('POST /params/:id/:subid works', async (t) => {
  const app = await buildApp(t);
  const res = await app.inject({
    url: '/params/11/22',
    method: 'POST',
  });

  t.equal(res.statusCode, 200);
});

t.test('POST /testframe works', async (t) => {
  const app = await buildApp(t);
  const res = await app.inject({
    url: '/testframe',
    method: 'POST',
  });

  t.equal(res.statusCode, 200);
});

t.test('POST /paramswithtypo/:Ids/:subid', async (t) => {
  const app = await buildApp(t);
  const res = await app.inject({
    url: '/params/paramswithtypo/22',
    method: 'POST',
  });

  t.equal(res.statusCode, 400);
});
