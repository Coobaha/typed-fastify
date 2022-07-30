/* IMPORTANT
 * This snapshot file is auto-generated, but designed for humans.
 * It should be checked into source control and tracked carefully.
 * Re-generate by setting TAP_SNAPSHOT=1 and running tests.
 * Make sure to inspect the output below.  Do not ignore changes!
 */
'use strict'
exports[`test/integration.test.ts TAP GET /empty works > request path:GET /empty id:req-1 1`] = `
Object {
  "Body": undefined,
  "Headers": Object {
    "host": "localhost:80",
    "user-agent": "lightMyRequest",
  },
  "Params": Object {},
  "Query": Object {},
  "schema": Object {
    "response": Object {},
  },
}
`

exports[`test/integration.test.ts TAP GET /empty works > response path:GET /empty id:req-1 1`] = `
Object {
  "Headers": Array [
    "HTTP/1.1 204 No Content",
    "Date: dateString",
    "Connection: keep-alive",
  ],
  "Payload": Array [],
}
`

exports[`test/integration.test.ts TAP GET /inferredParams/:id > request path:GET /inferredParams/321/123 id:req-1 1`] = `
Object {
  "Body": undefined,
  "Headers": Object {
    "host": "localhost:80",
    "user-agent": "lightMyRequest",
  },
  "Params": Object {
    "castedToNumber": "123",
    "id": "321",
  },
  "Query": Object {},
  "schema": Object {
    "params": Object {
      "properties": Object {
        "castedToNumber": Object {
          "type": "number",
        },
      },
      "required": Array [
        "castedToNumber",
      ],
      "type": "object",
    },
    "response": Object {
      "200": Object {
        "type": "string",
      },
    },
  },
}
`

exports[`test/integration.test.ts TAP GET /inferredParams/:id > response path:GET /inferredParams/321/123 id:req-1 1`] = `
Object {
  "Headers": Array [
    "HTTP/1.1 200 OK",
    "content-type: text/plain; charset=utf-8",
    "content-length: 51",
    "Date: dateString",
    "Connection: keep-alive",
  ],
  "Payload": Array [
    "id type is string and castedToNumber type is number",
  ],
}
`

exports[`test/integration.test.ts TAP POST / rejects invalid payload > error logs 1`] = `
Error: body/user/name must be string {
  "statusCode": 400,
  "validation": Array [
    Object {
      "instancePath": "/user/name",
      "keyword": "type",
      "message": "must be string",
      "params": Object {
        "type": "string",
      },
      "schemaPath": "test_schema#/definitions/User/properties/name/type",
    },
  ],
  "validationContext": "body",
}
`

exports[`test/integration.test.ts TAP POST / rejects invalid payload > invalid user name 1`] = `
Object {
  "error": "Bad Request",
  "message": "body/user/name must be string",
  "statusCode": 400,
}
`

exports[`test/integration.test.ts TAP POST / rejects invalid payload > request path:POST / id:req-1 1`] = `
Object {
  "Body": undefined,
  "Headers": Object {
    "authorization": "required",
    "content-length": "29",
    "content-type": "application/json",
    "getheader": "isHere",
    "host": "localhost:80",
    "user-agent": "lightMyRequest",
  },
  "Params": Object {},
  "Query": Object {},
  "schema": Object {
    "body": Object {
      "properties": Object {
        "user": Object {
          "$ref": "test_schema#/definitions/User",
        },
      },
      "required": Array [
        "user",
      ],
      "type": "object",
    },
    "response": Object {
      "200": Object {
        "properties": Object {
          "msg": Object {
            "type": "string",
          },
          "user": Object {
            "$ref": "test_schema#/definitions/User",
          },
        },
        "required": Array [
          "msg",
          "user",
        ],
        "type": "object",
      },
    },
  },
}
`

exports[`test/integration.test.ts TAP POST / rejects invalid payload > response path:POST / id:req-1 1`] = `
Object {
  "Headers": Array [
    "HTTP/1.1 400 Bad Request",
    "content-type: application/json; charset=utf-8",
    "content-length: 82",
    "Date: dateString",
    "Connection: keep-alive",
  ],
  "Payload": Array [
    Object {
      "error": "Bad Request",
      "message": "body/user/name must be string",
      "statusCode": 400,
    },
  ],
}
`

exports[`test/integration.test.ts TAP POST / type casts payload when possible > 123 was casted to string 1`] = `
Object {
  "msg": "Hello, 123, string",
  "user": Object {
    "name": "123",
  },
}
`

exports[`test/integration.test.ts TAP POST / type casts payload when possible > request path:POST / id:req-1 1`] = `
Object {
  "Body": undefined,
  "Headers": Object {
    "authorization": "required",
    "content-length": "21",
    "content-type": "application/json",
    "getheader": "isHere",
    "host": "localhost:80",
    "user-agent": "lightMyRequest",
  },
  "Params": Object {},
  "Query": Object {},
  "schema": Object {
    "body": Object {
      "properties": Object {
        "user": Object {
          "$ref": "test_schema#/definitions/User",
        },
      },
      "required": Array [
        "user",
      ],
      "type": "object",
    },
    "response": Object {
      "200": Object {
        "properties": Object {
          "msg": Object {
            "type": "string",
          },
          "user": Object {
            "$ref": "test_schema#/definitions/User",
          },
        },
        "required": Array [
          "msg",
          "user",
        ],
        "type": "object",
      },
    },
  },
}
`

exports[`test/integration.test.ts TAP POST / type casts payload when possible > response path:POST / id:req-1 1`] = `
Object {
  "Headers": Array [
    "HTTP/1.1 200 OK",
    "content-type: application/json; charset=utf-8",
    "content-length: 50",
    "Date: dateString",
    "Connection: keep-alive",
  ],
  "Payload": Array [
    Object {
      "msg": "Hello, 123, string",
      "user": Object {
        "name": "123",
      },
    },
  ],
}
`

exports[`test/integration.test.ts TAP POST / works > contains user name in msg 1`] = `
Object {
  "msg": "Hello, Test User, string",
  "user": Object {
    "name": "Test User",
  },
}
`

exports[`test/integration.test.ts TAP POST / works > request path:POST / id:req-1 1`] = `
Object {
  "Body": undefined,
  "Headers": Object {
    "authorization": "required",
    "content-length": "29",
    "content-type": "application/json",
    "getheader": "isHere",
    "host": "localhost:80",
    "user-agent": "lightMyRequest",
  },
  "Params": Object {},
  "Query": Object {},
  "schema": Object {
    "body": Object {
      "properties": Object {
        "user": Object {
          "$ref": "test_schema#/definitions/User",
        },
      },
      "required": Array [
        "user",
      ],
      "type": "object",
    },
    "response": Object {
      "200": Object {
        "properties": Object {
          "msg": Object {
            "type": "string",
          },
          "user": Object {
            "$ref": "test_schema#/definitions/User",
          },
        },
        "required": Array [
          "msg",
          "user",
        ],
        "type": "object",
      },
    },
  },
}
`

exports[`test/integration.test.ts TAP POST / works > response path:POST / id:req-1 1`] = `
Object {
  "Headers": Array [
    "HTTP/1.1 200 OK",
    "content-type: application/json; charset=utf-8",
    "content-length: 62",
    "Date: dateString",
    "Connection: keep-alive",
  ],
  "Payload": Array [
    Object {
      "msg": "Hello, Test User, string",
      "user": Object {
        "name": "Test User",
      },
    },
  ],
}
`

exports[`test/integration.test.ts TAP POST /params/:id/:subid works > request path:POST /params/11/22 id:req-1 1`] = `
Object {
  "Body": undefined,
  "Headers": Object {
    "host": "localhost:80",
    "user-agent": "lightMyRequest",
  },
  "Params": Object {
    "id": "11",
    "subid": "22",
  },
  "Query": Object {},
  "schema": Object {
    "params": Object {
      "properties": Object {
        "id": Object {
          "type": "number",
        },
        "subid": Object {
          "type": "string",
        },
      },
      "required": Array [
        "id",
        "subid",
      ],
      "type": "object",
    },
    "response": Object {},
  },
}
`

exports[`test/integration.test.ts TAP POST /params/:id/:subid works > response path:POST /params/11/22 id:req-1 1`] = `
Object {
  "Headers": Array [
    "HTTP/1.1 200 OK",
    "content-length: 0",
    "Date: dateString",
    "Connection: keep-alive",
  ],
  "Payload": Array [],
}
`

exports[`test/integration.test.ts TAP POST /redirect works > request path:POST /redirect id:req-1 1`] = `
Object {
  "Body": undefined,
  "Headers": Object {
    "host": "localhost:80",
    "user-agent": "lightMyRequest",
  },
  "Params": Object {},
  "Query": Object {},
  "schema": Object {
    "response": Object {},
  },
}
`

exports[`test/integration.test.ts TAP POST /redirect works > response path:POST /redirect id:req-1 1`] = `
Object {
  "Headers": Array [
    "HTTP/1.1 302 Found",
    "location: example.com",
    "content-length: 0",
    "Date: dateString",
    "Connection: keep-alive",
  ],
  "Payload": Array [],
}
`

exports[`test/integration.test.ts TAP POST /testframe works > request path:POST /testframe id:req-1 1`] = `
Object {
  "Body": undefined,
  "Headers": Object {
    "host": "localhost:80",
    "user-agent": "lightMyRequest",
  },
  "Params": Object {},
  "Query": Object {},
  "schema": Object {
    "response": Object {
      "200": Object {
        "properties": Object {
          "frame": Object {
            "allOf": Array [
              Object {
                "$ref": "test_schema#/definitions/Omit__Obj,\\"type\\"__",
              },
              Object {
                "properties": Object {
                  "type": Object {
                    "enum": Array [
                      "TEST",
                    ],
                    "type": "string",
                  },
                },
                "required": Array [
                  "type",
                ],
                "type": "object",
              },
            ],
            "type": "object",
          },
        },
        "required": Array [
          "frame",
        ],
        "type": "object",
      },
    },
  },
}
`

exports[`test/integration.test.ts TAP POST /testframe works > response path:POST /testframe id:req-1 1`] = `
Object {
  "Headers": Array [
    "HTTP/1.1 200 OK",
    "content-type: application/json; charset=utf-8",
    "content-length: 39",
    "Date: dateString",
    "Connection: keep-alive",
  ],
  "Payload": Array [
    Object {
      "frame": Object {
        "id": "string",
        "type": "TEST",
      },
    },
  ],
}
`

exports[`test/integration.test.ts TAP app starts and GET / works > happy path 1`] = `
Object {
  "name": "hello",
}
`

exports[`test/integration.test.ts TAP app starts and GET / works > request path:GET / id:req-1 1`] = `
Object {
  "Body": undefined,
  "Headers": Object {
    "authorization": "required",
    "getheader": "isHere",
    "host": "localhost:80",
    "user-agent": "lightMyRequest",
  },
  "Params": Object {},
  "Query": Object {},
  "schema": Object {
    "headers": Object {
      "properties": Object {
        "authorization": Object {
          "type": "string",
        },
        "getHeader": Object {
          "type": "string",
        },
      },
      "required": Array [
        "authorization",
        "getHeader",
      ],
      "type": "object",
    },
    "querystring": Object {
      "properties": Object {
        "getQueryParam": Object {
          "type": "boolean",
        },
      },
      "type": "object",
    },
    "response": Object {
      "200": Object {
        "$ref": "test_schema#/definitions/User",
      },
    },
  },
}
`

exports[`test/integration.test.ts TAP app starts and GET / works > response path:GET / id:req-1 1`] = `
Object {
  "Headers": Array [
    "HTTP/1.1 200 OK",
    "x-custom: 1",
    "content-type: application/json; charset=utf-8",
    "content-length: 16",
    "Date: dateString",
    "Connection: keep-alive",
  ],
  "Payload": Array [
    Object {
      "name": "hello",
    },
  ],
}
`

exports[`test/integration.test.ts TAP it sends headers > request path:GET / id:req-1 1`] = `
Object {
  "Body": undefined,
  "Headers": Object {
    "authorization": "required",
    "getheader": "isHere",
    "host": "localhost:80",
    "user-agent": "lightMyRequest",
  },
  "Params": Object {},
  "Query": Object {},
  "schema": Object {
    "headers": Object {
      "properties": Object {
        "authorization": Object {
          "type": "string",
        },
        "getHeader": Object {
          "type": "string",
        },
      },
      "required": Array [
        "authorization",
        "getHeader",
      ],
      "type": "object",
    },
    "querystring": Object {
      "properties": Object {
        "getQueryParam": Object {
          "type": "boolean",
        },
      },
      "type": "object",
    },
    "response": Object {
      "200": Object {
        "$ref": "test_schema#/definitions/User",
      },
    },
  },
}
`

exports[`test/integration.test.ts TAP it sends headers > response path:GET / id:req-1 1`] = `
Object {
  "Headers": Array [
    "HTTP/1.1 200 OK",
    "x-custom: 1",
    "content-type: application/json; charset=utf-8",
    "content-length: 16",
    "Date: dateString",
    "Connection: keep-alive",
  ],
  "Payload": Array [
    Object {
      "name": "hello",
    },
  ],
}
`

exports[`test/integration.test.ts TAP it sends headers > x-custom header is present 1`] = `
Object {
  "connection": "keep-alive",
  "content-length": "16",
  "content-type": "application/json; charset=utf-8",
  "date": "dateString",
  "x-custom": "1",
}
`

exports[`test/integration.test.ts TAP it validates get query param against schema > error logs 1`] = `
Error: querystring/getQueryParam must be boolean {
  "statusCode": 400,
  "validation": Array [
    Object {
      "instancePath": "/getQueryParam",
      "keyword": "type",
      "message": "must be boolean",
      "params": Object {
        "type": "boolean",
      },
      "schemaPath": "#/properties/getQueryParam/type",
    },
  ],
  "validationContext": "querystring",
}
`

exports[`test/integration.test.ts TAP it validates get query param against schema > request path:GET /?getQueryParam=1 id:req-1 1`] = `
Object {
  "Body": undefined,
  "Headers": Object {
    "authorization": "required",
    "getheader": "isHere",
    "host": "localhost:80",
    "user-agent": "lightMyRequest",
  },
  "Params": Object {},
  "Query": Null Object {
    "getQueryParam": "1",
  },
  "schema": Object {
    "headers": Object {
      "properties": Object {
        "authorization": Object {
          "type": "string",
        },
        "getHeader": Object {
          "type": "string",
        },
      },
      "required": Array [
        "authorization",
        "getHeader",
      ],
      "type": "object",
    },
    "querystring": Object {
      "properties": Object {
        "getQueryParam": Object {
          "type": "boolean",
        },
      },
      "type": "object",
    },
    "response": Object {
      "200": Object {
        "$ref": "test_schema#/definitions/User",
      },
    },
  },
}
`

exports[`test/integration.test.ts TAP it validates get query param against schema > response path:GET /?getQueryParam=1 id:req-1 1`] = `
Object {
  "Headers": Array [
    "HTTP/1.1 400 Bad Request",
    "content-type: application/json; charset=utf-8",
    "content-length: 94",
    "Date: dateString",
    "Connection: keep-alive",
  ],
  "Payload": Array [
    Object {
      "error": "Bad Request",
      "message": "querystring/getQueryParam must be boolean",
      "statusCode": 400,
    },
  ],
}
`

exports[`test/integration.test.ts TAP it validates get query param against schema > wrong type of query param 1`] = `
Object {
  "error": "Bad Request",
  "message": "querystring/getQueryParam must be boolean",
  "statusCode": 400,
}
`

exports[`test/integration.test.ts TAP it validates headers > error logs 1`] = `
Error: headers must have required property 'authorization' {
  "statusCode": 400,
  "validation": Array [
    Object {
      "instancePath": "",
      "keyword": "required",
      "message": "must have required property 'authorization'",
      "params": Object {
        "missingProperty": "authorization",
      },
      "schemaPath": "#/required",
    },
  ],
  "validationContext": "headers",
}
`

exports[`test/integration.test.ts TAP it validates headers > error logs 2`] = `
Error: headers must have required property 'getheader' {
  "statusCode": 400,
  "validation": Array [
    Object {
      "instancePath": "",
      "keyword": "required",
      "message": "must have required property 'getheader'",
      "params": Object {
        "missingProperty": "getheader",
      },
      "schemaPath": "#/required",
    },
  ],
  "validationContext": "headers",
}
`

exports[`test/integration.test.ts TAP it validates headers > missing headers 1`] = `
Array [
  Object {
    "error": "Bad Request",
    "message": "headers must have required property 'authorization'",
    "statusCode": 400,
  },
  Object {
    "error": "Bad Request",
    "message": "headers must have required property 'getheader'",
    "statusCode": 400,
  },
]
`

exports[`test/integration.test.ts TAP it validates headers > request path:GET / id:req-1 1`] = `
Object {
  "Body": undefined,
  "Headers": Object {
    "getheader": "isHere",
    "host": "localhost:80",
    "user-agent": "lightMyRequest",
  },
  "Params": Object {},
  "Query": Object {},
  "schema": Object {
    "headers": Object {
      "properties": Object {
        "authorization": Object {
          "type": "string",
        },
        "getHeader": Object {
          "type": "string",
        },
      },
      "required": Array [
        "authorization",
        "getHeader",
      ],
      "type": "object",
    },
    "querystring": Object {
      "properties": Object {
        "getQueryParam": Object {
          "type": "boolean",
        },
      },
      "type": "object",
    },
    "response": Object {
      "200": Object {
        "$ref": "test_schema#/definitions/User",
      },
    },
  },
}
`

exports[`test/integration.test.ts TAP it validates headers > request path:GET / id:req-2 1`] = `
Object {
  "Body": undefined,
  "Headers": Object {
    "authorization": "isHere",
    "host": "localhost:80",
    "user-agent": "lightMyRequest",
  },
  "Params": Object {},
  "Query": Object {},
  "schema": Object {
    "headers": Object {
      "properties": Object {
        "authorization": Object {
          "type": "string",
        },
        "getHeader": Object {
          "type": "string",
        },
      },
      "required": Array [
        "authorization",
        "getHeader",
      ],
      "type": "object",
    },
    "querystring": Object {
      "properties": Object {
        "getQueryParam": Object {
          "type": "boolean",
        },
      },
      "type": "object",
    },
    "response": Object {
      "200": Object {
        "$ref": "test_schema#/definitions/User",
      },
    },
  },
}
`

exports[`test/integration.test.ts TAP it validates headers > response path:GET / id:req-1 1`] = `
Object {
  "Headers": Array [
    "HTTP/1.1 400 Bad Request",
    "content-type: application/json; charset=utf-8",
    "content-length: 104",
    "Date: dateString",
    "Connection: keep-alive",
  ],
  "Payload": Array [
    Object {
      "error": "Bad Request",
      "message": "headers must have required property 'authorization'",
      "statusCode": 400,
    },
  ],
}
`

exports[`test/integration.test.ts TAP it validates headers > response path:GET / id:req-2 1`] = `
Object {
  "Headers": Array [
    "HTTP/1.1 400 Bad Request",
    "content-type: application/json; charset=utf-8",
    "content-length: 100",
    "Date: dateString",
    "Connection: keep-alive",
  ],
  "Payload": Array [
    Object {
      "error": "Bad Request",
      "message": "headers must have required property 'getheader'",
      "statusCode": 400,
    },
  ],
}
`

exports[`test/integration.test.ts TAP response is validated > error logs 1`] = `
Error: "name" is required! {
  "serialization": Object {
    "method": "GET",
    "url": "/",
  },
}
`

exports[`test/integration.test.ts TAP response is validated > invalid response 1`] = `
Object {
  "error": "Internal Server Error",
  "message": "\\"name\\" is required!",
  "statusCode": 500,
}
`

exports[`test/integration.test.ts TAP response is validated > request path:GET / id:req-1 1`] = `
Object {
  "Body": undefined,
  "Headers": Object {
    "authorization": "required",
    "getheader": "isHere",
    "host": "localhost:80",
    "user-agent": "lightMyRequest",
  },
  "Params": Object {},
  "Query": Object {},
  "schema": Object {
    "headers": Object {
      "properties": Object {
        "authorization": Object {
          "type": "string",
        },
        "getHeader": Object {
          "type": "string",
        },
      },
      "required": Array [
        "authorization",
        "getHeader",
      ],
      "type": "object",
    },
    "querystring": Object {
      "properties": Object {
        "getQueryParam": Object {
          "type": "boolean",
        },
      },
      "type": "object",
    },
    "response": Object {
      "200": Object {
        "$ref": "test_schema#/definitions/User",
      },
    },
  },
}
`

exports[`test/integration.test.ts TAP response is validated > request path:GET / id:req-1 2`] = `
Object {
  "Body": undefined,
  "Headers": Object {
    "authorization": "required",
    "getheader": "isHere",
    "host": "localhost:80",
    "user-agent": "lightMyRequest",
  },
  "Params": Object {},
  "Query": Object {},
  "schema": Object {
    "headers": Object {
      "properties": Object {
        "authorization": Object {
          "type": "string",
        },
        "getHeader": Object {
          "type": "string",
        },
      },
      "required": Array [
        "authorization",
        "getHeader",
      ],
      "type": "object",
    },
    "querystring": Object {
      "properties": Object {
        "getQueryParam": Object {
          "type": "boolean",
        },
      },
      "type": "object",
    },
    "response": Object {
      "200": Object {
        "$ref": "test_schema#/definitions/User",
      },
    },
  },
}
`

exports[`test/integration.test.ts TAP response is validated > response path:GET / id:req-1 1`] = `
Object {
  "Headers": Array [
    "HTTP/1.1 500 Internal Server Error",
    "x-custom: 1",
    "content-type: application/json; charset=utf-8",
    "content-length: 84",
    "Date: dateString",
    "Connection: keep-alive",
  ],
  "Payload": Array [
    Object {
      "error": "Internal Server Error",
      "message": "\\"name\\" is required!",
      "statusCode": 500,
    },
  ],
}
`
