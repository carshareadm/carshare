// test Booking controller
import { Mockgoose } from "mockgoose-fix";
import mongoose from "mongoose";
import Booking from "../../../models/booking";
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
let testBooking = null;

describe("Manage Bookings", () => {
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

    const booking = new Booking();
    booking.unlockCode = '123';
    booking.startsAt = moment();
    booking.endsAt = moment().add(1, 'd');
    booking.isDisabled = false;

    try {      
      const savedUser = await user.save().catch(err => {console.log(err)});

      const savedCoordinate = await coordinate.save().catch(err => {console.log(err)});
      const savedCarType = await typeSmall.save().catch(err => {console.log(err)});
      location.coordinates = savedCoordinate;
      const savedLocation = await location.save().catch(err => {console.log(err)});

      const savedCar = await car.save().catch(err => {console.log(err)});

      booking.car = savedUser;
      booking.user = savedCar;

      const savedBooking = await booking.save().catch(err => {console.log(err)});

      testBooking = savedBooking;
      testCar = savedCar;
      testUser = savedUser;
      done();
    } catch (e) {
      done(e);
    }
  });

  afterEach(done => {
    Promise.all([User, Location, Coordinate, VehicleType, Car, Booking].map(k => k.remove({})))
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
      isAdmin: true,
      exp: DateUtils.getDateInSeconds(
        DateUtils.addHours(new Date(), config.jwt.lifetimeInHours)
      ),
    };
    return jwt.encode(token, config.jwt.secret);
  };

  test("get bookings", async done => {
    try {      
      const encodedToken = token(); 
      const response = await request(app)
        .get("/api/manage/bookings")
        .set("Authorization", "Bearer " + encodedToken)
        .send();        
      expect(response.statusCode).toBe(200);
      expect(response.body.length).toBe(1);
      const booking = response.body[0];
      expect(booking._id).toBe(testBooking.id);
      done();
    } catch (e) {
      done(e);
    }
  });

  test("update booking", async done => {
    try {      
      testBooking.isDisabled = true;
      testBooking.car = await testCar.save();
      const encodedToken = token(); 
      const response = await request(app)
        .put(`/api/manage/bookings/${testBooking._id.toString()}`)
        .set("Authorization", "Bearer " + encodedToken)
        .send(testBooking);        
      expect(response.statusCode).toBe(200);
      expect(response.body.isDisabled).toBe(true);
      done();
    } catch (e) {
      done(e);
    }
  });
});