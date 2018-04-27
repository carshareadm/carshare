// test Booking controller
import { Mockgoose } from "mockgoose-fix";
import mongoose from "mongoose";
import User from "../../../models/user";
import Coordinate from "../../../models/coordinate";
import Location from "../../../models/location";

import moment from "moment";
const config = require("../../../config");
const DateUtils = require("../../../util/date.helper");
const jwt = require("jwt-simple");

const mockgoose = new Mockgoose(mongoose);

const app = require("../../../app");
const request = require("supertest");

let testUser = null;
let testLocation = null;

describe("Manage Locations", () => {
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

    const location = new Location();

    const coordinate = new Coordinate();
    coordinate.latitude = "-33.947346";
    coordinate.longitude = "151.179428";

    location.name = "Sydney Airport";
    location.isDisabled = false;

    try {      
      const savedUser = await user.save().catch(err => {console.log(err)});

      const savedCoordinate = await coordinate.save().catch(err => {console.log(err)});
      location.coordinates = savedCoordinate;
      const savedLocation = await location.save().catch(err => {console.log(err)});

      testLocation = savedLocation;
      testUser = savedUser;
      done();
    } catch (e) {
      done(e);
    }
  });

  afterEach(done => {
    Promise.all([User, Location, Coordinate].map(k => k.remove({})))
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
      isAdmin: false,
      exp: DateUtils.getDateInSeconds(
        DateUtils.addHours(new Date(), config.jwt.lifetimeInHours)
      ),
    };
    return jwt.encode(token, config.jwt.secret);
  };

  test("get locations", async done => {
    try {      
      const encodedToken = token(); 
      const response = await request(app)
        .get("/api/manage/locations")
        .set("Authorization", "Bearer " + encodedToken)
        .send();        
      expect(response.statusCode).toBe(200);
      expect(response.body.length).toBe(1);
      const location = response.body[0];
      expect(location._id).toBe(testLocation.id);
      done();
    } catch (e) {
      done(e);
    }
  });

  test("update location", async done => {
    try {      
      const name = 'New Name';
      testLocation.name = name;
      const encodedToken = token(); 
      const response = await request(app)
        .put(`/api/manage/locations/${testLocation._id.toString()}`)
        .set("Authorization", "Bearer " + encodedToken)
        .send(testLocation);        
      expect(response.statusCode).toBe(200);
      expect(response.body.name).toBe(name);
      done();
    } catch (e) {
      done(e);
    }
  });
});
