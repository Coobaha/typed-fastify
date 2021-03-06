/* IMPORTANT
 * This snapshot file is auto-generated, but designed for humans.
 * It should be checked into source control and tracked carefully.
 * Re-generate by setting TAP_SNAPSHOT=1 and running tests.
 * Make sure to inspect the output below.  Do not ignore changes!
 */
'use strict'
exports[`test/integration.test.ts TAP GET /empty works > request path:GET /empty id:req-1 1`] = `
Object {
  "Body": null,
  "Headers": Object {
    "host": "localhost:80",
    "user-agent": "lightMyRequest",
  },
  "Params": Object {},
  "Query": Null Object {},
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

exports[`test/integration.test.ts TAP POST / rejects invalid payload > error logs 1`] = `
Error: body.user.name should be string {
  "validation": Array [
    Object {
      "dataPath": ".user.name",
      "keyword": "type",
      "message": "should be string",
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
  "message": "body.user.name should be string",
  "statusCode": 400,
}
`

exports[`test/integration.test.ts TAP POST / rejects invalid payload > request path:POST / id:req-1 1`] = `
Object {
  "Body": null,
  "Headers": Object {
    "authorization": "required",
    "content-length": "23",
    "content-type": "application/json",
    "getheader": "isHere",
    "host": "localhost:80",
    "user-agent": "lightMyRequest",
  },
  "Params": Object {},
  "Query": Null Object {},
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
    "content-length: 84",
    "content-type: application/json; charset=utf-8",
    "Date: dateString",
    "Connection: keep-alive",
  ],
  "Payload": Array [
    Object {
      "error": "Bad Request",
      "message": "body.user.name should be string",
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
  "Body": null,
  "Headers": Object {
    "authorization": "required",
    "content-length": "21",
    "content-type": "application/json",
    "getheader": "isHere",
    "host": "localhost:80",
    "user-agent": "lightMyRequest",
  },
  "Params": Object {},
  "Query": Null Object {},
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
  "Body": null,
  "Headers": Object {
    "authorization": "required",
    "content-length": "29",
    "content-type": "application/json",
    "getheader": "isHere",
    "host": "localhost:80",
    "user-agent": "lightMyRequest",
  },
  "Params": Object {},
  "Query": Null Object {},
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
  "Body": null,
  "Headers": Object {
    "host": "localhost:80",
    "user-agent": "lightMyRequest",
  },
  "Params": Object {
    "id": "11",
    "subid": "22",
  },
  "Query": Null Object {},
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

exports[`test/integration.test.ts TAP POST /paramswithtypo/:Ids/:subid > error logs 1`] = `
Error: params.id should be number {
  "validation": Array [
    Object {
      "dataPath": ".id",
      "keyword": "type",
      "message": "should be number",
      "params": Object {
        "type": "number",
      },
      "schemaPath": "#/properties/id/type",
    },
  ],
  "validationContext": "params",
}
`

exports[`test/integration.test.ts TAP POST /paramswithtypo/:Ids/:subid > request path:POST /params/paramswithtypo/22 id:req-1 1`] = `
Object {
  "Body": null,
  "Headers": Object {
    "host": "localhost:80",
    "user-agent": "lightMyRequest",
  },
  "Params": Object {
    "id": "paramswithtypo",
    "subid": "22",
  },
  "Query": Null Object {},
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

exports[`test/integration.test.ts TAP POST /paramswithtypo/:Ids/:subid > response path:POST /params/paramswithtypo/22 id:req-1 1`] = `
Object {
  "Headers": Array [
    "HTTP/1.1 400 Bad Request",
    "content-length: 79",
    "content-type: application/json; charset=utf-8",
    "Date: dateString",
    "Connection: keep-alive",
  ],
  "Payload": Array [
    Object {
      "error": "Bad Request",
      "message": "params.id should be number",
      "statusCode": 400,
    },
  ],
}
`

exports[`test/integration.test.ts TAP POST /redirect works > request path:POST /redirect id:req-1 1`] = `
Object {
  "Body": null,
  "Headers": Object {
    "host": "localhost:80",
    "user-agent": "lightMyRequest",
  },
  "Params": Object {},
  "Query": Null Object {},
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
  "Body": null,
  "Headers": Object {
    "host": "localhost:80",
    "user-agent": "lightMyRequest",
  },
  "Params": Object {},
  "Query": Null Object {},
  "schema": Object {
    "response": Object {
      "200": Object {
        "properties": Object {
          "frame": Object {
            "allOf": Array [
              Object {
                "$ref": "test_schema#/definitions/Omit<Obj,\\"type\\">",
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
  "Body": null,
  "Headers": Object {
    "authorization": "required",
    "getheader": "isHere",
    "host": "localhost:80",
    "user-agent": "lightMyRequest",
  },
  "Params": Object {},
  "Query": Null Object {},
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
  "Body": null,
  "Headers": Object {
    "authorization": "required",
    "getheader": "isHere",
    "host": "localhost:80",
    "user-agent": "lightMyRequest",
  },
  "Params": Object {},
  "Query": Null Object {},
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
Error: querystring.getQueryParam should be boolean {
  "validation": Array [
    Object {
      "dataPath": ".getQueryParam",
      "keyword": "type",
      "message": "should be boolean",
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
  "Body": null,
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
    "content-length: 96",
    "content-type: application/json; charset=utf-8",
    "Date: dateString",
    "Connection: keep-alive",
  ],
  "Payload": Array [
    Object {
      "error": "Bad Request",
      "message": "querystring.getQueryParam should be boolean",
      "statusCode": 400,
    },
  ],
}
`

exports[`test/integration.test.ts TAP it validates get query param against schema > wrong type of query param 1`] = `
Object {
  "error": "Bad Request",
  "message": "querystring.getQueryParam should be boolean",
  "statusCode": 400,
}
`

exports[`test/integration.test.ts TAP it validates headers > error logs 1`] = `
Error: headers should have required property 'authorization' {
  "validation": Array [
    Object {
      "dataPath": "",
      "keyword": "required",
      "message": "should have required property 'authorization'",
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
Error: headers should have required property 'getheader' {
  "validation": Array [
    Object {
      "dataPath": "",
      "keyword": "required",
      "message": "should have required property 'getheader'",
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
    "message": "headers should have required property 'authorization'",
    "statusCode": 400,
  },
  Object {
    "error": "Bad Request",
    "message": "headers should have required property 'getheader'",
    "statusCode": 400,
  },
]
`

exports[`test/integration.test.ts TAP it validates headers > request path:GET / id:req-1 1`] = `
Object {
  "Body": null,
  "Headers": Object {
    "getheader": "isHere",
    "host": "localhost:80",
    "user-agent": "lightMyRequest",
  },
  "Params": Object {},
  "Query": Null Object {},
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
  "Body": null,
  "Headers": Object {
    "authorization": "isHere",
    "host": "localhost:80",
    "user-agent": "lightMyRequest",
  },
  "Params": Object {},
  "Query": Null Object {},
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
    "content-length: 106",
    "content-type: application/json; charset=utf-8",
    "Date: dateString",
    "Connection: keep-alive",
  ],
  "Payload": Array [
    Object {
      "error": "Bad Request",
      "message": "headers should have required property 'authorization'",
      "statusCode": 400,
    },
  ],
}
`

exports[`test/integration.test.ts TAP it validates headers > response path:GET / id:req-2 1`] = `
Object {
  "Headers": Array [
    "HTTP/1.1 400 Bad Request",
    "content-length: 102",
    "content-type: application/json; charset=utf-8",
    "Date: dateString",
    "Connection: keep-alive",
  ],
  "Payload": Array [
    Object {
      "error": "Bad Request",
      "message": "headers should have required property 'getheader'",
      "statusCode": 400,
    },
  ],
}
`

exports[`test/integration.test.ts TAP response is validated > error logs 1`] = `
Error: "name" is required!
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
  "Body": null,
  "Headers": Object {
    "authorization": "required",
    "getheader": "isHere",
    "host": "localhost:80",
    "user-agent": "lightMyRequest",
  },
  "Params": Object {},
  "Query": Null Object {},
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
  "Body": null,
  "Headers": Object {
    "authorization": "required",
    "getheader": "isHere",
    "host": "localhost:80",
    "user-agent": "lightMyRequest",
  },
  "Params": Object {},
  "Query": Null Object {},
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
