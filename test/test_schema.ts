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
        200: {
          content: User;
          headers: {
            'x-custom': string;
          };
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
        200: {
          content: { user: User; msg: string };
        };
      };
    };
  };
}
