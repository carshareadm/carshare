// test isAuthenticatedGuard
import { Mockgoose } from "mockgoose-fix";
import mongoose from "mongoose";
import User from "../../models/user";
const config = require("../../config");
const DateUtils = require("../../util/date.helper");
const jwt = require("jwt-simple");

const mockgoose = new Mockgoose(mongoose);

const app = require("../../app");
const request = require("supertest");

let testUser = null;

describe("Profile controller", () => {
  beforeAll(async () => {
    await mongoose.connect("mongodb://localhost/test");
  });

  beforeEach(done => {
    const user = new User();
    user.email = "user1@gmail.com";
    user.mobile = "0411111111";
    user.password = "12345";
    user.save((err, saved) => {
      if (err) {
        done(err);
      } else {
        testUser = user;
        done();
      }
    });
  });

  afterEach(done => {
    User.remove({}, err => {
      if (err) {
        done(err);
      }
      done();
    });
  });

  afterAll(async () => {
    await mongoose.disconnect();
  });

  test("it should return Unauthorised if no auth token", done => {
    request(app)
      .get("/api/profile/my")
      .send()
      .then(response => {
        expect(response.statusCode).toBe(401);
        expect(response.body.error).toBe('Token Missing');
        done();
      });
  });

  test("it should return Unauthorised if token encoded with wrong secret", done => {
    let token = {
      sub: 'user._id',
      email: 'user.email',
      isAdmin: false,
      exp: DateUtils.getDateInSeconds(DateUtils.addHours(new Date(), config.jwt.lifetimeInHours)),
    };

    const encodedToken = jwt.encode(token, 'wrong.secret');
    request(app)
      .get("/api/profile/my")
      .set('Authorization', 'Bearer ' + encodedToken)
      .send()
      .then(response => {
        expect(response.statusCode).toBe(401);
        expect(response.body.error).toBe('Signature verification failed');
        done();
      });
  });

  test("it should return Unauthorised if token has expired", done => {
    let token = {
      sub: 'user._id',
      email: 'user.email',
      isAdmin: false,
      exp: DateUtils.getDateInSeconds(DateUtils.addHours(new Date(), -1)),
    };

    const encodedToken = jwt.encode(token, config.jwt.secret);
    request(app)
      .get("/api/profile/my")
      .set('Authorization', 'Bearer ' + encodedToken)
      .send()
      .then(response => {
        expect(response.statusCode).toBe(401);
        expect(response.body.error).toBe('Token expired');
        done();
      });
  });

  test("it should return Unauthorised if User not found", done => {
    let token = {
      sub: 'user._id',
      email: 'user.email',
      isAdmin: false,
      exp: DateUtils.getDateInSeconds(DateUtils.addHours(new Date(), 1)),
    };

    const encodedToken = jwt.encode(token, config.jwt.secret);
    request(app)
      .get("/api/profile/my")
      .set('Authorization', 'Bearer ' + encodedToken)
      .send()
      .then(response => {
        expect(response.statusCode).toBe(401);
        expect(response.body.error).toBe('No User');
        done();
      });
  });

  test("it should return OK if User is authorised", done => {
    let token = {
      sub: testUser._id,
      email: testUser.email,
      isAdmin: false,
      exp: DateUtils.getDateInSeconds(DateUtils.addHours(new Date(), 1)),
    };

    const encodedToken = jwt.encode(token, config.jwt.secret);
    const expectedId = testUser._id;
    request(app)
      .get("/api/profile/my")
      .set('Authorization', 'Bearer ' + encodedToken)
      .send()
      .then(response => {
        expect(response.statusCode).toBe(200);
        done();
      });  
  });
});
