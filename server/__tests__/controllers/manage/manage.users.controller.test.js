// test Booking controller
import { Mockgoose } from "mockgoose-fix";
import mongoose from "mongoose";
import User from "../../../models/user";
import License from "../../../models/license";
import Image from "../../../models/image";

import moment from "moment";
const config = require("../../../config");
const DateUtils = require("../../../util/date.helper");
const jwt = require("jwt-simple");

const mockgoose = new Mockgoose(mongoose);

const app = require("../../../app");
const request = require("supertest");

let testAdmin = null;
let testUser = null;

describe("Manage Users", () => {
  beforeAll(async () => {
    await mongoose.connect("mongodb://localhost/test", {
      useMongoClient: true,
    });
  });

  beforeEach(async done => {

    const admin = new User();
    admin.email = "adminUser@gmail.com";
    admin.mobile = "0499999999";
    admin.password = "98765";
    admin.isAccountConfirmed = true;
    admin.isAdmin = true;

    const image = new Image();
    image.filename = `${((new Date()).getTime())}.png`;

    const license = new License();
    license.licenseNumber = '12345';

    const user = new User();
    user.email = "testUser@gmail.com";
    user.mobile = "0499999999";
    user.password = "98765";
    user.isAccountConfirmed = true;
    user.isAdmin = false;    

    try {      
      const savedAdmin = await admin.save().catch(err => {console.log(err)});
      const savedImg = await image.save().catch(e => console.log(e));
      
      license.image = savedImg;
      const savedLicense = await license.save().catch(e => console.log(e));

      user.license = savedLicense;
      const savedUser = await user.save().catch(e => console.log(e));
      
      testAdmin = savedAdmin;
      testUser = savedUser;
      done();
    } catch (e) {
      done(e);
    }
  });

  afterEach(done => {
    Promise.all([User, License, Image].map(k => k.remove({})))
      .then(() => done())
      .catch(e => done(e));
  });

  afterAll(async done => {
    await mongoose.disconnect();
    done();
  });

  const token = () => {
    let token = {
      sub: testAdmin._id,
      email: testAdmin.email,
      isAdmin: false,
      exp: DateUtils.getDateInSeconds(
        DateUtils.addHours(new Date(), config.jwt.lifetimeInHours)
      ),
    };
    return jwt.encode(token, config.jwt.secret);
  };

  test("get users", async done => {
    try {      
      const encodedToken = token(); 
      const response = await request(app)
        .get("/api/manage/users")
        .set("Authorization", "Bearer " + encodedToken)
        .send();        
      expect(response.statusCode).toBe(200);
      expect(response.body.length).toBe(1);
      const user = response.body[0];
      expect(user._id).toBe(testUser.id);
      done();
    } catch (e) {
      done(e);
    }
  });

  // test("update car", async done => {
  //   try {      
  //     testCar.isDisabled = true;
  //     const encodedToken = token(); 
  //     const response = await request(app)
  //       .put(`/api/manage/cars/${testCar._id.toString()}`)
  //       .set("Authorization", "Bearer " + encodedToken)
  //       .send(testCar);        
  //     expect(response.statusCode).toBe(200);
  //     expect(response.body.isDisabled).toBe(true);
  //     done();
  //   } catch (e) {
  //     done(e);
  //   }
  // });
});
