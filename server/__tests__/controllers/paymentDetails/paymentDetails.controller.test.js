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
import CreditCard from "../../../models/creditCard";

const config = require("../../../config");
const DateUtils = require("../../../util/date.helper");
const jwt = require("jwt-simple");

const mockgoose = new Mockgoose(mongoose);

const app = require("../../../app");
const request = require("supertest");

let testUser1 = null;
let testUser2 = null;
let testCard1 = null;
let testUser1CardId = null;

const testCard2 = {};
testCard2.cardNumber = "4111111111111111";
testCard2.nameOnCard = "user2";
testCard2.expiryMonth = 12;
testCard2.expiryYear = 2018;
// invalid cards:
// no card number
const invalid1 = {};
invalid1.nameOnCard = "user1";
invalid1.expiryMonth = 12;
invalid1.expiryYear = 2018;
// no name
const invalid2 = {};
invalid2.cardNumber = "4242424242424242";
invalid2.expiryMonth = 12;
invalid2.expiryYear = 2018;
// invalid expiry month
const invalid3 = {};
invalid3.cardNumber = "4242424242424242";
invalid3.nameOnCard = "user1";
invalid3.expiryMonth = 13;
invalid3.expiryYear = 2018;
// invalid expiry year
const invalid4 = {};
invalid4.cardNumber = "4242424242424242";
invalid4.nameOnCard = "user1";
invalid4.expiryMonth = 12;
invalid4.expiryYear = 2016;

describe("Payment details controller", () => {
  beforeAll(async () => {
    await mongoose.connect("mongodb://localhost/test", {
      useMongoClient: true,
    });
  });

  beforeEach(async done => {
    const user1 = new User();
    user1.email = "user1@test.com";
    user1.mobile = "0499999999";
    user1.password = "987654";
    user1.isAccountConfirmed = true;
    user1.isAdmin = false;

    const user2 = new User();
    user2.email = "user2@test.com";
    user2.mobile = "0411111111";
    user2.password = "654321";
    user2.isAccountConfirmed = true;
    user2.isAdmin = false;

    const card1 = new CreditCard();
    card1.cardNumber = "4242424242424242";
    card1.nameOnCard = "user1";
    card1.expiryMonth = "12";
    card1.expiryYear = "2018"

    try {
      const savedCard1 = await card1.save().catch(err => {console.log(err)});
      user1.creditCard = savedCard1;
      const savedUser1 = await user1.save().catch(err => {console.log(err)});
      const savedUser2 = await user2.save().catch(err => {console.log(err)});

      testUser1 = savedUser1;
      testUser2 = savedUser2;
      testCard1 = savedCard1;
      testUser1CardId = savedCard1._id;

      done();
    } catch (e) {
      done(e);
    }
  });

  afterEach(done => {
    Promise.all([User, CreditCard].map(k => k.remove({})))
      .then(() => done())
      .catch(e => done(e));
  });

  afterAll(async done => {
    await mongoose.disconnect();
    done();
  });

  const token = (user) => {
    let token = {
      sub: user._id,
      email: user.email,
      isAdmin: user.isAdmin,
      exp: DateUtils.getDateInSeconds(
        DateUtils.addHours(new Date(), config.jwt.lifetimeInHours)
      ),
    };
    return jwt.encode(token, config.jwt.secret);
  };

  test(
    "Get payment details should return payment details with only " +
    "last 4 digits of credit card number",
    async done => {
      try {
        const encodedToken = token(testUser1);
        const response = await request(app)
          .get("/api/paymentDetails/my")
          .set("Authorization", "Bearer " + encodedToken)
          .send();
        expect(response.statusCode).toBe(200);
        const received = response.body.creditCard;
        expect(received.cardNumber).toBeUndefined();
        expect(received.lastFourDigits).toBe(testCard1.lastFourDigits);
        expect(received.nameOnCard).toBe(testCard1.nameOnCard);
        expect(received.expiryMonth).toBe(testCard1.expiryMonth);
        expect(received.expiryYear).toBe(testCard1.expiryYear);
        expect(received.isDisabled).toBe(testCard1.isDisabled);
        done();
      } catch (e) {
        done(e);
      }
    }
  );

  test(
    "Add payment details should add payment details to user account.",
    async done => {
      try {
        const encodedToken = token(testUser2);
        const response1 = await request(app)
          .post("/api/paymentDetails/add")
          .set("Authorization", "Bearer " + encodedToken)
          .send(testCard2);
        expect(response1.statusCode).toBe(200);
        const response2 = await request(app)
          .get("/api/paymentDetails/my")
          .set("Authorization", "Bearer " + encodedToken)
          .send();
        const received = response2.body.creditCard;
        expect(received.cardNumber).toBeUndefined();
        expect(received.lastFourDigits).toBe(testCard2.cardNumber.slice(-4));
        expect(received.nameOnCard).toBe(testCard2.nameOnCard);
        expect(received.expiryMonth).toBe(testCard2.expiryMonth);
        expect(received.expiryYear).toBe(testCard2.expiryYear);
        expect(received.isDisabled).toBe(false);
        done();
      } catch (e) {
        done(e);
      }
    }
  );

  test(
    "Add invalid payment details should get response 400.",
    async done => {
      try {
        const encodedToken = token(testUser2);

        const response1 = await request(app)
          .post("/api/paymentDetails/add")
          .set("Authorization", "Bearer " + encodedToken)
          .send(invalid1);
        expect(response1.statusCode).toBe(400);

        const response2 = await request(app)
          .post("/api/paymentDetails/add")
          .set("Authorization", "Bearer " + encodedToken)
          .send(invalid2);
        expect(response2.statusCode).toBe(400);

        const response3 = await request(app)
          .post("/api/paymentDetails/add")
          .set("Authorization", "Bearer " + encodedToken)
          .send(invalid3);
        expect(response3.statusCode).toBe(400);

        const response4 = await request(app)
          .post("/api/paymentDetails/add")
          .set("Authorization", "Bearer " + encodedToken)
          .send(invalid4);
        expect(response4.statusCode).toBe(400);

        done();
      } catch (e) {
        done(e);
      }
    }
  );

  test(
    "Update payment details should update user's payment details.",
    async done => {
      try {
        const encodedToken = token(testUser1);
        const update = Object.assign(testCard2, {_id: testUser1CardId});
        const response1 = await request(app)
          .put("/api/paymentDetails/update")
          .set("Authorization", "Bearer " + encodedToken)
          .send(update);
        expect(response1.statusCode).toBe(200);
        const response2 = await request(app)
          .get("/api/paymentDetails/my")
          .set("Authorization", "Bearer " + encodedToken)
          .send();
        const received = response2.body.creditCard;
        expect(received._id).toBe(update._id.toString()); // should not create a new card
        expect(received.cardNumber).toBeUndefined();
        expect(received.lastFourDigits).toBe(update.cardNumber.slice(-4));
        expect(received.nameOnCard).toBe(update.nameOnCard);
        expect(received.expiryMonth).toBe(update.expiryMonth);
        expect(received.expiryYear).toBe(update.expiryYear);
        expect(received.isDisabled).toBe(false);
        done();
      } catch (e) {
        done(e);
      }
    }
  );

  test(
    "Update of non-existing payment details should get 404 response.",
    async done => {
      try {
        const encodedToken = token(testUser2);
        const update = Object.assign(testCard2, {_id: undefined});
        const response = await request(app)
          .put("/api/paymentDetails/update")
          .set("Authorization", "Bearer " + encodedToken)
          .send(update);
        expect(response.statusCode).toBe(404);
        done();
      } catch (e) {
        done(e);
      }
    }
  );

test(
    "Update with invalid payment details should get 400 response.",
    async done => {
      try {
        const encodedToken = token(testUser1);
        const update2 = Object.assign(invalid2, {_id: testUser1CardId});
        const response2 = await request(app)
          .put("/api/paymentDetails/update")
          .set("Authorization", "Bearer " + encodedToken)
          .send(update2);
        expect(response2.statusCode).toBe(400);

        const update3 = Object.assign(invalid3, {_id: testUser1CardId});
        const response3 = await request(app)
          .put("/api/paymentDetails/update")
          .set("Authorization", "Bearer " + encodedToken)
          .send(update3);
        expect(response3.statusCode).toBe(400);

        const update4 = Object.assign(invalid4, {_id: testUser1CardId});
        const response4 = await request(app)
          .put("/api/paymentDetails/update")
          .set("Authorization", "Bearer " + encodedToken)
          .send(update4);
        expect(response4.statusCode).toBe(400);

        done();
      } catch (e) {
        done(e);
      }
    }
  );


});
