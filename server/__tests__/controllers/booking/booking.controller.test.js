// test Booking controller
import { Mockgoose } from "mockgoose-fix";
import mongoose from "mongoose";
import User from "../../../models/user";
import License from "../../../models/license";
import Address from "../../../models/address";
import Booking from "../../../models/booking";
import Car from "../../../models/car";
import VehicleType from "../../../models/vehicleType";
import Coordinate from "../../../models/coordinate";
import Movement from "../../../models/movement";

import moment from "moment";
import Location from "../../../models/location";
const config = require("../../../config");
const DateUtils = require("../../../util/date.helper");
const jwt = require("jwt-simple");

const mockgoose = new Mockgoose(mongoose);

const app = require("../../../app");
const request = require("supertest");

let testUser = null;
let testAddress = null;
let testCar = null;
let license = null;

describe("Booking controller", () => {
  beforeAll(async () => {
    await mongoose.connect("mongodb://localhost/test", {
      useMongoClient: true,
    });
  });

  beforeEach(async done => {
  
    const address = new Address();
    address.street1 = "1 Foo St";
    address.suburb = "Bar";
    address.state = "WA";
    address.postCode = "6000";

    const user = new User();
    user.email = "bookingUser@gmail.com";
    user.mobile = "0499999999";
    user.password = "98765";

    const location = new Location();

    const coordinate = new Coordinate();
    coordinate.latitude = "-33.947346";
    coordinate.longitude = "151.179428";

    location.name = "Sydney Airport";
    location.disabled = false;

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
    car.disabled = false;
    car.location = location;
    car.movements = new Movement();
    car.movements.car = car;

    try {
      const savedAddress = await address.save();
      user.address = savedAddress;
      const savedUser = await user.save();

      const savedCoordinate = await coordinate.save();
      const savedCarType = await typeSmall.save();
      location.coordinates = savedCoordinate;
      const savedLocation = await location.save();

      const savedCar = await car.save();

      //Movement Block
      const movements = new Movement();
      movements.car = savedCar;
      movements.coordinates = location.coordinates;

      const savedMovements = await movements.save();

      savedCar.movements = savedMovements;

      testCar = savedCar;

      testAddress = savedAddress;
      testUser = savedUser;
      done();
    } catch (e) {
      done(e);
    }
  });

  afterEach(done => {
    Promise.all([User, License, Address, Location, Coordinate, VehicleType, Movement, Car].map(k => k.remove({})))
      .then(() => done())
      .catch(e => done(e));
  });

  afterAll(async done => {
    await mongoose.disconnect();
    done();
  });

  const setLicense = (number, image, disabled, approved) => {
    const l = new License();
    l.licenseNumber = number;
    l.image = image;
    l.disabled = disabled;
    l.approvedByAdmin = approved;
    return l;
  };

  test("it should return 401 if no request body", async done => {
    const badLicense = setLicense("12345", null, false, true);
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
      .post("/api/booking")
      .set("Authorization", "Bearer " + encodedToken)
      .send()
      .then(response => {
        expect(response.statusCode).toBe(401);
        done();
      });
    } catch (e) {
      done(e);
    }
  });

  test("it should return 400 if only user and carid present", async done => {
    const badLicense = setLicense("12345", "5ac8c98c09eeea0911468934", false, true);
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
      .post("/api/booking")
      .set("Authorization", "Bearer " + encodedToken)
      .send({
        userid: testUser._id,
        car: testCar._id,
      })
      .then(response => {
        expect(response.statusCode).toBe(400);
        done();
      });
    } catch (e) {
      done(e);
    }
  });

  test("it should return 200 all fields are present", async done => {
    const badLicense = setLicense("12345", "5ac8c98c09eeea0911468934", false, true);
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
      .post("/api/booking")
      .set("Authorization", "Bearer " + encodedToken)
      .send({
        userid: testUser._id,
        car: testCar._id,
        startAt: moment(),
        endAt: moment().add(1, 'day'),
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
