import { HTTPMethods } from 'fastify';
import { IncomingHttpHeaders, OutgoingHttpHeaders } from 'http';
import type { Stream } from 'stream';

// prettier-ignore
export type StatusCode =
    | 100 | '100' // Continue
    | 101 | '101' // Switching Protocols
    | 200 | '200' // OK
    | 201 | '201' // Created
    | 202 | '202' // Accepted
    | 203 | '203' // Non-Authoritative Information
    | 204 | '204' // No Content
    | 205 | '205' // Reset Content
    | 206 | '206' // Partial Content
    | 300 | '300' // Multiple Choices
    | 301 | '301' // Moved Permanently
    | 302 | '302' // Found
    | 303 | '303' // See Other
    | 304 | '304' // Not Modified
    | 305 | '305' // Use Proxy
    | 307 | '307' // Temporary Redirect
    | 400 | '400' // Bad Request
    | 401 | '401' // Unauthorized
    | 402 | '402' // Payment Required
    | 403 | '403' // Forbidden
    | 404 | '404' // Not Found
    | 405 | '405' // Method Not Allowed
    | 406 | '406' // Not Acceptable
    | 407 | '407' // Proxy Authentication Required
    | 408 | '408' // Request Timeout
    | 409 | '409' // Conflict
    | 410 | '410' // Gone
    | 411 | '411' // Length Required
    | 412 | '412' // Precondition Failed
    | 413 | '413' // Payload Too Large
    | 414 | '414' // URI Too Long
    | 415 | '415' // Unsupported Media Type
    | 416 | '416' // Range Not Satisfiable
    | 417 | '417' // Expectation Failed
    | 426 | '426' // Upgrade Required
    | 500 | '500' // Internal Server Error
    | 501 | '501' // Not Implemented
    | 502 | '502' // Bad Gateway
    | 503 | '503' // Service Unavailable
    | 504 | '504' // Gateway Timeout
    | 505 | '505'; // HTTP Version Not Supported;

export interface FastifyError extends Error {
  code: string;
  name: string;
  statusCode?: StatusCode;
}

export type validResponses = object | string | Stream | Buffer | FastifyError;

export interface Operation {
  /*this is for better-fastify plugin to populate swagger docs, see more there*/
  security?: unknown;
  request?: {
    body?: unknown;
    headers?: IncomingHttpHeaders & { [HeaderName in string]?: string };
    params?: unknown;
    querystring?: unknown;
  };
  response?: {
    [Status in StatusCode]?: {
      description?: string;
      content?: validResponses;
      headers?: OutgoingHttpHeaders & { [HeaderName in string]?: string | string[] | number };
    };
  };
}
export interface Schema<SecurityId extends string = string> {
  readonly __SCHEMA_TAG__?: 'BETTER-FASTIFY-SCHEMA';
  paths: Record<`${HTTPMethods} ${string}`, Partial<Operation>>;
}
