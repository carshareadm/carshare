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

describe("Confirm controller", () => {
  let testUser;

  beforeAll(async () => {
    await mongoose.connect("mongodb://localhost/test", { useMongoClient: true });
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
        const code = new ConfirmationCode();
        code.code = "123456";
        code.expiresAt = dateUtil.addHours(new Date(), 1);
        code.user = testUser;
        code.codeType = "Register";

        code.save((sErr, sCode) => {
          if (sErr) {
            done(sErr);
          } 
          else {
            done();
          }
        });
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

  afterAll(async (done) => {
    await mongoose.disconnect();
    done();
  });
  test("it should verify code", done => {
    let token = {
      sub: testUser._id,
      email: testUser.email,
      isAdmin: false,
      exp: dateUtil.getDateInSeconds(dateUtil.addHours(new Date(), 1)),
    };

    const encodedToken = jwt.encode(token, config.jwt.secret);

		request(app)
    .post("/api/confirm")
    .set('Authorization', 'Bearer ' + encodedToken)
    .send({
      codeType: "Register",
      code: "123456",
    })
		.then(response => {
			expect(response.statusCode).toBe(200);
			done();
    })
	})


})