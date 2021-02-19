import type { RequestHandler, Schema, Service } from '../src';

interface InvalidSchema extends Schema {
  paths: {
    'GET /invalid': {};
  };
}

type GetInvalid = RequestHandler<InvalidSchema, 'GET /invalid'>;

//@ts-expect-error
const getInvalid: GetInvalid['AsRoute'] = (req: any, res: any) => {};

function never(_: never) {
  throw Error('never');
}

never(getInvalid);

const service: Service<InvalidSchema> = {
  //@ts-expect-error
  'GET /invalid': () => {
    return undefined;
  },
};

console.log(service);
