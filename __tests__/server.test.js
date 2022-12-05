// Solution for server test case obtained from below link:

// https://www.albertgao.xyz/2017/05/24/how-to-test-expressjs-with-jest-and-supertest

const request = require("supertest");
const app = require("../src/server/app");

describe("Test the root path", () => {
  test("It should response the GET method", done => {
    request(app)
      .get("/")
      .then(response => {
        expect(response.statusCode).toBe(200);
        done();
      });
  });
});