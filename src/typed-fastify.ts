import type * as F from 'fastify';
import { Operation, Schema } from './schema';
const addSchema = <
  ServiceSchema extends Schema,
  RawServer extends F.RawServerBase = F.RawServerDefault,
  RawRequest extends F.RawRequestDefaultExpression<RawServer> = F.RawRequestDefaultExpression<RawServer>,
  RawReply extends F.RawReplyDefaultExpression<RawServer> = F.RawReplyDefaultExpression<RawServer>,
  Logger = F.FastifyLoggerInstance,
  ContextConfig = F.ContextConfigDefault,
  S = Service<ServiceSchema, RawServer, RawRequest, RawReply, ContextConfig>
>(
  fastify: F.FastifyInstance<RawServer, RawRequest, RawReply, Logger>,
  opts: {
    jsonSchema: {
      schema: Record<string, any>;
      fastify: Record<string, any>;
    };
    swaggerSecurityMap?: Record<string, any>;
    service: S;
  },
) => {
  const schema = opts.jsonSchema.schema;
  if (schema?.$id) {
    fastify.addSchema(schema);
  } else {
    throw Error('Schema was ignored, $id is missing; Better fastify was not registered...');
  }

  fastify.decorateReply('matches', function (this: F.FastifyReply, routeWithMethod: string) {
    return `${this.request.method} ${this.request.routerPath}` === routeWithMethod;
  });

  fastify.decorateReply('asReply', function (this: F.FastifyReply) {
    return this;
  });

  fastify.addHook('onRoute', (config) => {
    if (config.prefix !== fastify.prefix) return;

    const key = `${config.method} ${config.routePath}`;
    const fastifySchema = opts.jsonSchema.fastify;
    let maybeSchema = fastifySchema[key];
    if (!maybeSchema && config.routePath === '') {
      maybeSchema = fastifySchema[`${config.method} /`];
    }
    if (!maybeSchema && config.routePath === '/') {
      maybeSchema = fastifySchema[`${config.method} /`];
    }

    config.schema = config.schema || {};
    if (maybeSchema) {
      config.schema = {
        ...(config.schema ?? {}),
        ...(opts?.swaggerSecurityMap &&
          opts.swaggerSecurityMap[key] && {
            security: opts.swaggerSecurityMap[key],
          }),
        ...maybeSchema?.request?.properties,
        ...(maybeSchema.response && {
          response: maybeSchema.response,
        }),
      };
    }
  });
  const httpMethods: Set<F.HTTPMethods> = new Set(['DELETE', 'GET', 'HEAD', 'PATCH', 'POST', 'PUT', 'OPTIONS']);

  for (const path in opts.service) {
    if (!Object.hasOwnProperty.call(opts.service, path)) continue;
    const [method, ...route] = path.split(' ');
    const httpMethod = <F.HTTPMethods>String(method).toUpperCase();
    if (!method || !httpMethods.has(httpMethod)) {
      throw Error(`Wrong configuration for ${path}, method [${method}] is unknown HTTP method`);
    }
    const handler = opts.service[path];

    switch (typeof handler) {
      case 'object':
        fastify.route({
          ...handler,
          // @ts-ignore
          handler: handler.handler,
          method: httpMethod,
          url: route.join(' '),
        });
        break;
      case 'function':
        fastify.route({
          method: httpMethod,
          // @ts-ignore
          handler: handler,
          url: route.join(' '),
        });
        break;
      default:
        throw Error(`Unknown handler`);
    }
  }
};

export default addSchema;

type Missing<Candidate extends any, MaybeRequired extends any> = [Candidate, MaybeRequired] extends [never, never]
  ? false
  : [Candidate] extends [never]
  ? true
  : [Candidate] extends [MaybeRequired]
  ? false
  : true;

type ExtractMethodPath<T extends string | number | symbol, M extends F.HTTPMethods> = T extends `${M} ${infer P}`
  ? [M, P]
  : never;

type MP<T extends string | number | symbol> =
  | ExtractMethodPath<T, 'DELETE'>
  | ExtractMethodPath<T, 'GET'>
  | ExtractMethodPath<T, 'HEAD'>
  | ExtractMethodPath<T, 'PATCH'>
  | ExtractMethodPath<T, 'POST'>
  | ExtractMethodPath<T, 'PUT'>
  | ExtractMethodPath<T, 'OPTIONS'>;

interface Reply<
  Op extends Operation,
  Status,
  Content,
  Headers,
  Path extends keyof ServiceSchema['paths'],
  ServiceSchema extends Schema,
  RawServer extends F.RawServerBase = F.RawServerDefault,
  RawRequest extends F.RawRequestDefaultExpression<RawServer> = F.RawRequestDefaultExpression<RawServer>,
  RawReply extends F.RawReplyDefaultExpression<RawServer> = F.RawReplyDefaultExpression<RawServer>,
  ContextConfig = F.ContextConfigDefault
> extends Omit<
    F.FastifyReply<RawServer, RawRequest, RawReply, Router<Op>, ContextConfig>,
    | 'send'
    | 'status'
    | 'statusCode'
    | 'code'
    | 'redirect'
    | 'headers'
    | 'header'
    | 'request'
    | 'getHeader'
    | 'getHeaders'
    | 'then'
  > {
  asReply(this: any): AsReply;
  matches<
    P extends keyof ServiceSchema['paths'],
    IsKnown = P extends Path ? true : false,
    NewOp extends ServiceSchema['paths'][P] = ServiceSchema['paths'][P],
    S = keyof Get<NewOp, 'response'>,
    Content = Get<Get2<NewOp, 'response', S>, 'content'>,
    Headers = Get<Get2<NewOp, 'response', S>, 'headers'>
  >(
    this: any,
    path: IsKnown extends true ? P : Path,
  ): this is IsKnown extends true
    ? Reply<NewOp, S, Content, Headers, P, ServiceSchema, RawServer, RawRequest, RawReply, ContextConfig>
    : never;

  send<
    AllHeaders = Get2<Op['response'], Status, 'headers'>,
    O = [Headers, AllHeaders],
    MissingHeaders = Missing<Headers, AllHeaders>,
    MissingStatus = [Status] extends [never] ? true : false
  >(
    ...payload: [MissingStatus] extends [true]
      ? [Invalid<`Missing status`>]
      : [MissingHeaders] extends [true]
      ? [
          Invalid<`Missing headers: [ ${Extract<
            keyof Omit<AllHeaders, keyof ([Headers] extends [never] ? {} : Headers)>,
            string
          >} ]. Please provide required headers before sending reply.`>,
        ]
      : [Get2<Op['response'], Status, 'content'>] extends [never]
      ? []
      : [Get2<Op['response'], Status, 'content'>]
  ): AsReply;

  readonly request: Request<ServiceSchema, Op, Path, RawServer, RawRequest>;
  readonly statusCode: Status;

  headers<Headers extends Get2<Op['response'], Status, 'headers'>>(
    values: Headers,
  ): OpaqueReply<Op, Status, Content, Headers, Path, ServiceSchema, RawServer, RawRequest, RawReply, ContextConfig>;

  header<Header extends keyof AllHeaders, AllHeaders = Get2<Op['response'], Status, 'headers'>>(
    header: Header,
    value: AllHeaders[Header],
  ): OpaqueReply<
    Op,
    Status,
    Content,
    [Headers] extends [never] ? { [K in Header]: AllHeaders[Header] } : Headers & { [K in Header]: AllHeaders[Header] },
    Path,
    ServiceSchema,
    RawServer,
    RawRequest,
    RawReply,
    ContextConfig
  >;

  getHeader<Header extends keyof Headers>(header: Header): Headers[Header];
  getHeaders(): Headers;

  redirect<Status extends keyof Op['response']>(
    statusCode: Status,
    url: string,
  ): OpaqueReply<Op, Status, Content, Headers, Path, ServiceSchema, RawServer, RawRequest, RawReply, ContextConfig>;
  redirect(
    url: string,
  ): OpaqueReply<Op, 302, Content, Headers, Path, ServiceSchema, RawServer, RawRequest, RawReply, ContextConfig>;

  status<
    Status extends [keyof Op['response']] extends [never]
      ? Invalid<` ${Extract<Path, string>} - has no response`>
      : keyof Op['response']
  >(
    status: Status,
  ): OpaqueReply<Op, Status, Content, Headers, Path, ServiceSchema, RawServer, RawRequest, RawReply, ContextConfig>;
  code<Status extends keyof Op['response']>(
    status: Status,
  ): OpaqueReply<Op, Status, Content, Headers, Path, ServiceSchema, RawServer, RawRequest, RawReply, ContextConfig>;
}

type OpaqueReply<
  Op extends Operation,
  Status,
  Content,
  Headers,
  Path extends keyof ServiceSchema['paths'],
  ServiceSchema extends Schema,
  RawServer extends F.RawServerBase = F.RawServerDefault,
  RawRequest extends F.RawRequestDefaultExpression<RawServer> = F.RawRequestDefaultExpression<RawServer>,
  RawReply extends F.RawReplyDefaultExpression<RawServer> = F.RawReplyDefaultExpression<RawServer>,
  ContextConfig = F.ContextConfigDefault,
  Opaque = Reply<Op, Status, Content, Headers, Path, ServiceSchema, RawServer, RawRequest, RawReply, ContextConfig>
> = Status extends unknown ? Opaque : Content extends unknown ? Opaque : Headers extends unknown ? Opaque : never;

interface Invalid<msg = any> {
  readonly __INVALID__: unique symbol;
}

interface AsReply {
  readonly __REPLY_SYMBOL__: unique symbol;
  then(fulfilled: () => void, rejected: (err: Error) => void): void;
}
const assertAsReply: (any: any) => asserts any is AsReply = () => {};
export const asReply = (any: any) => {
  assertAsReply(any);
  return any;
};
type Get<T, P> = P extends keyof T ? T[P] : never;
type Get2<T, P, P2> = Get<Get<T, P>, P2>;

interface Router<Op extends Operation> {
  Querystring: Get<Op['request'], 'querystring'>;
  Params: Get<Op['request'], 'params'>;
  Body: Get<Op['request'], 'body'>;
  Headers: Get<Op['request'], 'headers'>;
  // force reply to be never, as we expose it via custom reply interface
  Reply: never;
}

interface Request<
  ServiceSchema extends Schema,
  Op extends Operation,
  Path extends keyof ServiceSchema['paths'],
  RawServer extends F.RawServerBase = F.RawServerDefault,
  RawRequest extends F.RawRequestDefaultExpression<RawServer> = F.RawRequestDefaultExpression<RawServer>
> extends Omit<
    F.FastifyRequest<Router<Op>, RawServer, RawRequest>,
    'headers' | 'method' | 'routerMethod' | 'routerPath'
  > {
  readonly method: MP<Path>[0];
  // A payload within a GET request message has no defined semantics; sending a payload body on a GET request might cause some existing implementations to reject the request.
  readonly body: MP<Path>[0] extends 'GET' ? never : Get<Op['request'], 'body'>;
  readonly routerMethod: MP<Path>[0];
  readonly headers: Get<Op['request'], 'headers'>;
  readonly routerPath: MP<Path>[1];
}
type Handler<
  Op extends Operation,
  Path extends keyof ServiceSchema['paths'],
  ServiceSchema extends Schema,
  RawServer extends F.RawServerBase = F.RawServerDefault,
  RawRequest extends F.RawRequestDefaultExpression<RawServer> = F.RawRequestDefaultExpression<RawServer>,
  RawReply extends F.RawReplyDefaultExpression<RawServer> = F.RawReplyDefaultExpression<RawServer>,
  ContextConfig = F.ContextConfigDefault,
  ValidSchema = [Op['response'][keyof Op['response']]] extends [never]
    ? Invalid<` ${Extract<Path, string>} - has no response, every path should have at least one response defined`>
    : true,
  Status extends keyof Op['response'] = keyof Op['response']
> = ValidSchema extends true
  ? (
      this: F.FastifyInstance<RawServer, RawRequest, RawReply, ContextConfig>,
      request: Request<ServiceSchema, Op, Path, RawServer, RawRequest>,
      reply: Reply<Op, never, never, never, Path, ServiceSchema, RawServer, RawRequest, RawReply, ContextConfig> & {
        readonly __unknownReply: unique symbol;
        M: MP<Path>[0];
      },
    ) => AsReply | Promise<AsReply>
  : ValidSchema;

type HandlerObj<
  Op extends Operation,
  Path extends keyof ServiceSchema['paths'],
  ServiceSchema extends Schema,
  RawServer extends F.RawServerBase = F.RawServerDefault,
  RawRequest extends F.RawRequestDefaultExpression<RawServer> = F.RawRequestDefaultExpression<RawServer>,
  RawReply extends F.RawReplyDefaultExpression<RawServer> = F.RawReplyDefaultExpression<RawServer>,
  ContextConfig = F.ContextConfigDefault
> = F.RouteShorthandOptions<RawServer, RawRequest, RawReply, Router<Op>> & {
  handler: Handler<Op, Path, ServiceSchema, RawServer, RawRequest, RawReply, ContextConfig>;
};

export type Service<
  S extends Schema,
  RawServer extends F.RawServerBase = F.RawServerDefault,
  RawRequest extends F.RawRequestDefaultExpression<RawServer> = F.RawRequestDefaultExpression<RawServer>,
  RawReply extends F.RawReplyDefaultExpression<RawServer> = F.RawReplyDefaultExpression<RawServer>,
  ContextConfig = F.ContextConfigDefault
> = {
  [P in keyof S['paths']]:
    | Handler<S['paths'][P], P, S, RawServer, RawRequest, RawReply, ContextConfig>
    | HandlerObj<S['paths'][P], P, S, RawServer, RawRequest, RawReply, ContextConfig>;
};

export type RequestHandler<
  ServiceSchema extends Schema,
  HandlerPaths extends keyof ServiceSchema['paths'],
  RawServer extends F.RawServerBase = F.RawServerDefault,
  RawRequest extends F.RawRequestDefaultExpression<RawServer> = F.RawRequestDefaultExpression<RawServer>,
  RawReply extends F.RawReplyDefaultExpression<RawServer> = F.RawReplyDefaultExpression<RawServer>,
  ContextConfig = F.ContextConfigDefault,
  S = Service<ServiceSchema, RawServer, RawRequest, RawReply, ContextConfig>,
  Paths = ServiceSchema['paths'],
  OpHandler = {
    [Path in HandlerPaths]: Handler<Paths[Path], Path, ServiceSchema, RawServer, RawRequest, RawReply, ContextConfig>;
  }[HandlerPaths]
> = OpHandler extends (...args: any) => any
  ? {
      Request: Parameters<OpHandler>[0];
      AsFastifyRequest: Parameters<OpHandler>[0] extends F.FastifyRequest<any, any, any>
        ? F.FastifyRequest<Router<Paths[keyof Paths]>, RawServer, RawRequest>
        : never;
      Reply: Parameters<OpHandler>[1];
      Return: AsReply | Promise<AsReply>;
      ReturnAsync: Promise<AsReply>;
      AsRoute: OpHandler;
      Paths: HandlerPaths;
    }
  : never;
