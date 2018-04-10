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
});
