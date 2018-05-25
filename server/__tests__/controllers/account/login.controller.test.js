/**
 * Project       - ShaCar
 * Team          - Group 3 Carshare
 * Last Modified - 2018/05/26
 * Authors
 *               - Paul Crow
 */
// test registration controller
import { Mockgoose } from "mockgoose-fix";
import mongoose from "mongoose";
import User from "../../../models/user";

const mockgoose = new Mockgoose(mongoose);

const app = require("../../../app");
const request = require("supertest");

describe("Login controller", () => {
  beforeAll(async () => {
    await mongoose.connect("mongodb://localhost/test", { useMongoClient: true });
  });

  beforeEach(done => {
    const user = new User();
    user.email = "adm@gmail.com";
    user.mobile = "0411111111";
    user.password = "12345";
    user.save()
      .then(() => done())
      .catch(err => done(err))
  });

  afterEach(done => {
    User.remove({})
      .then(() => done())
			.catch(err => done(err))
  });

  afterAll(async (done) => {
    await mongoose.disconnect();
    done();
  });

  test("it should return Unauthorised if only has email", done => {
    request(app)
      .post("/api/account/login")
      .send({
        email: "adm@gmail.com",
      })
      .then(response => {
        expect(response.statusCode).toBe(401);
        done();
      });
  });

  test("it should return Unauthorised if email is not found", done => {
    request(app)
      .post("/api/account/login")
      .send({
        email: "no_adm@gmail.com",
      })
      .then(response => {
        expect(response.statusCode).toBe(401);
        done();
      });
  });
  
  test("it should return Unauthorised if email is found and password is wrong", done => {
    request(app)
      .post("/api/account/login")
      .send({
        email: "adm@gmail.com",
        password: 'wrongPassword',
      })
      .then(response => {
        expect(response.statusCode).toBe(401);
        done();
      });
  });

  test("it should return OK if email and password is valid", done => {
    request(app)
      .post("/api/account/login")
      .send({
        email: "adm@gmail.com",
        password: "12345",
      })
      .then(response => {
        expect(response.statusCode).toBe(200);
        const body = response.body;
        expect(Object.keys(body)).toContain('token');
        done();
      });
  });
});
