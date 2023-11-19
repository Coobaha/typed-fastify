<card-summary>
Create your first schema and service implementation with %pkg%
</card-summary>

# First schema

> This tutorial assumes you already have a basic understanding of [Fastify](https://www.fastify.io/) and already have a
> project with Fastify set up.

With `%pkg%` you always start API development with schema defined in TypeScript.

## Show me the code

Use [CodeSanbox](https://codesandbox.io/p/github/Coobaha/typed-fastify-example?file=%2Fsrc%2Fexample_schema.ts) to quickly try out `%pkg%` with Fastify.

Try different requests `GET /`, `GET /?name=error` and `GET /?name=1&name=2`.
Also try changing the schema and use different types and implement new routes 🤓


## Define schema

Here is an example of an imaginary API schema:

```typescript
// example_schema.ts

import type { Schema } from "@coobaha/typed-fastify";

interface User {
  name: string;
  id: number;
}

interface ResponseError {
  message: string;
  code: number;
}

export interface ExampleSchema extends Schema {
  paths: {
    "GET /": {
      request: {
        querystring: {
          name?: string;
        };
      };
      response: {
        200: {
          content: User;
        };
        404: {
          content: ResponseError;
        };
      };
    };
  };
}
```

## Use schema in service implementation

Create a service implementation that matches the schema:

```typescript
// example_service.ts

import { Service } from "@coobaha/typed-fastify";

import type { ExampleSchema } from "./example_schema";

const exampleService: Service<ExampleSchema> = {
  "GET /": (req, reply) => {
    const name = req.query.name ?? "John";
    if (name === "error") {
      return reply.status(404).send({
        code: 404,
        message: "Not Found",
      });
    }
    return reply.status(200).send({
      id: 1,
      name: name,
     });
  },
};
```

> TypeScript will check that `exampleService` implementation matches the `ExampleSchema` schema.

> We will generate and use json schema for validation in the next step.{style="note"}{style="note"}

## Runtime validation of Request and Response

TypeScript compiler will ensure that `exampelService` is correctly implemented on a type level, but we also want to
validate the request and response at runtime. `%pkg%` can generate JSON schema for us that fastify will use for
validation.

Run the following command in terminal to generate JSON schema:

```bash
npx tfs gen example_schema.ts
```

```json
{
  "schema": {
    "$schema": "http://json-schema.org/draft-07/schema#",
    "$id": "example_schema",
    "properties": {
      "User": {
        "type": "object",
        "required": [
          "id",
          "name"
        ],
        "additionalProperties": false,
        "properties": {
          "name": {
            "type": "string"
          },
          "id": {
            "type": "number"
          }
        }
      },
      "ResponseError": {
        "type": "object",
        "required": [
          "code",
          "message"
        ],
        "additionalProperties": false,
        "properties": {
          "message": {
            "type": "string"
          },
          "code": {
            "type": "number"
          }
        }
      }
    },
    "type": "object"
  },
  "fastify": {
    "GET /": {
      "request": {
        "type": "object",
        "required": [
          "querystring"
        ],
        "additionalProperties": false,
        "properties": {
          "querystring": {
            "type": "object",
            "additionalProperties": false,
            "properties": {
              "name": {
                "type": "string"
              }
            }
          }
        }
      },
      "response": {
        "200": {
          "$ref": "example_schema#/properties/User"
        },
        "404": {
          "$ref": "example_schema#/properties/ResponseError"
        }
      }
    }
  }
}
```

{collapsible="true" collapsed-title="Generated JSON Schema"}


## Add service to Fastify instance

We now have a JSON schema file `example_schema.gen.json` that we can use to validate requests and responses. To wire up
the service to Fastify, we need to add the schema and service to Fastify instance

> You can add this schema to version control and commit it to your repository. 
> This way you can also verify diffs and always have the latest version of the schema in your repository.
> 
> You can also configure file nesting in your Editor to hide generated files from the project view.

In the same file where you defined `exampleService`, add the following code:

```typescript
// example_service.ts

import jsonSchema from './example_schema.gen.json'

// ... other imports and exampleService implementation

const app = fastify();

addSchema(app, {
  jsonSchema: jsonSchema,
  service: exampleService,
});
```

## That's it

You can now run the server and try out the API.

It will have a:
1. Type safe implementation of the service, that matches the schema
2. Runtime validation of request and response
3. Generated JSON schema that allows you to use it for documentation and verification.
                   
You can find the full example code here:

- Interactive playground [CodeSanbox](https://codesandbox.io/p/github/Coobaha/typed-fastify-example?file=%2Fsrc%2Fexample_schema.ts) 
- [typed-fastify-example](https://github.com/coobaha/typed-fastify-example) on GitHub


<seealso style="links">
       <category ref="external">
           <a href="https://codesandbox.io/p/github/Coobaha/typed-fastify-example?file=%2Fsrc%2Fexample_schema.ts">CodeSanbox playground</a>
       </category>
</seealso>
