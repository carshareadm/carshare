// test Profile controller
import { Mockgoose } from "mockgoose-fix";
import mongoose from "mongoose";
import User from "../../../models/user";
import License from "../../../models/license";
import Address from "../../../models/address";
const config = require("../../../config");
const DateUtils = require("../../../util/date.helper");
const jwt = require("jwt-simple");

const mockgoose = new Mockgoose(mongoose);

const app = require("../../../app");
const request = require("supertest");

let testUser = null;
let testAddress = null;
let testLicense = null;

const getToken = () => {
  let token = {
    sub: testUser._id,
    email: testUser.email,
    isAdmin: false,
    exp: DateUtils.getDateInSeconds(DateUtils.addHours(new Date(), 1)),
  };

  return jwt.encode(token, config.jwt.secret);
};

describe("Profile controller", () => {  

  beforeAll(async () => {
    await mongoose.connect("mongodb://localhost/test");
  });

  beforeEach(done => {
    const license = new License();
    license.licenseNumber = '12345';
    
    const address = new Address();
    address.street1 = '1 Foo St';
    address.suburb = 'Bar';
    address.state = 'WA';
    address.postCode = '6000';

    const user = new User();
    user.email = "user1@gmail.com";
    user.mobile = "0411111111";
    user.password = "12345";

    license.save()
      .then(() => address.save())
      .then(() => {
        user.license = license;
        user.address = address;
        user.save();        
      })
      .then(() => {
        testLicense = license;
        testAddress = address;
        testUser = user;
        done();
      })
      .catch(e => done(e));
  });

  afterEach(done => {
    Promise.all(
			[User, License, Address].map(k => k.remove({}))
		).then(() => done())
		.catch(e => done(e));
  });

  afterAll(async (done) => {
    await mongoose.disconnect();
    done();
  });

  test("it should return 400 if no request body", done => {
    const jwt = getToken();
    request(app)
      .post("/api/profile")
      .set('Authorization', 'Bearer ' + jwt)
      .send()
      .then(response => {
        expect(response.statusCode).toBe(400);
        expect(response.text).toBe('No request body');
        done();
      });
  });

  test("it should return 400 if email and mobile present", done => {
    const jwt = getToken();
    request(app)
      .post("/api/profile")
      .set('Authorization', 'Bearer ' + jwt)
      .send({ user: testUser._id, email: 'userfoo@foo.com', mobile: '0422222222'})
      .then(response => {
        expect(response.statusCode).toBe(400);
        expect(response.text).toBe('Nothing updated');
        done();
      });
  });

  // TODO: more tests for license and address, and happy path all save

});
