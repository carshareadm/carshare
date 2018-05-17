import {Mockgoose} from 'mockgoose-fix';
import mongoose from 'mongoose';
import Enquiry from '../../../models/enquiry';

const config = require("../../../config");
const DateUtils = require("../../../util/date.helper");

const mockgoose = new Mockgoose(mongoose);

const app = require("../../../app");
const request = require("supertest");

let testEnquiry = null;

describe("Contact controller", () => {
  beforeAll(async () => {
    await mongoose.connect("mongodb://localhost/test", {
      useMongoClient: true,
    });
  });

  afterEach(done => {
    Promise.all([Enquiry].map(k => k.remove({})))
      .then(() => done())
      .catch(e => done(e));
  });

  afterAll(async done => {
    await mongoose.disconnect();
    done();
  });

  test(
    "Send an enquiry should add an enquiry to the database",
    async done => {
      const testEnquiry = new Enquiry();
      testEnquiry.emailFrom = "user1@test.com";
      testEnquiry.name = "user1";
      testEnquiry.message = "This is user1's message.";

      try {
        const response = await request(app)
          .post(`/api/contact/add`)
          .send(testEnquiry);
        expect(response.statusCode).toBe(200);
        expect(response.body.emailFrom).toBe(testEnquiry.emailFrom);
        expect(response.body.name).toBe(testEnquiry.name);
        expect(response.body.message).toBe(testEnquiry.message);
        const receivedAt = new Date(response.body.receivedAt);
        expect(receivedAt).toBeInstanceOf(Date);
        expect(Date.now() - receivedAt.getTime()).toBeLessThan(300000);
        done();
      } catch (e) {
        done(e);
      }
    }
  );

  test(
    "Enquiry with invalid fields should get 400 response",
    async done => {
      // invalid email
      const testEnquiry1 = new Enquiry();
      testEnquiry1.emailFrom = "invalid.email";
      testEnquiry1.name = "user1";
      testEnquiry1.message = "This is user1's message.";
      // no name
      const testEnquiry2 = new Enquiry();
      testEnquiry2.emailFrom = "user1@test.com";
      testEnquiry2.message = "This is user1's message.";
      // no message
      const testEnquiry3 = new Enquiry();
      testEnquiry3.emailFrom = "invalid.email";
      testEnquiry3.name = "user1";

      try {
        const response1 = await request(app)
          .post(`/api/contact/add`)
          .send(testEnquiry1);
        expect(response1.statusCode).toBe(400);
        const response2 = await request(app)
          .post(`/api/contact/add`)
          .send(testEnquiry2);
        expect(response2.statusCode).toBe(400);
        const response3 = await request(app)
          .post(`/api/contact/add`)
          .send(testEnquiry3);
        expect(response3.statusCode).toBe(400);
        done();
      } catch (e) {
        done(e);
      }
    }
  );
});
