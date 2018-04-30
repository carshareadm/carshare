// test Booking controller
import { Mockgoose } from "mockgoose-fix";
import mongoose from "mongoose";
import Offer from "../../../models/offer";
import User from "../../../models/user";

import moment from "moment";

const config = require("../../../config");
const DateUtils = require("../../../util/date.helper");
const jwt = require("jwt-simple");

const mockgoose = new Mockgoose(mongoose);

const app = require("../../../app");
const request = require("supertest");

let testOffer = null;
let testUser = null;

describe("Manage Offers", () => {
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

    const offer = new Offer();

    offer.offerCode = "ABC123";
    offer.multiplier = 10;
    offer.oneOffValue = 10;
    offer.expiresAt = moment().add(1,'d');
    offer.isDisabled = false;

    try {

      const savedUser = await user.save().catch(err => {console.log(err)});

      const savedOffer = await offer.save().catch(err => {console.log(err)});

      testOffer = savedOffer;
      testUser = savedUser;
      done();
    } catch (e) {
      done(e);
    }
  });

  afterEach(done => {
    Promise.all([User, Offer].map(k => k.remove({})))
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

  test("get offers", async done => {
    try {      
      const encodedToken = token(); 
      const response = await request(app)
        .get("/api/manage/offers")
        .set("Authorization", "Bearer " + encodedToken)
        .send();        
      expect(response.statusCode).toBe(200);
      expect(response.body.length).toBe(1);
      const offer = response.body[0];
      expect(offer._id).toBe(testOffer.id);
      done();
    } catch (e) {
      done(e);
    }
  });

  test("update offer", async done => {
    try {      
      testOffer.isDisabled = true;
      const encodedToken = token(); 
      const response = await request(app)
        .put(`/api/manage/offers/${testOffer._id.toString()}`)
        .set("Authorization", "Bearer " + encodedToken)
        .send(testOffer);        
      expect(response.statusCode).toBe(200);
      expect(response.body.isDisabled).toBe(true);
      done();
    } catch (e) {
      done(e);
    }
  });
});
