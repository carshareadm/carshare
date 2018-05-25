/**
 * Project       - ShaCar
 * Team          - Group 3 Carshare
 * Last Modified - 2018/05/26
 * Authors
 *               - Paul Crow
 */
import {Mockgoose} from 'mockgoose-fix';
import mongoose from 'mongoose';
import User from '../../../models/user';
import ConfirmationCode from '../../../models/confirmationCode';
const dateUtil = require('../../../util/date.helper');
const jwt = require("jwt-simple");
const config = require('../../../config');

const mockgoose = new Mockgoose(mongoose);


const app = require("../../../app");
const request = require("supertest");

describe("SMS controller", () => {
  let user;
  let code;

	beforeAll((done) => {
    mongoose.connect('mongodb://localhost/test', { useMongoClient: true }).then(() => done());    
	})
  
	beforeEach(done => {
    user = new User();
    user.email = "testsms@gmail.com";
    user.mobile = "0411111111";
    user.password = "12345";
  
    code = new ConfirmationCode();
    code.code = "123456";
    code.expiresAt = dateUtil.addHours(new Date(), 0.25);
    code.user = user;
    code.codeType = "Register";
  
    code.save()
    .then(() => user.save())
    .then(() => done())
    .catch(e => done(e));
  });

  afterEach(done => {
    User.remove({})
      .then(() => done())
			.catch(err => done(err))
  });

  afterAll(done => {
    mongoose.disconnect().then(() => done());
  });

	test("it should send SMS", done => {
    let token = {
      sub: user._id,
      email: user.email,
      isAdmin: false,
      exp: dateUtil.getDateInSeconds(dateUtil.addHours(new Date(), 1)),
    };

    const encodedToken = jwt.encode(token, config.jwt.secret);
    
		request(app)
    .post("/api/confirm/sms")
    .set('Authorization', 'Bearer ' + encodedToken)
    .send({
      codeType: "Register",
    })
		.then(response => {
			expect(response.statusCode).toBe(200);
			done();
		})
	})


})