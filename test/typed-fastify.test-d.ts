import { expectAssignable, expectType, expectNotType } from 'tsd';
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
        200: {
          content: User;
          headers: {
            'x-custom': string;
          };
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
        201: {
          content: User;
          headers: {
            postHeaderRes: string;
            postHeaderRes2: string;
          };
        };
      };
    };

    'PATCH /': {
      request: SharedRequest;
      response: {
        204: {
          content: 'ok';
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
      response: {
        204: {
          content: 'ok';
        };
      };
    };
    'PATCH /other_empty': {
      request: SharedRequest;
      response: {
        204: {
          content: never;
        };
      };
    };
    'PUT /other': {
      request: SharedRequest & {
        querystring: {
          getQueryParam?: boolean;
        };
      };
      response: {
        200: {
          content: User;
        };
      };
    };
    'GET /test': {
      request: GetAndPost;
      response: {
        200: {
          content: 'ok';
        };
      };
    };
    'POST /test': {
      request: GetAndPost;
      response: {
        200: {
          content: 'ok';
        };
      };
    };
    'PUT /NOT_HANDLED_BY_COMPLEX_HANDLER': {
      response: {
        200: {};
      };
    };
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
type ComplexHandlers = RequestHandler<
  ExtendedSchema,
  'GET /' | 'POST /' | 'PATCH /' | 'PUT /other' | 'PATCH /other' | 'PATCH /other_empty'
>;
//<editor-fold desc="shared wtf handler request/reply types">
const complexHandlers = (
  req: ComplexHandlers['Request'],
  reply: ComplexHandlers['Reply'],
): ComplexHandlers['Return'] => {
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
      expectType<'/' | '/other' | '/other_empty'>(req.routerPath);
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
    case '/other_empty':
      expectType<'PATCH'>(req.routerMethod);
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
    case 'POST /':
    case 'PUT /other':
    case 'PATCH /other':
    case 'PATCH /other_empty':
    case 'PATCH /':
      break;
    default:
      never(routerPathWithMethod);
  }

  const logByPath = {
    'GET /': () => console.log(1),
    'PUT /other': () => console.log(1),
    'PATCH /other': () => console.log(1),
    'PATCH /other_empty': () => console.log(1),
    'POST /': () => console.log(1),
    'PATCH /': () => console.log(1),
  };
  logByPath[routerPathWithMethod]();

  const randomNumber = Math.random();
  if (randomNumber) {
    //@ts-expect-error
    return reply;
  } else if (randomNumber) {
    return reply.redirect('/');
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
    if (randomNumber) {
      //@ts-expect-error no send was called
      return fastifyReply4;
    }
    return fastifyReply4.send('ok');
  } else if (reply.matches('PATCH /other_empty')) {
    //@ts-expect-error
    reply.send(void 0);
    return reply.status(204).send();
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
  'GET /': complexHandlers,
  'POST /': complexHandlers,
  'PATCH /': complexHandlers,
  'PUT /other': complexHandlers,
  'PATCH /other': complexHandlers,
  'PATCH /other_empty': complexHandlers,
  'GET /test': testHandler,
  'POST /test': testHandler,
  //@ts-expect-error
  'PUT /NOT_HANDLED_BY_COMPLEX_HANDLER': complexHandlers as RequestHandler<
    ExtendedSchema,
    'PUT /NOT_HANDLED_BY_COMPLEX_HANDLER'
  >['AsRoute'],
});
//</editor-fold>

interface EmptyResponses extends Schema {
  paths: {
    'GET /empty': {
      response: {
        204: {};
      };
    };
  };
}

type AsyncEmptyHandler = RequestHandler<EmptyResponses, 'GET /empty'>;
//@ts-expect-error
let handler = (async (req, reply) => {
  return reply.status(204);
}) as AsyncEmptyHandler['AsRoute'];

const handlerSync: AsyncEmptyHandler['AsRoute'] = (req, reply) => {
  return reply.status(204).send();
};
expectType<Service<EmptyResponses>['GET /empty']>(handler);
expectType<Service<EmptyResponses>['GET /empty']>(handlerSync);

//@ts-expect-error
expectType<AsyncEmptyHandler['AsRoute']>((req, reply) => {
  return reply.status(204);
});

expectType<Service<EmptyResponses>>({
  //@ts-expect-error
  'GET /empty': (req, reply) => {
    return reply.status(204);
  },
});
expectType<Service<EmptyResponses>>({
  'GET /empty': (req, reply) => {
    return reply.status(204).send();
  },
});

expectType<AsyncEmptyHandler['AsRoute']>((req, reply) => {
  return reply.status(204).send();
});
expectType<AsyncEmptyHandler['AsRoute']>(async (req, reply) => {
  return reply.status(204).send();
});
expectType<AsyncEmptyHandler['AsRouteObj']>({
  preHandler: async (req, reply) => {
    return reply.status(204).send();
  },
  handler: async (req, reply) => {
    return reply.status(204).send();
  },
});
expectType<Service<EmptyResponses>>({
  'GET /empty': (req, reply) => {
    return reply.status(204).send();
  },
});
expectType<Service<EmptyResponses>>({
  'GET /empty': async (req, reply) => {
    return reply.status(204).send();
  },
});

type Created = Service<EmptyResponses>['GET /empty'];
expectType<Created>(
  //@ts-expect-error
  async (req, reply) => {
    return reply.status(204);
  },
);

const s: Service<EmptyResponses> = {
  //@ts-expect-error
  'GET /empty': async (req, reply) => {
    return reply.status(204);
  },
};
expectType<Service<EmptyResponses>>(s);
//@ts-expect-error
expectType<AsyncEmptyHandler['AsRoute']>(async (req, reply) => {
  return reply.status(204);
});
expectType<AsyncEmptyHandler['AsRouteObj']>({
  //@ts-expect-error
  handler: async (req, reply) => {
    return reply.status(204);
  },
});

//@ts-expect-error
expectType<AsyncEmptyHandler['AsRouteObj']>({});

//@ts-expect-error
expectType<AsyncEmptyHandler['AsRouteObj']>({
  preHandler: async (req, reply) => {
    return reply.status(204).send();
  },
});

expectType<AsyncEmptyHandler['AsRouteObj']>({
  preHandler: async (req, reply) => {
    //@ts-expect-error
    return reply.status(204).send(111);
  },
  handler: async (req, reply) => {
    return reply.status(204).send();
  },
});

interface Redirects extends Schema {
  paths: {
    'POST /redirect': {
      response: {
        302: {};
      };
    };
  };
}

expectType<Service<Redirects>>({
  'POST /redirect': (req, reply) => {
    return reply.redirect('example.com');
  },
});

interface Params extends Schema {
  paths: {
    'GET /params/:ids/:subid': {
      response: {
        200: {};
      };
    };
    'GET /mixed/:shouldBeNumber/:string': {
      request: {
        params: {
          shouldBeNumber: number;
        };
      };
      response: {
        200: {};
      };
    };
    'POST /validation/:present/:missing': {
      request: {
        params: {
          present: string;
        };
      };
      response: {
        200: {};
      };
    };
    'POST /typoInParam/:present': {
      request: {
        params: {
          presentTypo: string;
        };
      };
      response: {
        200: {};
      };
    };
    'POST /params/:ids/:subid': {
      request: {
        params: {
          ids: string;
          subid: string;
        };
      };
      response: {
        200: {};
      };
    };
  };
}

expectType<Service<Params>>({
  'GET /params/:ids/:subid': (req, reply) => {
    req.params.subid;
    req.params.ids;
    //@ts-expect-error
    req.params.subId;
    //@ts-expect-error
    req.params.wrong;
    return reply.status(200).send();
  },
  'GET /mixed/:shouldBeNumber/:string': (req, reply) => {
    expectType<string>(req.params.string);
    expectType<number>(req.params.shouldBeNumber);
    expectNotType<string>(req.params.shouldBeNumber);
    return reply.status(200).send();
  },
  'POST /validation/:present/:missing': (req, reply) => {
    expectType<string>(req.params.present);
    expectType<string>(req.params.missing);
    return reply.status(200).send();
  },
  //@ts-expect-error
  'POST /typoInParam/:present': (req, reply) => {
    return reply.status(200).send();
  },
  'POST /params/:ids/:subid': (req, reply) => {
    req.params.subid;
    return reply.status(200).send();
  },
});
