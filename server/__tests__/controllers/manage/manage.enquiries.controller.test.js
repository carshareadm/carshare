/**
 * Project       - ShaCar
 * Team          - Group 3 Carshare
 * Last Modified - 2018/05/26
 * Authors
 *               - Jason Koh
 */
import { Mockgoose } from "mockgoose-fix";
import mongoose from "mongoose";
import User from "../../../models/user";
import Enquiry from "../../../models/enquiry";

const config = require("../../../config");
const DateUtils = require("../../../util/date.helper");
const jwt = require("jwt-simple");

const mockgoose = new Mockgoose(mongoose);

const app = require("../../../app");
const request = require("supertest");

let testUser = null;
let testEnquiry1 = null;
let testEnquiry2 = null;

describe("Manage enquiries controller", () => {
  beforeAll(async () => {
    await mongoose.connect("mongodb://localhost/test", {
      useMongoClient: true,
    });
  });

  beforeEach(async done => {

    const user = new User();
    user.email = "adminUser@gmail.com";
    user.mobile = "0499999999";
    user.password = "98765";
    user.isAccountConfirmed =true;
    user.isAdmin = true;

    const enquiry1 = new Enquiry();
    enquiry1.emailFrom = "user1@test.com";
    enquiry1.name = "user1";
    enquiry1.message = "This is user1's message.";

    const enquiry2 = new Enquiry();
    enquiry2.emailFrom = "user2@test.com";
    enquiry2.name = "user2";
    enquiry2.message = "This is user2's message.";
    enquiry2.response = "Thank you for your message."
    enquiry2.responseAt = Date.now() + 60000;


    try {
      const savedUser = await user.save().catch(err => {console.log(err)});
      const savedEnquiry1 = await enquiry1.save().catch(err => {console.log(err)});
      const savedEnquiry2 = await enquiry2.save().catch(err => {console.log(err)});

      testUser = savedUser;
      testEnquiry1 = savedEnquiry1;
      testEnquiry2 = savedEnquiry2;
      done();
    } catch (e) {
      done(e);
    }
  });

  afterEach(done => {
    Promise.all([User, Enquiry].map(k => k.remove({})))
      .then(() => done())
      .catch(e => done(e));
  });

  afterAll(async done => {
    await mongoose.disconnect();
    done();
  });

  const token = () => {
    let token = {
      sub: testUser._id,
      email: testUser.email,
      isAdmin: true,
      exp: DateUtils.getDateInSeconds(
        DateUtils.addHours(new Date(), config.jwt.lifetimeInHours)
      ),
    };
    return jwt.encode(token, config.jwt.secret);
  };

  test("get unresponded enquiries", async done => {
    try {
      const encodedToken = token();
      const response = await request(app)
        .get("/api/manage/enquiries")
        .set("Authorization", "Bearer " + encodedToken)
        .send();
      expect(response.statusCode).toBe(200);
      expect(response.body.length).toBe(1);
      const enquiry = response.body[0];
      expect(enquiry._id).toBe(testEnquiry1.id);
      done();
    } catch (e) {
      done(e);
    }
  });

  test("respond to enquiry", async done => {
    try {
      testEnquiry1.response = "This is our response to User1.";
      const encodedToken = token();
      const response = await request(app)
        .put(`/api/manage/enquiries/${testEnquiry1._id.toString()}`)
        .set("Authorization", "Bearer " + encodedToken)
        .send(testEnquiry1);
      expect(response.statusCode).toBe(200);
      expect(response.body.response).toBe(testEnquiry1.response);
      const responseAt = new Date(response.body.responseAt);
      expect(responseAt).toBeInstanceOf(Date);
      expect(responseAt.getTime()).toBeLessThan(Date.now());
      done();
    } catch (e) {
      done(e);
    }
  });
});
