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
    'GET /empty': {
      response: {
        204: {};
      };
    };
    'POST /redirect': {
      response: {
        302: {};
      };
    };
    'POST /params/:id/:subid': {
      request: {
        params: {
          id: number;
          subid: string;
        };
      };
      response: {
        200: {};
      };
    };

    'POST /paramswithtypo/:Ids/:subid': {
      request: {
        params: {
          id: number;
          subid: string;
        };
      };
      response: {
        200: {};
      };
    };
  };
}
