/**
 * Project       - ShaCar
 * Team          - Group 3 Carshare
 * Last Modified - 2018/05/26
 * Authors
 *               - Paul Crow
 *               - Inga Pflaumer
 *               - Tianqi Chen
 */
import { Mockgoose } from "mockgoose-fix";
import mongoose from "mongoose";
import moment from 'moment';

import User from "../../../models/user";
import License from "../../../models/license";
import Address from "../../../models/address";
import Car from '../../../models/car';
import VehicleType from '../../../models/vehicleType';
import Movement from '../../../models/movement';
import Coordinate from '../../../models/coordinate';
import Location from '../../../models/location';
import Booking from '../../../models/booking';
import Damage from '../../../models/damage';

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
    await mongoose.connect("mongodb://localhost/test", {
      useMongoClient: true,
    });
  });

  beforeEach(async done => {
    const license = new License();
    license.licenseNumber = "12345";

    const address = new Address();
    address.street1 = "1 Foo St";
    address.suburb = "Bar";
    address.state = "WA";
    address.postCode = "6000";

    const user = new User();
    user.email = "profileUser@gmail.com";
    user.mobile = "0411111111";
    user.password = "12345";

    try {
      const savedLicense = await license.save();
      const savedAddress = await address.save();
      user.license = savedLicense;
      user.address = savedAddress;
      const savedUser = await user.save();

      testLicense = savedLicense;
      testAddress = savedAddress;
      testUser = savedUser;
      done();
    } catch (e) {
      done(e);
    }
  });

  afterEach(done => {
    Promise.all([User, License, Address, Car, VehicleType, Movement, Coordinate, Location, Booking, Damage].map(k => k.remove({})))
      .then(() => done())
      .catch(e => done(e));
  });

  afterAll(async done => {
    await mongoose.disconnect();
    done();
  });

  test("it should return 400 if no request body", done => {
    const jwt = getToken();
    request(app)
      .post("/api/profile")
      .set("Authorization", "Bearer " + jwt)
      .send()
      .then(response => {
        expect(response.statusCode).toBe(400);
        expect(response.text).toBe("No request body");
        done();
      });
  });

  test("it should return 400 if email and mobile present", done => {
    const jwt = getToken();
    request(app)
      .post("/api/profile")
      .set("Authorization", "Bearer " + jwt)
      .send({
        user: testUser._id,
        email: "userfoo@foo.com",
        mobile: "0422222222",
      })
      .then(response => {
        expect(response.statusCode).toBe(400);
        expect(response.text).toBe("Nothing updated");
        done();
      });
  });

  // Test for password and mobile update
  test("it should return 400 for password & mobile update", done => {
    const jwt = getToken();
    request(app)
      .post("/api/profile")
      .set("Authorization", "Bearer " + jwt)
      .send({
        user: testUser._id,
        password: "123456Qw",
        mobile: "0422222222",
      })
      .then(response => {
        expect(response.statusCode).toBe(400);
        done();
      });
  });

  // Test for password and email update
  test("it should return 400 for password & email update", done => {
    const jwt = getToken();
    request(app)
      .post("/api/profile")
      .set("Authorization", "Bearer " + jwt)
      .send({
        user: testUser._id,
        password: "123456Qw",
        email: "userfoo@foo.com",
      })
      .then(response => {
        expect(response.statusCode).toBe(400);
        done();
      });
  });

  // Test for email only
  test("it should return 200 if only email", done => {
    const jwt = getToken();
    request(app)
      .post("/api/profile")
      .set("Authorization", "Bearer " + jwt)
      .send({ user: testUser._id, email: "userfoo@foo.com" })
      .then(response => {
        expect(response.statusCode).toBe(200);
        done();
      });
  });

  // Test for mobile only
  test("it should return 200 if only mobile", done => {
    const jwt = getToken();
    request(app)
      .post("/api/profile")
      .set("Authorization", "Bearer " + jwt)
      .send({ user: testUser._id, mobile: "0422222222" })
      .then(response => {
        expect(response.statusCode).toBe(200);
        done();
      });
  });

  // Test for password only
  test("it should return 200 if only password", done => {
    const jwt = getToken();
    request(app)
      .post("/api/profile")
      .set("Authorization", "Bearer " + jwt)
      .send({ user: testUser._id, password: "123456Qw" })
      .then(response => {
        expect(response.statusCode).toBe(200);
        done();
      });
  });

  // Test for street1 only
  test("it should return 200 if only street1", done => {
    const jwt = getToken();
    request(app)
      .post("/api/profile")
      .set("Authorization", "Bearer " + jwt)
      .send({ user: testUser._id, street1: "1 Foo St" })
      .then(response => {
        expect(response.statusCode).toBe(200);
        done();
      });
  });

  // Test for street2 only
  test("it should return 200 if only street2", done => {
    const jwt = getToken();
    request(app)
      .post("/api/profile")
      .set("Authorization", "Bearer " + jwt)
      .send({ user: testUser._id, street2: "1 Foo St" })
      .then(response => {
        expect(response.statusCode).toBe(200);
        done();
      });
  });

  // Test for suburb only
  test("it should return 200 if only surburb", done => {
    const jwt = getToken();
    request(app)
      .post("/api/profile")
      .set("Authorization", "Bearer " + jwt)
      .send({ user: testUser._id, suburb: "Bar" })
      .then(response => {
        expect(response.statusCode).toBe(200);
        done();
      });
  });

  // Test for state only
  test("it should return 200 if only state", done => {
    const jwt = getToken();
    request(app)
      .post("/api/profile")
      .set("Authorization", "Bearer " + jwt)
      .send({ user: testUser._id, state: "WA" })
      .then(response => {
        expect(response.statusCode).toBe(200);
        done();
      });
  });

  // Test for postCode only
  test("it should return 200 if only postCode", done => {
    const jwt = getToken();
    request(app)
      .post("/api/profile")
      .set("Authorization", "Bearer " + jwt)
      .send({ user: testUser._id, postCode: "6000" })
      .then(response => {
        expect(response.statusCode).toBe(200);
        done();
      });
  });

  // Test for full address update
  test("it should return 200 for full address update", done => {
    const jwt = getToken();
    request(app)
      .post("/api/profile")
      .set("Authorization", "Bearer " + jwt)
      .send({
        user: testUser._id,
        street1: "1 Foo St",
        suburb: "Bar",
        state: "WA",
        postCode: "6000",
      })
      .then(response => {
        expect(response.statusCode).toBe(200);
        done();
      });
  });

  // Test for full address & password update
  test("it should return 200 for full address & password update", done => {
    const jwt = getToken();
    request(app)
      .post("/api/profile")
      .set("Authorization", "Bearer " + jwt)
      .send({
        user: testUser._id,
        password: "123456Qw",
        street1: "1 Foo St",
        suburb: "Bar",
        state: "WA",
        postCode: "6000",
      })
      .then(response => {
        expect(response.statusCode).toBe(200);
        done();
      });
  });

  // Test for full address & mobile update
  test("it should return 200 for full address & password update", done => {
    const jwt = getToken();
    request(app)
      .post("/api/profile")
      .set("Authorization", "Bearer " + jwt)
      .send({
        user: testUser._id,
        mobile: "0422222222",
        street1: "1 Foo St",
        suburb: "Bar",
        state: "WA",
        postCode: "6000",
      })
      .then(response => {
        expect(response.statusCode).toBe(200);
        done();
      });
  });

  // Test for full address & email update
  test("it should return 200 for full address & email update", done => {
    const jwt = getToken();
    request(app)
      .post("/api/profile")
      .set("Authorization", "Bearer " + jwt)
      .send({
        user: testUser._id,
        email: "userfoo@foo.com",
        street1: "1 Foo St",
        suburb: "Bar",
        state: "WA",
        postCode: "6000",
      })
      .then(response => {
        expect(response.statusCode).toBe(200);
        done();
      });
  });

  // Test for partial address with no existing address
  test("it should return fail for partial address when no existing address", async (done) => {
    const user = new User();
    user.email = "profileUser2@gmail.com";
    user.mobile = "0411111111";
    user.password = "12345";
    testUser = await user.save();

    const jwt = getToken();
    request(app)
      .post("/api/profile")
      .set("Authorization", "Bearer " + jwt)
      .send({
        user: testUser._id,
        street1: "1 Foo St",
      })
      .then(response => {
        expect(response.statusCode).toBe(500);
        done();
      });
  });

  // Test for history bookings
  test("Should display user's bookings", async (done) => {
    var coordinate = new Coordinate();
    coordinate.latitude = "-37.669012";
    coordinate.longitude = "144.841027";
    await coordinate.save();

    var vehicleType = new VehicleType();
    vehicleType.name = "small"
    vehicleType.hourlyRate = 7;
    await vehicleType.save();

    var location = new Location();
    location.name = "Melbourne Airport";
    location.coordinates = coordinate;
    location.isDisabled = false;
    await location.save();

    var car1 = new Car();
    car1.rego = 'AAA111';
    car1.make = "AudiA"
    car1.model = "TT";
    car1.colour = "white";
    car1.year = "2018";
    car1.seats = "4";
    car1.doors = "2";
    car1.isDisabled = false;
    car1.vehicleType = vehicleType;
    car1.location = location;
    await car1.save();

    var movements = new Movement();
    movements.car = car1;
    movements.coordinates = location.coordinates;
    await movements.save();

    var booking1 = new Booking();
    booking1.unlockCode = "ABSDE";
    booking1.startsAt = new Date(moment().startOf('week').add(5, 'h').format());
    booking1.endsAt = new Date(moment().startOf('week').add(7, 'h').format());
    booking1.car = car1;
    booking1.user = testUser;
    await booking1.save();

    var damage1 = new Damage();
    damage1.description = "Front scratch";
    damage1.loggedAt = new Date(moment().format());
    damage1.booking = booking1;
    damage1.car = car1;
    await damage1.save();

    const jwt = getToken();
    const response = await request(app).get("/api/profile/bookings").set("Authorization", "Bearer " + jwt);
    const body = response.body;
    expect(response.statusCode).toBe(200);
    done();
  })

  test("success", async done => {
    const jwt = getToken();
    const response = await request(app)
      .delete("/api/profile/delete")
      .set("Authorization", "Bearer " + jwt)
      .send();      
      expect(response.statusCode).toBe(200);
      expect(response.body.email).toContain("self_deleted");
      done();
      
  });
});
