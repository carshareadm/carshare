let app = require("../app");
let request = require("supertest");
const Mongoose = require('mongoose').Mongoose;
const mongoose = new Mongoose();
const mockgoose = require('mockgoose');

const connectDB = (cb) => () => {
  return mockgoose(mongoose).then(() => {
    return mongoose.connect('mongodb://test/testingDB', err => {
      if (err) {
        console.log('err is', err)
        return process.exit()
      }
      return cb(() => {
        console.log('END') // this is logged
        mongoose.connection.close()
      })
    })
  })
}

describe("Express app", () => {

  test("It should respond OK to the root GET method", async () => {
    const response = await request(app).get("/");
    expect(response.statusCode).toBe(200);
  });

  test("It should respond NotFound to a bogus route", async () => {
    const response = await request(app).get("/foo/bar");
    expect(response.statusCode).toBe(404);
  });
});
