// test isAuthenticatedGuard
import { Mockgoose } from "mockgoose-fix";
import mongoose from "mongoose";
import User from "../../models/user";
import License from "../../models/license";
const config = require("../../config");
const DateUtils = require("../../util/date.helper");
const jwt = require("jwt-simple");

const mockgoose = new Mockgoose(mongoose);

const app = require("../../app");
const request = require("supertest");

let testUser = null;
let license = null;

const setLicense = (number, image, disabled, approved) => {
  const l = new License();
  l.licenseNumber = number;
  l.image = image;
  l.isDisabled = disabled;
  l.approvedByAdmin = approved;
  return l;
};

describe("isAbleToMakeBookingGuard", () => {
  beforeAll(async () => {
    await mongoose.connect("mongodb://localhost/test", {
      useMongoClient: true,
    });
  });

  beforeEach(async done => {
    const user = new User();
    user.email = "user1@gmail.com";
    user.mobile = "0411111111";
    user.password = "12345";
    try {
      testUser = await user.save();
      done();
    } catch (e) {
      done(e);
    }
  });

  afterEach(async done => {
    try {
      await User.remove({ email: testUser.email });
      done();
    } catch (e) {
      done(e);
    }
  });

  afterAll(async done => {
    await mongoose.disconnect();
    done();
  });

  describe("Create Booking", () => {
    test("it should return Unauthorised if no license", done => {
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
        .put("/api/booking")
        .set("Authorization", "Bearer " + encodedToken)
        .send()
        .then(response => {
          expect(response.statusCode).toBe(401);
          expect(response.body.error).toBe("No License");
          done();
        });
    });

    test("it should return Unauthorised if no license image", async done => {
      const badLicense = setLicense("12345", null, false, false);
      try {
        license = await badLicense.save();
        testUser.license = badLicense;
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
          .put("/api/booking")
          .set("Authorization", "Bearer " + encodedToken)
          .send()
          .then(response => {
            expect(response.statusCode).toBe(401);
            expect(response.body.error).toBe("License photo not uploaded");
            done();
          });
      } catch (e) {
        done(e);
      }
    });
    
    test("it should return Unauthorised if license disabled", async done => {
      const badLicense = setLicense("12345", '5ac8c98c09eeea0911468934', true, false);
      try {
        license = await badLicense.save();
        testUser.license = badLicense;
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
          .put("/api/booking")
          .set("Authorization", "Bearer " + encodedToken)
          .send()
          .then(response => {
            expect(response.statusCode).toBe(401);
            expect(response.body.error).toBe("License disabled");
            done();
          });
      } catch (e) {
        done(e);
      }
    });

    test("it should return Unauthorised if license not approved", async done => {
      const badLicense = setLicense("12345", '5ac8c98c09eeea0911468934', false, false);
      try {
        license = await badLicense.save();
        testUser.license = badLicense;
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
          .put("/api/booking")
          .set("Authorization", "Bearer " + encodedToken)
          .send()
          .then(response => {
            expect(response.statusCode).toBe(401);
            expect(response.body.error).toBe("License has not been approved yet");
            done();
          });
      } catch (e) {
        done(e);
      }
    });

    test("it should not return Unauthorised if license is approved", async done => {
      const badLicense = setLicense("12345", '5ac8c98c09eeea0911468934', false, true);
      try {
        license = await badLicense.save();
        testUser.license = badLicense;
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
          .put("/api/booking")
          .set("Authorization", "Bearer " + encodedToken)
          .send()
          .then(response => {
            expect(response.statusCode).not.toBe(401);
            done();
          });
      } catch (e) {
        done(e);
      }
    });
  });

  
});
