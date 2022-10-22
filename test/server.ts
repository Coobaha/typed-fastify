import swagger, { FastifyDynamicSwaggerOptions } from '@fastify/swagger';
import fastify from 'fastify';
import addSchema from '../src';
import { defaultService } from './fixtures';
import type { TestSchema } from './test_schema';
import jsonSchema from './test_schema.gen.json';
import fastifySwaggerUi from '@fastify/swagger-ui';

async function init(): Promise<void> {
  const app = fastify({
    logger: {
      transport: {
        target: 'pino-pretty',
        options: {
          colorize: true,
        },
      },
    },
  });
  await app.register(swagger, {
    exposeRoute: true,
    swagger: {
      info: {
        title: 'api',
        description: 'api',
        version: '0.0.0',
      },
      basePath: '/',
    },
    hideUntagged: false,
  } as FastifyDynamicSwaggerOptions);

  await app.register(fastifySwaggerUi, {
    prefix: '/openapi',
    uiConfig: {
      docExpansion: 'full',
    },
  });

  addSchema<TestSchema>(app, {
    jsonSchema: jsonSchema,
    service: defaultService,
  });

  app.listen({ port: Number(process.env['PORT']) || 3333 }, (err) => {
    if (err) {
      app.log.error(err);
      process.exit(1);
    }
  });
}

init().catch((err) => {
  setTimeout(() => {
    throw err;
  });
});
