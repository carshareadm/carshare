// test Booking controller
import { Mockgoose } from "mockgoose-fix";
import mongoose from "mongoose";
import User from "../../../models/user";
import License from "../../../models/license";
import Address from "../../../models/address";
import Offer from "../../../models/offer";
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
let testOffer = null; 
let testBooking = null; 

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
    user.isAccountConfirmed =true;

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
    car.movements = new Movement();
    car.movements.car = car;

    const discount = new Offer();
    discount.offerCode = "1234";
    discount.expiresAt = DateUtils.addHours(new Date(), 1);
    discount.isDisabled = false;
    discount.oneOffValue = 10;

    try {
      const savedAddress = await address.save().catch(err => {console.log(err)});
      user.address = savedAddress;
      const savedUser = await user.save().catch(err => {console.log(err)});

      const savedCoordinate = await coordinate.save().catch(err => {console.log(err)});
      const savedCarType = await typeSmall.save().catch(err => {console.log(err)});
      location.coordinates = savedCoordinate;
      const savedLocation = await location.save().catch(err => {console.log(err)});

      const savedCar = await car.save().catch(err => {console.log(err)});

      //Movement Block
      const movements = new Movement();
      movements.car = savedCar;
      movements.coordinates = location.coordinates;

      const savedMovements = await movements.save().catch(err => {console.log(err)});

      savedCar.movements = savedMovements;

      const savedOffer = await discount.save().catch(err => {console.log(err)});

      testCar = savedCar;

      testAddress = savedAddress;
      testUser = savedUser;
      testOffer = savedOffer;

      done();
    } catch (e) {
      done(e);
    }
  });

  afterEach(done => {
    Promise.all([User, License, Address, Location, Coordinate, VehicleType, Movement, Car, Offer, Booking].map(k => k.remove({})))
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
    l.isDisabled = disabled;
    l.approvedByAdmin = approved;
    return l;
  };

  // Booking creation test block

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
      .post("/api/booking/")
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
      .post("/api/booking/")
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

  test("it should return 400 all fields are present but booking is in the middle", async done => {
    const workingLicense = setLicense("12345", "5ac8c98c09eeea0911468934", false, true);
    try {
      license = await workingLicense.save();
      testUser.license = await workingLicense.save();
      const testBooking = new Booking();
      testBooking.car = testCar._id;
      testBooking.startsAt = moment().add(1, 'hour');
      testBooking.endsAt = moment().add(3, 'hour');
      testBooking.user = testUser._id;
      testBooking.unlockCode = "123456";
      testBooking.isDisabled = false;
      await testBooking.save();
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
        expect(response.statusCode).toBe(400);
        done();
      });
    } catch (e) {
      done(e);
    }
  });

  test("it should return 400 all fields are present but booking exist", async done => {
    const workingLicense = setLicense("12345", "5ac8c98c09eeea0911468934", false, true);
    try {
      license = await workingLicense.save();
      testUser.license = await workingLicense.save();
      const testBooking = new Booking();
      testBooking.car = testCar._id;
      testBooking.startsAt = moment();
      testBooking.endsAt = moment().add(1, 'day');
      testBooking.user = testUser._id;
      testBooking.unlockCode = "123456";
      testBooking.isDisabled = false;
      await testBooking.save();
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
        expect(response.statusCode).toBe(400);
        done();
      });
    } catch (e) {
      done(e);
    }
  });

  test("it should return 200 all fields are present", async done => {
    const workingLicense = setLicense("12345", "5ac8c98c09eeea0911468934", false, true);
    try {
      license = await workingLicense.save();
      testUser.license = await workingLicense.save();
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
        const body = response.body;
        expect(Object.keys(body)).toContain('totalCost');
        done();
      });
    } catch (e) {
      done(e);
    }
  });

  test("it should return 200 if offer is sent but invalid", async done => {
    const workingLicense = setLicense("12345", "5ac8c98c09eeea0911468934", false, true);
    try {
      license = await workingLicense.save();
      testUser.license = await workingLicense.save();
      const user = await testUser.save();
      const savedOffer = await testOffer.save().catch(err => {console.log(err)});
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
        code: "test",
      })
      .then(response => {
        // Booking is still created without discount
        expect(response.statusCode).toBe(200);
        done();
      });
    } catch (e) {
      done(e);
    }
  });

  test("it should return 200 if offer is sent and valid", async done => {
    const workingLicense = setLicense("12345", "5ac8c98c09eeea0911468934", false, true);
    try {
      license = await workingLicense.save();
      testUser.license = await workingLicense.save();
      const user = await testUser.save();
      const savedOffer = await testOffer.save().catch(err => {console.log(err)});
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
        code: savedOffer.offerCode,
      })
      .then(response => {
        expect(response.statusCode).toBe(200);
        //24 (hours) * 7 (hourly rate) - 10 (discount)
        expect(response.body.totalCost).toBe(158);
        done();
      });
    } catch (e) {
      done(e);
    }
  });

  test("it should return 200 if time is available for extension", async done => {
    const workingLicense = setLicense("12345", "5ac8c98c09eeea0911468934", false, true);
    try {
      license = await workingLicense.save();
      testUser.license = await workingLicense.save();
      const newEnd = moment().add(2, 'd');
      const user = await testUser.save();
      const savedOffer = await testOffer.save().catch(err => {console.log(err)});
      testBooking = new Booking();
      testBooking.user = testUser._id;
      testBooking.car = testCar._id;
      testBooking.startsAt = moment();
      testBooking.endsAt = moment().add(1, 'day');
      testBooking.offerCode = savedOffer.offerCode;
      testBooking.isDisabled=false;
      testBooking.unlockCode = "123456";
      const savedBooking = await testBooking.save().catch(err => {console.log(err)});
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
      .put("/api/booking/extend")
      .set("Authorization", "Bearer " + encodedToken)
      .send({
        bookid: testBooking._id,
        endAt: newEnd,
        startAt: testBooking.startsAt,
      })
      .then(response => {
        expect(response.statusCode).toBe(200);
        expect(moment(response.body.endsAt).format("YYYY/MM/DD HH:mm")).toBe(moment(newEnd).format("YYYY/MM/DD HH:mm"));
        done();
      });
    } catch (e) {
      done(e);
    }
  });

});
