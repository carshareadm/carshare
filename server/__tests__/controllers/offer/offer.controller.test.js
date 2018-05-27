/**
 * Project       - ShaCar
 * Team          - Group 3 Carshare
 * Last Modified - 2018/05/26
 * Authors
 *               - Tianqi Chen
 */
import { Mockgoose } from "mockgoose-fix";
import mongoose from "mongoose";
import User from "../../../models/user";
import License from "../../../models/license";
import Address from "../../../models/address";
import Offer from "../../../models/offer";

import moment from "moment";
import Location from "../../../models/location";
const config = require("../../../config");
const DateUtils = require("../../../util/date.helper");
const jwt = require("jwt-simple");

const mockgoose = new Mockgoose(mongoose);

const app = require("../../../app");
const request = require("supertest");

let testUser = null;
let testOffer = null; 

describe("Offer controller", () => {
  beforeAll(async () => {
    await mongoose.connect("mongodb://localhost/test", {
      useMongoClient: true,
    });
  });

  beforeEach(async done => {

    const user = new User();
    user.email = "bookingUser@gmail.com";
    user.mobile = "0499999999";
    user.password = "98765";
    user.isAccountConfirmed =true;
    user.isAdmin =true;

    const discount = new Offer();
    discount.offerCode = "1234";
    discount.expiresAt = DateUtils.addHours(new Date(), 10);
    discount.isDisabled = false;
    discount.oneOffValue = 10;

    try {
      const savedUser = await user.save().catch(err => {console.log(err)});

      const savedOffer = await discount.save().catch(err => {console.log(err)});

      testUser = savedUser;
      testOffer = savedOffer;

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

  test("it should return 400 if no request body", async done => {
    try {
      const user = await testUser.save();
      let token = {
        sub: testUser._id,
        email: testUser.email,
        isAdmin: false,
        exp: DateUtils.getDateInSeconds(
          DateUtils.addHours(new Date(), config.jwt.lifetimeInHours)
        ),
      };
      const encodedToken = jwt.encode(token, config.jwt.secret); 
    request(app)
      .put("/api/offer/")
      .set("Authorization", "Bearer " + encodedToken)
      .send()
      .then(response => {
        expect(response.statusCode).toBe(400);
        done();
      });
    } catch (e) {
      done(e);
    }
  });

  test("it should return 200 if offer is sent and valid", async done => {
    try {
      const user = await testUser.save();
      const savedOffer = await testOffer.save().catch(err => {console.log(err)});
      let token = {
        sub: testUser._id,
        email: testUser.email,
        isAdmin: false,
        exp: DateUtils.getDateInSeconds(
          DateUtils.addHours(new Date(), config.jwt.lifetimeInHours)
        ),
      };
      const encodedToken = jwt.encode(token, config.jwt.secret);    
    request(app)
      .put("/api/offer")
      .set("Authorization", "Bearer " + encodedToken)
      .send({
        code: savedOffer.offerCode,
      })
      .then(response => {
        expect(response.statusCode).toBe(200);
        done();
      });
    } catch (e) {
      done(e);
    }
  });

});
