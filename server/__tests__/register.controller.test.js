// test registration controller
import {Mockgoose} from 'mockgoose-fix';
import mongoose from 'mongoose';
import User from '../models/user';

const mockgoose = new Mockgoose(mongoose);


const app = require("../app");
const request = require("supertest");

describe("Register controller", () => {
  beforeAll(async () => {
    //await mockgoose.prepareStorage();
    await mongoose.connect('mongodb://localhost/test');
  })

  afterEach((done) => {
    User.remove({}, (err) => {
      if (err) {
        done(err);
      }
      done();
    });
  });

  afterAll(async () => {
    await mongoose.disconnect();
  });

  test("it should return BadRequest if only has email", done => {
    request(app)
      .post("/api/account/register")
      .send({
        email: "foo@bar.com"
      })
      //.set("Content-Type", "application/json")
      .then(response => {
        expect(response.statusCode).toBe(400);
        done();
      });
  });

  test("it should return OK if email, mobile and password fields exist", done => {
    request(app)
      .post("/api/account/register")
      .send({
        email: "foo@bar.com",
        mobile: "0422222222",
        password: "password",
      })
      .then(response => {
        expect(response.statusCode).toBe(200);
        done();
      });
  });
});
