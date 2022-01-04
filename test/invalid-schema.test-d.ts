import type { RequestHandler, Schema, Service } from '../src';

interface InvalidSchema extends Schema {
  paths: {
    'GET /invalid': {};
    'POST /typoInParam/:uuid': {
      request: {
        params: {
          id: string;
        };
      };
      response: {
        200: {};
      };
    };
  };
}

type GetInvalid = RequestHandler<InvalidSchema, 'GET /invalid'>;

//@ts-expect-error
const getInvalid: GetInvalid['AsRoute'] = (req: any, res: any) => {};
//@ts-expect-error
const postTypoInParam: RequestHandler<InvalidSchema, 'POST /typoInParam/:uuid'>['AsRoute'] = (req: any, res: any) => {};

function never(_: never) {
  throw Error('never');
}

never(getInvalid);
never(postTypoInParam);

const service: Service<InvalidSchema> = {
  //@ts-expect-error
  'GET /invalid': () => {
    return undefined;
  },
  //@ts-expect-error
  'POST /typoInParam/:uuid': () => {
    return undefined;
  },
};

console.log(service);
