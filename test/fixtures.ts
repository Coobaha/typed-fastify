import { Service, asReply } from '../src';
import type { ObjectId, TestSchema } from './test_schema';

export { default as defaultJsonSchema } from './test_schema.gen.json';

class MyObjectId extends String implements ObjectId {
  constructor(private id: string) {
    super(id);
  }
  toString() {
    return this.id;
  }
  toJSON() {
    return this.id;
  }
}
export const defaultService: Service<TestSchema> = {
  'GET /': (req, reply) => {
    if (req.operationPath !== 'GET /') {
      throw new Error('Should never happen');
    }
    return reply
      .status(200)
      .headers({ 'x-custom': '1' })
      .send({ name: `hello, getQueryParam=${req.query.getQueryParam}` });
  },
  'GET /user_and_obj': (req, reply) => {
    return reply.status(200).send([{ name: 'user1' }, { id: '1', type: 'TEST' }, { any: 'thing' }]);
  },
  'POST /jsonify': (req, reply) => {
    const { date, regexp } = req.body;

    return reply.status(200).send({
      date: new Date(date),
      dateString: new Date(date).toDateString(),
      type: typeof date,
      regexpType: typeof regexp,
    });
  },
  'POST /': (req, reply) => {
    if (req.operationPath !== 'POST /') {
      throw new Error('Should never happen');
    }
    const { user: userData } = req.body;
    return reply.status(200).send({
      user: userData,
      msg: `Hello, ${userData.name}, ${typeof userData.name}`,
    });
  },
  'GET /empty': async (req, reply) => {
    const fastifyReply = reply.status(204);
    return fastifyReply.send();
  },
  'POST /redirect': async (req, reply) => {
    return reply.redirect('example.com');
  },
  'POST /params/:id/:subid': (req, reply) => {
    return reply.status(200).send();
  },
  'GET /inferredParams/:id/:castedToNumber': (req, reply) => {
    const payload = `id type is ${typeof req.params.id} and castedToNumber type is ${typeof req.params.castedToNumber}`;
    return reply.status(200).send(payload);
  },
  'POST /testframe': (req, reply) => {
    return reply.status(200).send({
      frame: {
        type: 'TEST',
        id: 'string',
      },
    });
  },
  'GET /objectid': (req, reply) => {
    return reply.status(200).send({ id: new MyObjectId('123') });
  },

  'GET /matches': (req, reply) => {
    if (req.query.match === '/matches' && reply.matches(`GET ${req.query.match}`)) {
      return reply.status(200).send({ value: 'true' });
    }
    return reply.status(200).send({ value: 'false' });
  },
  'GET /asReply': {
    handler: async (req, reply) => {
      if (req.query.reply === 'known') {
        reply.status(200).send({ value: req.query.reply });
        return reply.asReply();
      } else {
        return asReply({ value: req.query.reply });
      }
    },
  },
};
