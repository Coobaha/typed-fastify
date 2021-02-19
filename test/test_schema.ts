import { Schema } from '../src';

interface SharedRequest {
  headers: {
    authorization?: string;
  };
}

interface User {
  name: string;
}

export interface TestSchema extends Schema {
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
      request: {
        body: {
          user: User;
        };
      };
      response: {
        content: {
          200: { user: User; msg: string };
        };
      };
    };
  };
}
