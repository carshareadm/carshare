const app = require("../app");
const request = require("supertest");

describe("Express app", () => {
  test("It should respond OK to the root GET method", done => {
    request(app)
      .get("/")
      .then(response => {
        expect(response.statusCode).toBe(200);
        done();
      });
  });

  test("It should respond NotFound to a bogus route", done => {
    request(app)
      .get("/foo/bar")
      .then(response => {
        expect(response.statusCode).toBe(404);
        done();
      });
  });
});
