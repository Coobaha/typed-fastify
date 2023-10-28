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
      "additionalProperties": true,
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

exports[`test/integration.test.ts TAP GET /user_and_obj works > request path:GET /user_and_obj id:req-1 1`] = `
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
        "items": Array [
          Object {
            "$ref": "test_schema#/properties/User",
            "type": "object",
          },
          Object {
            "$ref": "test_schema#/properties/TestObj",
            "type": "object",
          },
          Object {
            "additionalProperties": Object {
              "anyOf": Array [
                Object {
                  "type": "string",
                },
                Object {
                  "type": "number",
                },
              ],
            },
            "type": "object",
          },
        ],
        "maxItems": 3,
        "minItems": 3,
        "type": "array",
      },
    },
  },
}
`

exports[`test/integration.test.ts TAP GET /user_and_obj works > response path:GET /user_and_obj id:req-1 1`] = `
Object {
  "Headers": Array [
    "HTTP/1.1 200 OK",
    "content-type: application/json; charset=utf-8",
    "content-length: 59",
    "Date: dateString",
    "Connection: keep-alive",
  ],
  "Payload": Array [
    Array [
      Object {
        "name": "user1",
      },
      Object {
        "id": "1",
        "type": "TEST",
      },
      Object {
        "any": "thing",
      },
    ],
  ],
}
`

exports[`test/integration.test.ts TAP GET /user_and_obj works > user_and_obj 1`] = `
Array [
  Object {
    "name": "user1",
  },
  Object {
    "id": "1",
    "type": "TEST",
  },
  Object {
    "any": "thing",
  },
]
`

exports[`test/integration.test.ts TAP POST / rejects invalid payload > error logs 1`] = `
Error: body/user/name must be string {
  "code": "FST_ERR_VALIDATION",
  "statusCode": 400,
  "validation": Array [
    Object {
      "instancePath": "/user/name",
      "keyword": "type",
      "message": "must be string",
      "params": Object {
        "type": "string",
      },
      "schemaPath": "test_schema#/properties/User/properties/name/type",
    },
  ],
  "validationContext": "body",
}
`

exports[`test/integration.test.ts TAP POST / rejects invalid payload > invalid user name 1`] = `
Object {
  "code": "FST_ERR_VALIDATION",
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
      "additionalProperties": false,
      "properties": Object {
        "user": Object {
          "$ref": "test_schema#/properties/User",
        },
      },
      "required": Array [
        "user",
      ],
      "type": "object",
    },
    "response": Object {
      "200": Object {
        "additionalProperties": false,
        "properties": Object {
          "msg": Object {
            "type": "string",
          },
          "user": Object {
            "$ref": "test_schema#/properties/User",
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
    "content-length: 110",
    "Date: dateString",
    "Connection: keep-alive",
  ],
  "Payload": Array [
    Object {
      "code": "FST_ERR_VALIDATION",
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
      "additionalProperties": false,
      "properties": Object {
        "user": Object {
          "$ref": "test_schema#/properties/User",
        },
      },
      "required": Array [
        "user",
      ],
      "type": "object",
    },
    "response": Object {
      "200": Object {
        "additionalProperties": false,
        "properties": Object {
          "msg": Object {
            "type": "string",
          },
          "user": Object {
            "$ref": "test_schema#/properties/User",
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
      "additionalProperties": false,
      "properties": Object {
        "user": Object {
          "$ref": "test_schema#/properties/User",
        },
      },
      "required": Array [
        "user",
      ],
      "type": "object",
    },
    "response": Object {
      "200": Object {
        "additionalProperties": false,
        "properties": Object {
          "msg": Object {
            "type": "string",
          },
          "user": Object {
            "$ref": "test_schema#/properties/User",
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
      "additionalProperties": false,
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
        "additionalProperties": false,
        "properties": Object {
          "frame": Object {
            "$ref": "test_schema#/properties/TestObj",
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
  "name": "hello, getQueryParam=undefined",
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
      "additionalProperties": false,
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
      "additionalProperties": false,
      "properties": Object {
        "getQueryParam": Object {
          "type": "boolean",
        },
      },
      "type": "object",
    },
    "response": Object {
      "200": Object {
        "$ref": "test_schema#/properties/User",
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
    "content-length: 41",
    "Date: dateString",
    "Connection: keep-alive",
  ],
  "Payload": Array [
    Object {
      "name": "hello, getQueryParam=undefined",
    },
  ],
}
`

exports[`test/integration.test.ts TAP invalid GET /matches > request path:GET /matches?match=%2Finvalid id:req-1 1`] = `
Object {
  "Body": undefined,
  "Headers": Object {
    "host": "localhost:80",
    "user-agent": "lightMyRequest",
  },
  "Params": Object {},
  "Query": Object {
    "match": "/invalid",
  },
  "schema": Object {
    "querystring": Object {
      "additionalProperties": false,
      "properties": Object {
        "match": Object {
          "type": "string",
        },
      },
      "required": Array [
        "match",
      ],
      "type": "object",
    },
    "response": Object {
      "200": Object {
        "additionalProperties": false,
        "properties": Object {
          "value": Object {
            "enum": Array [
              "false",
              "true",
            ],
            "type": "string",
          },
        },
        "required": Array [
          "value",
        ],
        "type": "object",
      },
    },
  },
}
`

exports[`test/integration.test.ts TAP invalid GET /matches > response path:GET /matches?match=%2Finvalid id:req-1 1`] = `
Object {
  "Headers": Array [
    "HTTP/1.1 200 OK",
    "content-type: application/json; charset=utf-8",
    "content-length: 17",
    "Date: dateString",
    "Connection: keep-alive",
  ],
  "Payload": Array [
    Object {
      "value": "false",
    },
  ],
}
`

exports[`test/integration.test.ts TAP it does not interfere with prefixed plugin > request path:GET /prefixed id:req-1 1`] = `
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
        "type": "string",
      },
    },
  },
}
`

exports[`test/integration.test.ts TAP it does not interfere with prefixed plugin > response path:GET /prefixed id:req-1 1`] = `
Object {
  "Headers": Array [
    "HTTP/1.1 200 OK",
    "content-type: text/plain; charset=utf-8",
    "content-length: 4",
    "Date: dateString",
    "Connection: keep-alive",
  ],
  "Payload": Array [
    true,
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
      "additionalProperties": false,
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
      "additionalProperties": false,
      "properties": Object {
        "getQueryParam": Object {
          "type": "boolean",
        },
      },
      "type": "object",
    },
    "response": Object {
      "200": Object {
        "$ref": "test_schema#/properties/User",
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
    "content-length: 41",
    "Date: dateString",
    "Connection: keep-alive",
  ],
  "Payload": Array [
    Object {
      "name": "hello, getQueryParam=undefined",
    },
  ],
}
`

exports[`test/integration.test.ts TAP it sends headers > x-custom header is present 1`] = `
Object {
  "connection": "keep-alive",
  "content-length": "41",
  "content-type": "application/json; charset=utf-8",
  "date": "dateString",
  "x-custom": "1",
}
`

exports[`test/integration.test.ts TAP it validates get query param against schema > error logs 1`] = `
Error: querystring/getQueryParam must be boolean {
  "code": "FST_ERR_VALIDATION",
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
  "Query": Object {
    "getQueryParam": "1",
  },
  "schema": Object {
    "headers": Object {
      "additionalProperties": false,
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
      "additionalProperties": false,
      "properties": Object {
        "getQueryParam": Object {
          "type": "boolean",
        },
      },
      "type": "object",
    },
    "response": Object {
      "200": Object {
        "$ref": "test_schema#/properties/User",
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
    "content-length: 122",
    "Date: dateString",
    "Connection: keep-alive",
  ],
  "Payload": Array [
    Object {
      "code": "FST_ERR_VALIDATION",
      "error": "Bad Request",
      "message": "querystring/getQueryParam must be boolean",
      "statusCode": 400,
    },
  ],
}
`

exports[`test/integration.test.ts TAP it validates get query param against schema > wrong type of query param 1`] = `
Object {
  "code": "FST_ERR_VALIDATION",
  "error": "Bad Request",
  "message": "querystring/getQueryParam must be boolean",
  "statusCode": 400,
}
`

exports[`test/integration.test.ts TAP it validates headers > error logs 1`] = `
Error: headers must have required property 'authorization' {
  "code": "FST_ERR_VALIDATION",
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
  "code": "FST_ERR_VALIDATION",
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
    "code": "FST_ERR_VALIDATION",
    "error": "Bad Request",
    "message": "headers must have required property 'authorization'",
    "statusCode": 400,
  },
  Object {
    "code": "FST_ERR_VALIDATION",
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
      "additionalProperties": false,
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
      "additionalProperties": false,
      "properties": Object {
        "getQueryParam": Object {
          "type": "boolean",
        },
      },
      "type": "object",
    },
    "response": Object {
      "200": Object {
        "$ref": "test_schema#/properties/User",
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
      "additionalProperties": false,
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
      "additionalProperties": false,
      "properties": Object {
        "getQueryParam": Object {
          "type": "boolean",
        },
      },
      "type": "object",
    },
    "response": Object {
      "200": Object {
        "$ref": "test_schema#/properties/User",
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
    "content-length: 132",
    "Date: dateString",
    "Connection: keep-alive",
  ],
  "Payload": Array [
    Object {
      "code": "FST_ERR_VALIDATION",
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
    "content-length: 128",
    "Date: dateString",
    "Connection: keep-alive",
  ],
  "Payload": Array [
    Object {
      "code": "FST_ERR_VALIDATION",
      "error": "Bad Request",
      "message": "headers must have required property 'getheader'",
      "statusCode": 400,
    },
  ],
}
`

exports[`test/integration.test.ts TAP objectid > request path:GET /objectid id:req-1 1`] = `
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
        "additionalProperties": false,
        "properties": Object {
          "id": Object {
            "type": "string",
          },
        },
        "required": Array [
          "id",
        ],
        "type": "object",
      },
    },
  },
}
`

exports[`test/integration.test.ts TAP objectid > response path:GET /objectid id:req-1 1`] = `
Object {
  "Headers": Array [
    "HTTP/1.1 200 OK",
    "content-type: application/json; charset=utf-8",
    "content-length: 12",
    "Date: dateString",
    "Connection: keep-alive",
  ],
  "Payload": Array [
    Object {
      "id": "123",
    },
  ],
}
`

exports[`test/integration.test.ts TAP objectid > swagger openapi schema 1`] = `
Object {
  "id": "123",
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
      "additionalProperties": false,
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
      "additionalProperties": false,
      "properties": Object {
        "getQueryParam": Object {
          "type": "boolean",
        },
      },
      "type": "object",
    },
    "response": Object {
      "200": Object {
        "$ref": "test_schema#/properties/User",
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
  },
  "Params": Object {},
  "Query": Object {},
  "schema": Object {
    "headers": Object {
      "additionalProperties": false,
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
      "additionalProperties": false,
      "properties": Object {
        "getQueryParam": Object {
          "type": "boolean",
        },
      },
      "type": "object",
    },
    "response": Object {
      "200": Object {
        "$ref": "test_schema#/properties/User",
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

exports[`test/integration.test.ts TAP swagger integration works > request path:GET /openapi/json id:req-1 1`] = `
Object {
  "Body": undefined,
  "Headers": Object {
    "host": "localhost:80",
    "user-agent": "lightMyRequest",
  },
  "Params": Object {},
  "Query": Object {},
  "schema": Object {
    "hide": true,
  },
}
`

exports[`test/integration.test.ts TAP swagger integration works > response path:GET /openapi/json id:req-1 1`] = `
Object {
  "Headers": Array [
    "HTTP/1.1 200 OK",
    "content-type: application/json; charset=utf-8",
    "content-length: 3922",
    "Date: dateString",
    "Connection: keep-alive",
  ],
  "Payload": Array [
    Object {
      "basePath": "/",
      "definitions": Object {
        "def-0": Object {
          "$schema": "http://json-schema.org/draft-07/schema#",
          "properties": Object {
            "Obj": Object {
              "additionalProperties": false,
              "properties": Object {
                "id": Object {
                  "format": "uuid",
                  "type": "string",
                },
                "type": Object {
                  "type": "string",
                },
              },
              "required": Array [
                "id",
                "type",
              ],
              "type": "object",
            },
            "ObjectId": Object {
              "type": "string",
            },
            "RecordStringString": Object {
              "additionalProperties": Object {
                "anyOf": Array [
                  Object {
                    "type": "string",
                  },
                  Object {
                    "type": "number",
                  },
                ],
              },
              "type": "object",
            },
            "SharedRequest": Object {
              "additionalProperties": false,
              "properties": Object {
                "headers": Object {
                  "additionalProperties": false,
                  "properties": Object {
                    "authorization": Object {
                      "type": "string",
                    },
                  },
                  "type": "object",
                },
              },
              "required": Array [
                "headers",
              ],
              "type": "object",
            },
            "TestObj": Object {
              "additionalProperties": false,
              "properties": Object {
                "id": Object {
                  "format": "uuid",
                  "type": "string",
                },
                "type": Object {
                  "const": "TEST",
                  "type": "string",
                },
              },
              "required": Array [
                "id",
                "type",
              ],
              "type": "object",
            },
            "User": Object {
              "additionalProperties": false,
              "properties": Object {
                "name": Object {
                  "type": "string",
                },
              },
              "required": Array [
                "name",
              ],
              "type": "object",
            },
            "UserAndObj": Object {
              "items": Array [
                Object {
                  "$ref": "#/definitions/def-0/properties/User",
                  "type": "object",
                },
                Object {
                  "$ref": "#/definitions/def-0/properties/TestObj",
                  "type": "object",
                },
                Object {
                  "additionalProperties": Object {
                    "anyOf": Array [
                      Object {
                        "type": "string",
                      },
                      Object {
                        "type": "number",
                      },
                    ],
                  },
                  "type": "object",
                },
              ],
              "maxItems": 3,
              "minItems": 3,
              "type": "array",
            },
          },
          "title": "test_schema",
          "type": "object",
        },
      },
      "info": Object {
        "description": "api",
        "title": "api",
        "version": "0.0.0",
      },
      "paths": Object {
        "/": Object {
          "get": Object {
            "parameters": Array [
              Object {
                "in": "query",
                "name": "getQueryParam",
                "required": false,
                "type": "boolean",
              },
              Object {
                "in": "header",
                "name": "authorization",
                "required": true,
                "type": "string",
              },
              Object {
                "in": "header",
                "name": "getHeader",
                "required": true,
                "type": "string",
              },
            ],
            "responses": Object {
              "200": Object {
                "description": "Default Response",
                "schema": Object {
                  "$ref": "#/definitions/def-0/properties/User",
                },
              },
            },
          },
          "post": Object {
            "parameters": Array [
              Object {
                "in": "body",
                "name": "body",
                "schema": Object {
                  "additionalProperties": false,
                  "properties": Object {
                    "user": Object {
                      "$ref": "#/definitions/def-0/properties/User",
                    },
                  },
                  "required": Array [
                    "user",
                  ],
                  "type": "object",
                },
              },
            ],
            "responses": Object {
              "200": Object {
                "description": "Default Response",
                "schema": Object {
                  "additionalProperties": false,
                  "properties": Object {
                    "msg": Object {
                      "type": "string",
                    },
                    "user": Object {
                      "$ref": "#/definitions/def-0/properties/User",
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
          },
        },
        "/asReply": Object {
          "get": Object {
            "parameters": Array [
              Object {
                "in": "query",
                "name": "reply",
                "required": true,
                "type": "string",
              },
            ],
            "responses": Object {
              "200": Object {
                "description": "Default Response",
                "schema": Object {
                  "additionalProperties": false,
                  "properties": Object {
                    "value": Object {
                      "enum": Array [
                        "known",
                      ],
                      "type": "string",
                    },
                  },
                  "required": Array [
                    "value",
                  ],
                  "type": "object",
                },
              },
            },
          },
        },
        "/empty": Object {
          "get": Object {
            "responses": Object {},
          },
        },
        "/inferredParams/{id}/{castedToNumber}": Object {
          "get": Object {
            "parameters": Array [
              Object {
                "in": "path",
                "name": "castedToNumber",
                "required": true,
                "type": "number",
              },
            ],
            "responses": Object {
              "200": Object {
                "description": "Default Response",
                "schema": Object {
                  "type": "string",
                },
              },
            },
          },
        },
        "/matches": Object {
          "get": Object {
            "parameters": Array [
              Object {
                "in": "query",
                "name": "match",
                "required": true,
                "type": "string",
              },
            ],
            "responses": Object {
              "200": Object {
                "description": "Default Response",
                "schema": Object {
                  "additionalProperties": false,
                  "properties": Object {
                    "value": Object {
                      "enum": Array [
                        "false",
                        "true",
                      ],
                      "type": "string",
                    },
                  },
                  "required": Array [
                    "value",
                  ],
                  "type": "object",
                },
              },
            },
          },
        },
        "/objectid": Object {
          "get": Object {
            "responses": Object {
              "200": Object {
                "description": "Default Response",
                "schema": Object {
                  "additionalProperties": false,
                  "properties": Object {
                    "id": Object {
                      "type": "string",
                    },
                  },
                  "required": Array [
                    "id",
                  ],
                  "type": "object",
                },
              },
            },
          },
        },
        "/params/{id}/{subid}": Object {
          "post": Object {
            "parameters": Array [
              Object {
                "in": "path",
                "name": "id",
                "required": true,
                "type": "number",
              },
              Object {
                "in": "path",
                "name": "subid",
                "required": true,
                "type": "string",
              },
            ],
            "responses": Object {},
          },
        },
        "/redirect": Object {
          "post": Object {
            "responses": Object {},
          },
        },
        "/testframe": Object {
          "post": Object {
            "responses": Object {
              "200": Object {
                "description": "Default Response",
                "schema": Object {
                  "additionalProperties": false,
                  "properties": Object {
                    "frame": Object {
                      "$ref": "#/definitions/def-0/properties/TestObj",
                    },
                  },
                  "required": Array [
                    "frame",
                  ],
                  "type": "object",
                },
              },
            },
          },
        },
        "/user_and_obj": Object {
          "get": Object {
            "responses": Object {
              "200": Object {
                "description": "Default Response",
                "schema": Object {
                  "items": Array [
                    Object {
                      "$ref": "#/definitions/def-0/properties/User",
                      "type": "object",
                    },
                    Object {
                      "$ref": "#/definitions/def-0/properties/TestObj",
                      "type": "object",
                    },
                    Object {
                      "additionalProperties": Object {
                        "anyOf": Array [
                          Object {
                            "type": "string",
                          },
                          Object {
                            "type": "number",
                          },
                        ],
                      },
                      "type": "object",
                    },
                  ],
                  "maxItems": 3,
                  "minItems": 3,
                  "type": "array",
                },
              },
            },
          },
        },
      },
      "swagger": "2.0",
    },
  ],
}
`

exports[`test/integration.test.ts TAP swagger integration works > swagger openapi schema 1`] = `
Object {
  "basePath": "/",
  "definitions": Object {
    "def-0": Object {
      "$schema": "http://json-schema.org/draft-07/schema#",
      "properties": Object {
        "Obj": Object {
          "additionalProperties": false,
          "properties": Object {
            "id": Object {
              "format": "uuid",
              "type": "string",
            },
            "type": Object {
              "type": "string",
            },
          },
          "required": Array [
            "id",
            "type",
          ],
          "type": "object",
        },
        "ObjectId": Object {
          "type": "string",
        },
        "RecordStringString": Object {
          "additionalProperties": Object {
            "anyOf": Array [
              Object {
                "type": "string",
              },
              Object {
                "type": "number",
              },
            ],
          },
          "type": "object",
        },
        "SharedRequest": Object {
          "additionalProperties": false,
          "properties": Object {
            "headers": Object {
              "additionalProperties": false,
              "properties": Object {
                "authorization": Object {
                  "type": "string",
                },
              },
              "type": "object",
            },
          },
          "required": Array [
            "headers",
          ],
          "type": "object",
        },
        "TestObj": Object {
          "additionalProperties": false,
          "properties": Object {
            "id": Object {
              "format": "uuid",
              "type": "string",
            },
            "type": Object {
              "const": "TEST",
              "type": "string",
            },
          },
          "required": Array [
            "id",
            "type",
          ],
          "type": "object",
        },
        "User": Object {
          "additionalProperties": false,
          "properties": Object {
            "name": Object {
              "type": "string",
            },
          },
          "required": Array [
            "name",
          ],
          "type": "object",
        },
        "UserAndObj": Object {
          "items": Array [
            Object {
              "$ref": "#/definitions/def-0/properties/User",
              "type": "object",
            },
            Object {
              "$ref": "#/definitions/def-0/properties/TestObj",
              "type": "object",
            },
            Object {
              "additionalProperties": Object {
                "anyOf": Array [
                  Object {
                    "type": "string",
                  },
                  Object {
                    "type": "number",
                  },
                ],
              },
              "type": "object",
            },
          ],
          "maxItems": 3,
          "minItems": 3,
          "type": "array",
        },
      },
      "title": "test_schema",
      "type": "object",
    },
  },
  "info": Object {
    "description": "api",
    "title": "api",
    "version": "0.0.0",
  },
  "paths": Object {
    "/": Object {
      "get": Object {
        "parameters": Array [
          Object {
            "in": "query",
            "name": "getQueryParam",
            "required": false,
            "type": "boolean",
          },
          Object {
            "in": "header",
            "name": "authorization",
            "required": true,
            "type": "string",
          },
          Object {
            "in": "header",
            "name": "getHeader",
            "required": true,
            "type": "string",
          },
        ],
        "responses": Object {
          "200": Object {
            "description": "Default Response",
            "schema": Object {
              "$ref": "#/definitions/def-0/properties/User",
            },
          },
        },
      },
      "post": Object {
        "parameters": Array [
          Object {
            "in": "body",
            "name": "body",
            "schema": Object {
              "additionalProperties": false,
              "properties": Object {
                "user": Object {
                  "$ref": "#/definitions/def-0/properties/User",
                },
              },
              "required": Array [
                "user",
              ],
              "type": "object",
            },
          },
        ],
        "responses": Object {
          "200": Object {
            "description": "Default Response",
            "schema": Object {
              "additionalProperties": false,
              "properties": Object {
                "msg": Object {
                  "type": "string",
                },
                "user": Object {
                  "$ref": "#/definitions/def-0/properties/User",
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
      },
    },
    "/asReply": Object {
      "get": Object {
        "parameters": Array [
          Object {
            "in": "query",
            "name": "reply",
            "required": true,
            "type": "string",
          },
        ],
        "responses": Object {
          "200": Object {
            "description": "Default Response",
            "schema": Object {
              "additionalProperties": false,
              "properties": Object {
                "value": Object {
                  "enum": Array [
                    "known",
                  ],
                  "type": "string",
                },
              },
              "required": Array [
                "value",
              ],
              "type": "object",
            },
          },
        },
      },
    },
    "/empty": Object {
      "get": Object {
        "responses": Object {},
      },
    },
    "/inferredParams/{id}/{castedToNumber}": Object {
      "get": Object {
        "parameters": Array [
          Object {
            "in": "path",
            "name": "castedToNumber",
            "required": true,
            "type": "number",
          },
        ],
        "responses": Object {
          "200": Object {
            "description": "Default Response",
            "schema": Object {
              "type": "string",
            },
          },
        },
      },
    },
    "/matches": Object {
      "get": Object {
        "parameters": Array [
          Object {
            "in": "query",
            "name": "match",
            "required": true,
            "type": "string",
          },
        ],
        "responses": Object {
          "200": Object {
            "description": "Default Response",
            "schema": Object {
              "additionalProperties": false,
              "properties": Object {
                "value": Object {
                  "enum": Array [
                    "false",
                    "true",
                  ],
                  "type": "string",
                },
              },
              "required": Array [
                "value",
              ],
              "type": "object",
            },
          },
        },
      },
    },
    "/objectid": Object {
      "get": Object {
        "responses": Object {
          "200": Object {
            "description": "Default Response",
            "schema": Object {
              "additionalProperties": false,
              "properties": Object {
                "id": Object {
                  "type": "string",
                },
              },
              "required": Array [
                "id",
              ],
              "type": "object",
            },
          },
        },
      },
    },
    "/params/{id}/{subid}": Object {
      "post": Object {
        "parameters": Array [
          Object {
            "in": "path",
            "name": "id",
            "required": true,
            "type": "number",
          },
          Object {
            "in": "path",
            "name": "subid",
            "required": true,
            "type": "string",
          },
        ],
        "responses": Object {},
      },
    },
    "/redirect": Object {
      "post": Object {
        "responses": Object {},
      },
    },
    "/testframe": Object {
      "post": Object {
        "responses": Object {
          "200": Object {
            "description": "Default Response",
            "schema": Object {
              "additionalProperties": false,
              "properties": Object {
                "frame": Object {
                  "$ref": "#/definitions/def-0/properties/TestObj",
                },
              },
              "required": Array [
                "frame",
              ],
              "type": "object",
            },
          },
        },
      },
    },
    "/user_and_obj": Object {
      "get": Object {
        "responses": Object {
          "200": Object {
            "description": "Default Response",
            "schema": Object {
              "items": Array [
                Object {
                  "$ref": "#/definitions/def-0/properties/User",
                  "type": "object",
                },
                Object {
                  "$ref": "#/definitions/def-0/properties/TestObj",
                  "type": "object",
                },
                Object {
                  "additionalProperties": Object {
                    "anyOf": Array [
                      Object {
                        "type": "string",
                      },
                      Object {
                        "type": "number",
                      },
                    ],
                  },
                  "type": "object",
                },
              ],
              "maxItems": 3,
              "minItems": 3,
              "type": "array",
            },
          },
        },
      },
    },
  },
  "swagger": "2.0",
}
`

exports[`test/integration.test.ts TAP valid GET /asReply > request path:GET /asReply?reply=known id:req-1 1`] = `
Object {
  "Body": undefined,
  "Headers": Object {
    "host": "localhost:80",
    "user-agent": "lightMyRequest",
  },
  "Params": Object {},
  "Query": Object {
    "reply": "known",
  },
  "schema": Object {
    "querystring": Object {
      "additionalProperties": false,
      "properties": Object {
        "reply": Object {
          "type": "string",
        },
      },
      "required": Array [
        "reply",
      ],
      "type": "object",
    },
    "response": Object {
      "200": Object {
        "additionalProperties": false,
        "properties": Object {
          "value": Object {
            "const": "known",
            "type": "string",
          },
        },
        "required": Array [
          "value",
        ],
        "type": "object",
      },
    },
  },
}
`

exports[`test/integration.test.ts TAP valid GET /asReply > request path:GET /asReply?reply=unknown id:req-1 1`] = `
Object {
  "Body": undefined,
  "Headers": Object {
    "host": "localhost:80",
    "user-agent": "lightMyRequest",
  },
  "Params": Object {},
  "Query": Object {
    "reply": "unknown",
  },
  "schema": Object {
    "querystring": Object {
      "additionalProperties": false,
      "properties": Object {
        "reply": Object {
          "type": "string",
        },
      },
      "required": Array [
        "reply",
      ],
      "type": "object",
    },
    "response": Object {
      "200": Object {
        "additionalProperties": false,
        "properties": Object {
          "value": Object {
            "const": "known",
            "type": "string",
          },
        },
        "required": Array [
          "value",
        ],
        "type": "object",
      },
    },
  },
}
`

exports[`test/integration.test.ts TAP valid GET /asReply > response path:GET /asReply?reply=known id:req-1 1`] = `
Object {
  "Headers": Array [
    "HTTP/1.1 200 OK",
    "content-type: application/json; charset=utf-8",
    "content-length: 17",
    "Date: dateString",
    "Connection: keep-alive",
  ],
  "Payload": Array [
    Object {
      "value": "known",
    },
  ],
}
`

exports[`test/integration.test.ts TAP valid GET /asReply > response path:GET /asReply?reply=unknown id:req-1 1`] = `
Object {
  "Headers": Array [
    "HTTP/1.1 200 OK",
    "content-type: application/json; charset=utf-8",
    "content-length: 17",
    "Date: dateString",
    "Connection: keep-alive",
  ],
  "Payload": Array [
    Object {
      "value": "known",
    },
  ],
}
`

exports[`test/integration.test.ts TAP valid GET /matches > request path:GET /matches?match=%2Fmatches id:req-1 1`] = `
Object {
  "Body": undefined,
  "Headers": Object {
    "host": "localhost:80",
    "user-agent": "lightMyRequest",
  },
  "Params": Object {},
  "Query": Object {
    "match": "/matches",
  },
  "schema": Object {
    "querystring": Object {
      "additionalProperties": false,
      "properties": Object {
        "match": Object {
          "type": "string",
        },
      },
      "required": Array [
        "match",
      ],
      "type": "object",
    },
    "response": Object {
      "200": Object {
        "additionalProperties": false,
        "properties": Object {
          "value": Object {
            "enum": Array [
              "false",
              "true",
            ],
            "type": "string",
          },
        },
        "required": Array [
          "value",
        ],
        "type": "object",
      },
    },
  },
}
`

exports[`test/integration.test.ts TAP valid GET /matches > response path:GET /matches?match=%2Fmatches id:req-1 1`] = `
Object {
  "Headers": Array [
    "HTTP/1.1 200 OK",
    "content-type: application/json; charset=utf-8",
    "content-length: 16",
    "Date: dateString",
    "Connection: keep-alive",
  ],
  "Payload": Array [
    Object {
      "value": "true",
    },
  ],
}
`
