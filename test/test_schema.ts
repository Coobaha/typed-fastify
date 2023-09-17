import { Schema } from '../src';

interface SharedRequest {
  headers: {
    authorization?: string;
  };
}

interface User {
  name: string;
}

interface Obj {
  type: string;
  /** @format uuid*/
  id: string;
}

/**
 @type string
*/
export interface ObjectId extends String {
  toString(): string;
  toJSON(): string;
}

type TestObj = Omit<Obj, 'type'> & { type: 'TEST' };

type RecordStringString = { [k: string]: string | number };

type UserAndObj = [User, TestObj, RecordStringString];

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
    'GET /user_and_obj': {
      response: {
        200: {
          content: UserAndObj;
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

    'POST /testframe': {
      response: {
        200: {
          content: {
            frame: TestObj;
          };
        };
      };
    };
    'GET /inferredParams/:id/:castedToNumber': {
      request: {
        params: {
          castedToNumber: number;
        };
      };
      response: {
        200: {
          content: string;
        };
      };
    };

    'GET /matches': {
      request: {
        querystring: {
          match: string;
        };
      };
      response: {
        200: {
          content: {
            value: 'true' | 'false';
          };
        };
      };
    };
    'GET /asReply': {
      request: {
        querystring: {
          reply: string;
        };
      };
      response: {
        200: {
          content: {
            value: 'known';
          };
        };
      };
    };
    'GET /objectid': {
      response: {
        200: {
          content: {
            id: ObjectId;
          };
        };
      };
    };
  };
}
