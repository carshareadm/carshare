/**
 * Project       - ShaCar
 * Team          - Group 3 Carshare
 * Last Modified - 2018/05/26
 * Authors
 *               - Paul Crow
 */
import { Mockgoose } from "mockgoose-fix";
import mongoose from "mongoose";
import User from "../../../models/user";
import Car from "../../../models/car";
import VehicleType from "../../../models/vehicleType";
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
let testCar = null;

describe("Manage Cars", () => {
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

    const typeSmall = new VehicleType();
    typeSmall.name = "small";
    typeSmall.hourlyRate = 7;

    const car = new Car();

    car.rego = "ABC123";
    car.make = "Hyundai";
    car.model = "Getz";
    car.colour = "white";
    car.year = "2017";
    car.seats = "5";
    car.doors = "3";
    car.vehicleType = typeSmall;
    car.isDisabled = false;
    car.location = location;

    try {      
      const savedUser = await user.save().catch(err => {console.log(err)});

      const savedCoordinate = await coordinate.save().catch(err => {console.log(err)});
      const savedCarType = await typeSmall.save().catch(err => {console.log(err)});
      location.coordinates = savedCoordinate;
      const savedLocation = await location.save().catch(err => {console.log(err)});

      const savedCar = await car.save().catch(err => {console.log(err)});

      testCar = savedCar;
      testUser = savedUser;
      done();
    } catch (e) {
      done(e);
    }
  });

  afterEach(done => {
    Promise.all([User, Location, Coordinate, VehicleType, Car].map(k => k.remove({})))
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

  test("get cars", async done => {
    try {      
      const encodedToken = token(); 
      const response = await request(app)
        .get("/api/manage/cars")
        .set("Authorization", "Bearer " + encodedToken)
        .send();        
      expect(response.statusCode).toBe(200);
      expect(response.body.length).toBe(1);
      const car = response.body[0];
      expect(car._id).toBe(testCar.id);
      done();
    } catch (e) {
      done(e);
    }
  });

  test("update car", async done => {
    try {      
      testCar.isDisabled = true;
      const encodedToken = token(); 
      const response = await request(app)
        .put(`/api/manage/cars/${testCar._id.toString()}`)
        .set("Authorization", "Bearer " + encodedToken)
        .send(testCar);        
      expect(response.statusCode).toBe(200);
      expect(response.body.isDisabled).toBe(true);
      done();
    } catch (e) {
      done(e);
    }
  });

  describe('POST Manage Cars', () => {
    test("fail car validation", async done => {
      try {
        const car = {};
        //car.rego = "TEST01";
        //car.make = "Hyundai";
        car.model = "Getz";
        car.colour = "white";
        car.year = "2017";
        car.seats = "5";
        car.doors = "3";
        car.vehicleType = testCar.vehicleType;
        car.isDisabled = false;
        car.location = testCar.location;

        const encodedToken = token(); 
        const response = await request(app)
          .post("/api/manage/cars")
          .set("Authorization", "Bearer " + encodedToken)
          .send(car);
        expect(response.statusCode).toBe(400);
        done();
      } catch (e) {
        done(e);
      }
    });

    test("success", async done => {
      try {
        const car = {};
        car.rego = "TEST01";
        car.make = "Hyundai";
        car.model = "Getz";
        car.colour = "white";
        car.year = "2017";
        car.seats = "5";
        car.doors = "3";
        car.vehicleType = testCar.vehicleType;
        car.isDisabled = false;
        car.location = testCar.location;

        const encodedToken = token(); 
        const response = await request(app)
          .post("/api/manage/cars")
          .set("Authorization", "Bearer " + encodedToken)
          .send(car);        
        expect(response.statusCode).toBe(200);        
        done();
      } catch (e) {
        done(e);
      }
    });
  });
});
