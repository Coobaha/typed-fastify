/* IMPORTANT
 * This snapshot file is auto-generated, but designed for humans.
 * It should be checked into source control and tracked carefully.
 * Re-generate by setting TAP_SNAPSHOT=1 and running tests.
 * Make sure to inspect the output below.  Do not ignore changes!
 */
'use strict';
exports[`test/integration.test.ts TAP POST / rejects invalid payload > invalid user name 1`] = `
Object {
  "error": "Bad Request",
  "message": "body.user.name should be string",
  "statusCode": 400,
}
`;

exports[`test/integration.test.ts TAP POST / type casts payload when possible > 123 was casted to string 1`] = `
Object {
  "msg": "Hello, 123, string",
  "user": Object {
    "name": "123",
  },
}
`;

exports[`test/integration.test.ts TAP POST / works > contains user name in msg 1`] = `
Object {
  "msg": "Hello, Test User, string",
  "user": Object {
    "name": "Test User",
  },
}
`;

exports[`test/integration.test.ts TAP app starts and GET / works > happy path 1`] = `
Object {
  "name": "hello",
}
`;

exports[`test/integration.test.ts TAP it sends headers > x-custom header is present 1`] = `
Object {
  "connection": "keep-alive",
  "content-length": "16",
  "content-type": "application/json; charset=utf-8",
  "date": "dateString",
  "x-custom": "1",
}
`;

exports[`test/integration.test.ts TAP it validates get query param against schema > wrong type of query param 1`] = `
Object {
  "error": "Bad Request",
  "message": "querystring.getQueryParam should be boolean",
  "statusCode": 400,
}
`;

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
`;

exports[`test/integration.test.ts TAP response is validated > error logs 1`] = `
Error: "name" is required!
`;

exports[`test/integration.test.ts TAP response is validated > invalid response 1`] = `
Object {
  "error": "Internal Server Error",
  "message": "\\"name\\" is required!",
  "statusCode": 500,
}
`;
