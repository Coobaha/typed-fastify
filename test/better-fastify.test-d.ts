import { expectAssignable, expectType } from 'tsd';
import type { RequestHandler, Schema, Service } from '../src';

type User = {
  name: string;
};
const user = {
  name: 'it works',
};
type SharedRequest = {
  headers: {
    authorization?: string;
  };
};

interface ExampleSchema extends Schema {
  paths: {
    'GET /': {
      request: SharedRequest & {
        querystring: {
          getQueryParam?: boolean;
        };
        headers: {
          authorization: string;
          getHeader: string;
        };
        body: {
          isNever: true;
        };
      };
      response: {
        content: {
          200: User;
        };
        headers: {
          'x-custom': string;
        };
      };
    };

    'POST /': {
      request: SharedRequest & {
        body: {
          name: string;
        };
        querystring: {
          postQueryParam?: true;
        };
        headers: {
          postHeader: string;
          postHeader2: string;
        };
      };
      response: {
        content: {
          201: User;
        };
        headers: {
          postHeaderRes: string;
          postHeaderRes2: string;
        };
      };
    };

    'PATCH /': {
      request: SharedRequest;
      response: {
        content: {
          204: 'ok';
        };
      };
    };
  };
}
interface GetAndPost {
  querystring: {
    query: string;
  };
  body: {
    tagsString?: string;
  };
}

interface ExtendedSchema extends ExampleSchema {
  paths: ExampleSchema['paths'] & {
    'PATCH /other': {
      request: SharedRequest;
    };
    'PUT /other': {
      request: SharedRequest & {
        querystring: {
          getQueryParam?: boolean;
        };
      };
      response: {
        content: {
          200: User;
        };
      };
    };
    'GET /test': {
      request: GetAndPost;
      response: {
        content: {
          200: 'ok';
        };
      };
    };
    'POST /test': {
      request: GetAndPost;
      response: {
        content: {
          200: 'ok';
        };
      };
    };
    'PUT /NOT_HANDLED_BY_COMPLEX_HANDLER': {};
  };
}

//<editor-fold desc="handlers that return undefined should not be allowed">
expectType<Service<ExampleSchema>>({
  //@ts-expect-error
  'GET /': () => {
    return undefined;
  },
  //@ts-expect-error
  'POST /': () => {},
});
//</editor-fold>

//<editor-fold desc="handlers that return just a payload should not be allowed">
expectType<Service<ExampleSchema>>({
  //@ts-expect-error
  'GET /': (req, reply) => {
    expectType<'GET'>(req.method);
    expectType<'GET'>(reply.request.method);
    expectType<never>(req.body);
    expectType<'/'>(req.routerPath);
    expectType<'/'>(reply.request.routerPath);
    return {
      name: 'works',
    };
  },
  //@ts-expect-error
  'POST /': () => {
    return {
      name: 'works',
    };
  },
});
//</editor-fold>

//<editor-fold desc="valid handlers">
expectType<Service<ExampleSchema>>({
  'GET /': (req, reply) => {
    const reply200 = reply.status(200);
    reply200
      //@ts-expect-error
      .send({});
    //@ts-expect-error
    reply200.__known;
    expectAssignable<boolean | undefined>(req.query.getQueryParam);
    expectType<never>(req.body);
    req.headers.getHeader;
    //@ts-expect-error
    req.headers.postHeader;

    const knownReply200 = reply200.headers({ 'x-custom': '1' });
    return knownReply200.send(user);
  },
  'POST /': (req, reply) => {
    //@ts-expect-error
    reply.status(200);
    //@ts-expect-error
    req.query.getQueryParam;
    req.headers.postHeader;
    //@ts-expect-error
    req.headers.getHeader;
    expectType<true | undefined>(req.query.postQueryParam);
    expectType<string>(req.body.name);
    const fastifyReply = reply.status(201);
    expectType<201>(fastifyReply.statusCode);
    if (Math.random()) {
      //@ts-expect-error
      return fastifyReply.send(user);
    }

    const retWithHeader1 = fastifyReply.header('postHeaderRes', '1');
    if (Math.random()) {
      //@ts-expect-error
      return retWithHeader1.send(user);
    }
    if (Math.random()) {
      //@ts-expect-error
      return retWithHeader1.header('postHeaderRes2', '2').send();
    }

    return retWithHeader1.header('postHeaderRes2', '2').send(user);
  },
  'PATCH /': (req, reply) => {
    //@ts-expect-error
    reply.status(200);
    //@ts-expect-error
    req.query.getQueryParam;
    return reply.status(204).send('ok');
  },
});

//</editor-fold>

function never(_: never) {
  throw Error('never');
}

//<editor-fold desc="shared wtf handler request/reply types">
type ComplexHandlers = RequestHandler<ExtendedSchema, 'GET /' | 'POST /' | 'PATCH /' | 'PUT /other' | 'PATCH /other'>;
//<editor-fold desc="shared wtf handler request/reply types">
const dd = (req: ComplexHandlers['Request'], reply: ComplexHandlers['Reply']): ComplexHandlers['Return'] => {
  if ('getQueryParam' in reply.request.query) {
    //@ts-expect-error
    reply.request.query.postQueryParam;
    reply.request.query.getQueryParam;
    //@ts-expect-error
    reply.status(200);
  } else if ('postQueryParam' in req.query) {
    req.query.postQueryParam;
    //@ts-expect-error
    req.query.getQueryParam;
  }

  function testHeaders(headers: typeof req['headers'] | typeof reply['request']['headers']) {
    if ('postHeader2' in headers) {
      headers.postHeader2;
      headers.postHeader;
      //@ts-expect-error
      headers.getHeader;
      headers.authorization;
    } else if ('getHeader' in headers) {
      headers.getHeader;
      headers.authorization;
      //@ts-expect-error
      headers.postHeader;
    } else {
      headers.authorization;
      //@ts-expect-error
      headers.postHeader;
      //@ts-expect-error
      headers.getHeader;
    }
  }
  testHeaders(req.headers);
  testHeaders(reply.request.headers);

  switch (req.method) {
    case 'GET':
      req.query.getQueryParam;
      break;
    case 'POST':
      req.body.name;
      req.query.postQueryParam;
      break;
    case 'PATCH':
      expectType<'/' | '/other'>(req.routerPath);
      break;
    case 'PUT':
      expectType<'/' | '/other'>(req.routerPath);
      break;
    default:
      never(req);
  }

  switch (req.routerPath) {
    case '/':
      expectType<'GET' | 'PATCH' | 'POST'>(req.method);
      expectType<'GET' | 'PATCH' | 'POST'>(req.routerMethod);
      break;
    case '/other':
      expectType<'PUT' | 'PATCH'>(req.method);
      expectType<'PUT' | 'PATCH'>(req.routerMethod);
      break;
    default:
      never(req);
  }
  switch (reply.request.method) {
    case 'GET':
      reply.request.query.getQueryParam;
      //@ts-expect-error
      reply.request.query.postQueryParam;
      break;
    case 'POST':
      reply.request.body.name;
      reply.request.query.postQueryParam;
      break;
    case 'PUT':
      break;
    case 'PATCH':
      break;
    default:
      never(reply.request);
  }

  const routerPathWithMethod = `${reply.request.method} ${reply.request.routerPath}` as ComplexHandlers['Paths'];
  switch (routerPathWithMethod) {
    case 'GET /':
      break;
    case 'POST /':
      break;
    case 'PUT /other':
      break;
    case 'PATCH /other':
      break;
    case 'PATCH /':
      break;
    default:
      never(routerPathWithMethod);
  }

  const logByPath = {
    'GET /': () => console.log(1),
    'PUT /other': () => console.log(1),
    'PATCH /other': () => console.log(1),
    'POST /': () => console.log(1),
    'PATCH /': () => console.log(1),
  };
  logByPath[routerPathWithMethod]();

  const randomNumber = Math.random();
  if (randomNumber) {
    //@ts-expect-error
    return reply;
  } else if (randomNumber) {
    const redirect = reply.redirect('/');
    return redirect.send();
  } else if (randomNumber) {
    //@ts-expect-error
    return reply.redirect(200, '/').done();
  }
  if (reply.matches('GET /')) {
    //@ts-expect-error
    reply.request.query.postQueryParam;
    reply.request.query.getQueryParam;
    //@ts-expect-error
    reply.code(204);
    const fastifyReply = reply.status(200);
    const fastifyReply1 = fastifyReply.headers({ 'x-custom': '1' });
    return fastifyReply1.send(user);
    //@ts-expect-error
  } else if (reply.matches('PUT /NOT_HANDLED_BY_COMPLEX_HANDLER')) {
    //@ts-expect-error
    const asReply = reply.done();
    //@ts-expect-error
    return never(asReply);
  } else if (reply.matches('POST /')) {
    //@ts-expect-error
    reply.request.query.getQueryParam;
    if (randomNumber > 0.5) {
      //@ts-expect-error
      return reply;
    }
    if (randomNumber > 0.5) {
      //@ts-expect-error
      return reply.send();
    }

    const of = reply.status(201);

    if (randomNumber > 0.5) {
      //@ts-expect-error
      return of.done();
    }
    const replyWithSecondHeader = of.header('postHeaderRes2', '2');
    //@ts-expect-error
    replyWithSecondHeader.done();
    if (randomNumber) {
      //@ts-expect-error
      replyWithSecondHeader.headers({
        ...replyWithSecondHeader.getHeaders(),
      });

      replyWithSecondHeader.headers({
        postHeaderRes2: replyWithSecondHeader.getHeader('postHeaderRes2'),
        //@ts-expect-error
        postHeaderRes1: replyWithSecondHeader.getHeader('postHeaderRes1'),
      });

      return replyWithSecondHeader
        .headers({
          ...replyWithSecondHeader.getHeaders(),
          postHeaderRes: '1',
        })
        .send(user);
    }
    return replyWithSecondHeader.header('postHeaderRes2', '332').header('postHeaderRes', '3').send(user);
  } else if (reply.matches('PATCH /')) {
    //@ts-expect-error
    reply.status(204).send(1);
    return reply.status(204).send('ok');
  } else if (reply.matches('PUT /other')) {
    return reply.status(200).send({ name: '1' });
  } else if (reply.matches('PATCH /other')) {
    const fastifyReply4 = reply.status(204);
    //@ts-expect-error
    fastifyReply4.send(void 0);
    //@ts-expect-error no status in schema, we should not be allowed to respond
    fastifyReply4.done();
    //@ts-expect-error no status in schema, we should not be allowed to respond
    return reply.done();
  } else {
    never(reply);
    return reply;
  }
};

type TestHandlers = RequestHandler<ExtendedSchema, 'GET /test' | 'POST /test'>;

const testHandler = async (req: TestHandlers['Request'], reply: TestHandlers['Reply']): TestHandlers['ReturnAsync'] => {
  if (reply.matches('GET /test')) {
    return reply.status(200).send('ok');
  } else {
    return reply.status(200).send('ok');
  }
};
expectType<Service<ExtendedSchema>>({
  'GET /': dd,
  'POST /': dd,
  'PATCH /': dd,
  'PUT /other': dd,
  'PATCH /other': dd,
  'GET /test': testHandler,
  'POST /test': testHandler,
  //@ts-expect-error
  'PUT /NOT_HANDLED_BY_COMPLEX_HANDLER': dd as RequestHandler<
    ExtendedSchema,
    'PUT /NOT_HANDLED_BY_COMPLEX_HANDLER'
  >['AsRoute'],
});
//</editor-fold>
