import type * as F from 'fastify';
import { RouteGenericInterface } from 'fastify/types/route';
import { RequestRouteOptions } from 'fastify/types/request';

import {
  FastifyRequestType,
  FastifyTypeProvider,
  FastifyTypeProviderDefault,
  ResolveFastifyRequestType,
} from 'fastify/types/type-provider';
import { Operation, Schema } from './schema';
import { Jsonlike, Id, Get2, Get, IsEqual, Invalid } from './type-utils';

const addSchema = <
  ServiceSchema extends Schema,
  RawServer extends F.RawServerBase = F.RawServerDefault,
  RawRequest extends F.RawRequestDefaultExpression<RawServer> = F.RawRequestDefaultExpression<RawServer>,
  RawReply extends F.RawReplyDefaultExpression<RawServer> = F.RawReplyDefaultExpression<RawServer>,
  Logger extends F.FastifyBaseLogger = F.FastifyBaseLogger,
  SchemaCompiler extends F.FastifySchema = F.FastifySchema,
  TypeProvider extends FastifyTypeProvider = FastifyTypeProviderDefault,
  ContextConfig = F.ContextConfigDefault,
  S = Service<ServiceSchema, RawServer, RawRequest, RawReply, ContextConfig, SchemaCompiler, TypeProvider, Logger>,
>(
  fastify: F.FastifyInstance<RawServer, RawRequest, RawReply, Logger, TypeProvider>,
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
    throw Error('Schema was ignored, $id is missing; Typed fastify schema was not registered...');
  }

  fastify.decorateReply('matches', function (this: F.FastifyReply, routeWithMethod: string) {
    return `${this.request.method} ${this.request.routeOptions.url}` === routeWithMethod;
  });
  fastify.decorateRequest('operationPath', null);
  fastify.addHook('onRequest', function (req, reply, done) {
    (req as {} as { operationPath: string }).operationPath = `${req.method} ${req.routeOptions.url}`;
    done();
  });
  fastify.decorateReply('asReply', function (this: F.FastifyReply) {
    return this;
  });

  fastify.addHook('onRoute', (config) => {
    if (config.prefix !== fastify.prefix) return;

    const key = `${config.method} ${config.routePath}`;
    const fastifySchema = opts.jsonSchema.fastify;
    let maybeSchema = fastifySchema[key];
    /* c8 ignore start */
    if (!maybeSchema && config.routePath === '') {
      maybeSchema = fastifySchema[`${config.method} /`];
    }
    /* c8 ignore stop */
    if (!maybeSchema && config.routePath === '/') {
      maybeSchema = fastifySchema[`${config.method} /`];
    }

    if (maybeSchema) {
      config.schema = {
        ...config.schema,
        /* c8 ignore start */
        ...(opts?.swaggerSecurityMap &&
          opts.swaggerSecurityMap[key] && {
            security: opts.swaggerSecurityMap[key],
          }),
        ...maybeSchema?.request?.properties,
        /* c8 ignore stop */
        ...(maybeSchema.response && {
          response: maybeSchema.response,
        }),
      };
    }
  });
  const httpMethods: Set<F.HTTPMethods> = new Set([
    'DELETE',
    'GET',
    'HEAD',
    'PATCH',
    'POST',
    'PUT',
    'OPTIONS',
  ] as const);

  for (const path in opts.service) {
    /* c8 ignore next */
    if (!Object.hasOwnProperty.call(opts.service, path)) continue;
    const [method, ...route] = path.split(' ');
    const httpMethod = <F.HTTPMethods>String(method).toUpperCase();
    /* c8 ignore start */
    if (!method || !httpMethods.has(httpMethod)) {
      throw Error(`Wrong configuration for ${path}, method [${method}] is unknown HTTP method`);
    }
    /* c8 ignore stop */
    const handler = opts.service[path];

    const fastifySchema = opts.jsonSchema.fastify;
    const routeSchema = fastifySchema[path];
    const schema = !routeSchema ? {} : {
      ...routeSchema?.request?.properties,
      response: routeSchema?.response,
    }

    switch (typeof handler) {
      case 'object':
        fastify.route({
          ...handler,
          //@ts-expect-error
          handler: handler.handler,
          method: httpMethod,
          url: route.join(' '),
          schema,
        });
        break;
      case 'function':
        fastify.route({
          method: httpMethod,
          // @ts-ignore
          handler: handler,
          url: route.join(' '),
          schema
        });
        break;
      /* c8 ignore start */
      default:
        throw Error(`Unknown handler`);
      /* c8 ignore stop */
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

type ExtractParams<T extends string | number | symbol, Acc = {}> = T extends `${infer _}:${infer P}/${infer R}`
  ? ExtractParams<R, Acc & { [_ in P]: string }>
  : T extends `${infer _}:${infer P}`
    ? Id<Acc & { [_ in P]: string }>
    : Acc;

type ArrayTOrT<T> = T | T[];

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
  ContextConfig = F.ContextConfigDefault,
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
    Headers = Get<Get2<NewOp, 'response', S>, 'headers'>,
  >(
    this: any,
    path: IsKnown extends true ? P : Path,
  ): this is IsKnown extends true
    ? Reply<
        Extract<NewOp, Operation>,
        S,
        Content,
        Headers,
        P,
        ServiceSchema,
        RawServer,
        RawRequest,
        RawReply,
        ContextConfig
      >
    : never;

  send<
    AllHeaders = Get2<Op['response'], Status, 'headers'>,
    MissingHeaders = Missing<Headers, AllHeaders>,
    MissingStatus = [Status] extends [never] ? true : false,
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
          : [Jsonlike<Get2<Op['response'], Status, 'content'>, 'combine'>]
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

  redirect<Status extends keyof Op['response']>(statusCode: Status, url: string): AsReply;
  redirect(url: string): AsReply;

  status<
    Status extends [keyof Op['response']] extends [never]
      ? Invalid<` ${Extract<Path, string>} - has no response`>
      : keyof Op['response'],
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
  Opaque = Reply<Op, Status, Content, Headers, Path, ServiceSchema, RawServer, RawRequest, RawReply, ContextConfig>,
> = Status extends unknown ? Opaque : Content extends unknown ? Opaque : Headers extends unknown ? Opaque : never;

interface AsReply {
  readonly __REPLY_SYMBOL__: unique symbol;
  then(fulfilled: () => void, rejected: (err: Error) => void): void;
}
const assertAsReply: (any: any) => asserts any is AsReply = () => {};
export const asReply = (any: any) => {
  assertAsReply(any);
  return any;
};

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
  RawRequest extends F.RawRequestDefaultExpression<RawServer> = F.RawRequestDefaultExpression<RawServer>,
  SchemaCompiler extends F.FastifySchema = F.FastifySchema,
  TypeProvider extends F.FastifyTypeProvider = F.FastifyTypeProviderDefault,
  ContextConfig = F.ContextConfigDefault,
  Logger extends F.FastifyBaseLogger = F.FastifyBaseLogger,
  OpRequest extends Router<Op> = Router<Op>,
  PathParams = OpRequest['Params'] extends never
    ? ExtractParams<Path>
    : Id<Omit<ExtractParams<Path>, keyof OpRequest['Params']>>,
  RouteGeneric extends RouteGenericInterface = OpRequest['Params'] extends [never]
    ? Omit<Router<Op>, 'Params'> & { Params: PathParams }
    : Omit<Router<Op>, 'Params'> & { Params: Id<PathParams & Router<Op>['Params']> },
  RequestType extends FastifyRequestType = ResolveFastifyRequestType<TypeProvider, SchemaCompiler, RouteGeneric>,
  ROptions extends Omit<RequestRouteOptions<ContextConfig, SchemaCompiler>, 'method' | 'url'> & {
    method: MP<Path>[0];
    url: MP<Path>[1];
    body: Get<Op['request'], 'body'>;
  } = Omit<RequestRouteOptions<ContextConfig, SchemaCompiler>, 'method' | 'url'> & {
    method: MP<Path>[0];
    url: MP<Path>[1];
    body: Get<Op['request'], 'body'>;
  },
> extends Omit<
    F.FastifyRequest<
      RouteGeneric,
      RawServer,
      RawRequest,
      SchemaCompiler,
      TypeProvider,
      ContextConfig,
      Logger,
      RequestType
    >,
    'headers' | 'method' | 'routerMethod' | 'routerPath' | 'routeOptions'
  > {
  readonly operationPath: Path;
  readonly method: ROptions['method'];
  // A payload within a GET request message has no defined semantics; sending a payload body on a GET request might cause some existing implementations to reject the request.
  readonly body: ROptions['method'] extends 'GET' ? never : Jsonlike<ROptions['body'], 'cast'>;
  readonly routeOptions: Id<Readonly<ROptions>>;
  readonly routerMethod: ROptions['method'];
  readonly headers: Get<Op['request'], 'headers'>;
  readonly routerPath: ROptions['url'];
}

type GetInvalidParamsValidation<
  Op extends Operation,
  Path extends keyof ServiceSchema['paths'],
  ServiceSchema extends Schema,
  DifferentKeys = Id<Omit<Router<Op>['Params'], keyof ExtractParams<Path>>>,
> = Router<Op>['Params'] extends never
  ? false
  : IsEqual<DifferentKeys, {}> extends false
    ? Invalid<`request.params keys doesn't match params from router path, probably due to typo in [ ${Extract<
        keyof DifferentKeys,
        string
      >} ] in path: [ ${Extract<MP<Path>[1], string>} ]`>
    : false;

type Handler<
  Op extends Operation,
  Path extends keyof ServiceSchema['paths'],
  ServiceSchema extends Schema,
  RawServer extends F.RawServerBase = F.RawServerDefault,
  RawRequest extends F.RawRequestDefaultExpression<RawServer> = F.RawRequestDefaultExpression<RawServer>,
  RawReply extends F.RawReplyDefaultExpression<RawServer> = F.RawReplyDefaultExpression<RawServer>,
  ContextConfig extends F.ContextConfigDefault = F.ContextConfigDefault,
  SchemaCompiler extends F.FastifySchema = F.FastifySchema,
  TypeProvider extends F.FastifyTypeProvider = F.FastifyTypeProviderDefault,
  Logger extends F.FastifyBaseLogger = F.FastifyBaseLogger,
  InvalidParams = GetInvalidParamsValidation<Op, Path, ServiceSchema>,
  ValidSchema = [Op['response'][keyof Op['response']]] extends [never]
    ? Invalid<`${Extract<Path, string>} - has no response, every path should have at least one response defined`>
    : InvalidParams extends Invalid
      ? InvalidParams
      : true,
> = ValidSchema extends true
  ? (
      this: F.FastifyInstance<RawServer, RawRequest, RawReply, Logger>,
      request: Request<
        ServiceSchema,
        Op,
        Path,
        RawServer,
        RawRequest,
        SchemaCompiler,
        TypeProvider,
        ContextConfig,
        Logger
      >,
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
  ContextConfig extends F.ContextConfigDefault = F.ContextConfigDefault,
  SchemaCompiler extends F.FastifySchema = F.FastifySchema,
  TypeProvider extends F.FastifyTypeProvider = F.FastifyTypeProviderDefault,
  Logger extends F.FastifyBaseLogger = F.FastifyBaseLogger,
  _Handler = Handler<
    Op,
    Path,
    ServiceSchema,
    RawServer,
    RawRequest,
    RawReply,
    ContextConfig,
    SchemaCompiler,
    TypeProvider,
    Logger
  >,
  _Request extends Request<any, any, any> = Parameters<Extract<_Handler, (...args: any) => any>>[0],
  _Reply extends Reply<any, any, any, any, any, any> = Parameters<Extract<_Handler, (...args: any) => any>>[1],
> = Omit<
  F.RouteShorthandOptions<
    RawServer,
    RawRequest,
    RawReply,
    Router<Op>,
    ContextConfig,
    SchemaCompiler,
    TypeProvider,
    Logger
  >,
  'preHandler'
> & {
  handler: _Handler;
  preHandler?: ArrayTOrT<
    (
      this: F.FastifyInstance<RawServer, RawRequest, RawReply, Logger, TypeProvider>,
      request: _Request,
      reply: _Reply,
      done: F.HookHandlerDoneFunction,
    ) => void
  >;
};

export type Service<
  S extends Schema,
  RawServer extends F.RawServerBase = F.RawServerDefault,
  RawRequest extends F.RawRequestDefaultExpression<RawServer> = F.RawRequestDefaultExpression<RawServer>,
  RawReply extends F.RawReplyDefaultExpression<RawServer> = F.RawReplyDefaultExpression<RawServer>,
  ContextConfig extends F.ContextConfigDefault = F.ContextConfigDefault,
  SchemaCompiler extends F.FastifySchema = F.FastifySchema,
  TypeProvider extends FastifyTypeProvider = FastifyTypeProviderDefault,
  Logger extends F.FastifyBaseLogger = F.FastifyBaseLogger,
> = {
  [P in keyof S['paths']]:
    | Handler<
        Extract<S['paths'][P], Operation>,
        P,
        S,
        RawServer,
        RawRequest,
        RawReply,
        ContextConfig,
        SchemaCompiler,
        TypeProvider,
        Logger
      >
    | HandlerObj<
        Extract<S['paths'][P], Operation>,
        P,
        S,
        RawServer,
        RawRequest,
        RawReply,
        ContextConfig,
        SchemaCompiler,
        TypeProvider,
        Logger
      >;
};

export type RequestHandler<
  ServiceSchema extends Schema,
  HandlerPaths extends keyof ServiceSchema['paths'],
  RawServer extends F.RawServerBase = F.RawServerDefault,
  RawRequest extends F.RawRequestDefaultExpression<RawServer> = F.RawRequestDefaultExpression<RawServer>,
  RawReply extends F.RawReplyDefaultExpression<RawServer> = F.RawReplyDefaultExpression<RawServer>,
  ContextConfig extends F.ContextConfigDefault = F.ContextConfigDefault,
  SchemaCompiler extends F.FastifySchema = F.FastifySchema,
  TypeProvider extends FastifyTypeProvider = FastifyTypeProviderDefault,
  Logger extends F.FastifyBaseLogger = F.FastifyBaseLogger,
  Paths = ServiceSchema['paths'],
  OpHandler = {
    [Path in HandlerPaths]: Handler<
      Path extends keyof Paths ? Extract<Paths[Path], Operation> : never,
      Path,
      ServiceSchema,
      RawServer,
      RawRequest,
      RawReply,
      ContextConfig,
      SchemaCompiler,
      TypeProvider,
      Logger
    >;
  }[HandlerPaths],
  OpHandlerObj = {
    [Path in HandlerPaths]: HandlerObj<
      Path extends keyof Paths ? Extract<Paths[Path], Operation> : never,
      Path,
      ServiceSchema,
      RawServer,
      RawRequest,
      RawReply,
      ContextConfig,
      SchemaCompiler,
      TypeProvider,
      Logger
    >;
  }[HandlerPaths],
> = OpHandler extends (...args: any) => any
  ? {
      Request: Parameters<OpHandler>[0];
      AsFastifyRequest: Parameters<OpHandler>[0] extends F.FastifyRequest<any, any, any>
        ? F.FastifyRequest<
            Router<Extract<Paths[keyof Paths], Operation>>,
            RawServer,
            RawRequest,
            SchemaCompiler,
            TypeProvider,
            ContextConfig,
            Logger,
            ResolveFastifyRequestType<TypeProvider, SchemaCompiler, Router<Extract<Paths[keyof Paths], Operation>>>
          >
        : never;
      Reply: Parameters<OpHandler>[1];
      Return: AsReply | Promise<AsReply>;
      ReturnAsync: Promise<AsReply>;
      AsRoute: OpHandler;
      AsRouteObj: OpHandlerObj;
      Paths: HandlerPaths;
    }
  : never;
