import fastify from 'fastify';
import tap from 'tap';
import t from 'tap';
import addSchema, { Service } from '../src';
import { TestSchema } from './test_schema';
import jsonSchema from './test_schema.gen.json';

type Test = typeof tap['Test']['prototype'];

t.cleanSnapshot = (s) => {
  return s.replace(/"date": ".* GMT"+/gim, '"date": "dateString"');
};

const defaultService: Service<TestSchema> = {
  'GET /': (req, reply) => {
    let res = reply.status(200).headers({ 'x-custom': '1' }).send({ name: 'hello' });
    return res;
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
};

const buildApp = async (t: Test, service?: Service<TestSchema>) => {
  const app = fastify();

  service ??= defaultService;

  addSchema(app, {
    jsonSchema: jsonSchema,
    service,
  });
  await app.ready();
  t.tearDown(() => void app.close());
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
