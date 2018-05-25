/**
 * Project       - ShaCar
 * Team          - Group 3 Carshare
 * Last Modified - 2018/05/26
 * Authors
 *               - Inga Pflaumer
 */
import { Mockgoose } from "mockgoose-fix";
import mongoose from "mongoose";
const mockgoose = new Mockgoose(mongoose);
import moment from 'moment';

const User = require('../../../models/user');
import Car from '../../../models/car';
import VehicleType from '../../../models/vehicleType';
import Booking from '../../../models/booking';
import Coordinate from '../../../models/coordinate';
import Location from '../../../models/location';

const jwt = require("jwt-simple");
const DateUtils = require("../../../util/date.helper");
const config = require("../../../config");


const app = require("../../../app");
const request = require("supertest");

let testUser = null;

describe('Profile controller', () => {

  beforeAll(async () => {
    await mongoose.connect("mongodb://localhost/test");
  });

  beforeEach(done => {
    testUser = new User();
    testUser.email = "test@test.com";
    testUser.mobile = "0444444444";
    testUser.password = "pwd";
    testUser.save(function(err){
      if(err) done(err);
      else done();
    });
  });  

  afterEach((done) => {
    Promise.all(
      [Car, VehicleType, User, Booking, Coordinate, Location].map(k => k.remove({}))
    ).then(() => done())
    .catch(err => done(err))
  });

  afterAll(async () => {
    await mongoose.disconnect();
  });

  function encodedToken(){
    let token = {
      sub: testUser._id,
      email: testUser.email,
      isAdmin: false,
      exp: DateUtils.getDateInSeconds(DateUtils.addHours(new Date(), 1)),
    };
    return jwt.encode(token, config.jwt.secret);
  }

  test('Should return my profile', done => {
    request(app)
      .get("/api/profile/my")
      .set('Authorization', 'Bearer ' + encodedToken())
      .then(response => {
        expect(response.statusCode).toBe(200);
        done();
      });
  });

  test('Should return my bookings', async (done) =>{
    var coordinate = new Coordinate();
    coordinate.latitude = "-37.669012";
    coordinate.longitude = "144.841027";
    await coordinate.save();

    var location = new Location();
    location.name = "Melbourne Airport";
    location.coordinates = coordinate;
    await location.save();

    const vehicleType = new VehicleType();
    vehicleType.name = "small"
    vehicleType.hourlyRate = 7;
    await vehicleType.save();

    const car1 = new Car();
    car1.rego = 'AAA111';
    car1.make = "AudiA"
    car1.model = "TT";
    car1.colour = "white";
    car1.year = "2018";
    car1.seats = "4";
    car1.doors = "2";
    car1.vehicleType = vehicleType;
    car1.location = location;
    await car1.save();

    const booking1 = new Booking();
    booking1.unlockCode = "ABSDE";
    booking1.startsAt = new Date(moment().startOf('week').add(5, 'h').format());
    booking1.endsAt = new Date(moment().startOf('week').add(7, 'h').format());
    booking1.car = car1;
    booking1.user = testUser;
    await booking1.save();

    const booking2 = new Booking();
    booking2.unlockCode = "EDSBA";
    booking2.startsAt = new Date(moment().startOf('week').subtract(2,'h').format());
    booking2.endsAt = new Date(moment().startOf('week').add(1,'h').format());
    booking2.car = car1;
    booking2.user = testUser;
    await booking2.save();

    request(app)
      .get("/api/profile/bookings")
      .set('Authorization', 'Bearer ' + encodedToken())
      .then(response => {
        expect(response.statusCode).toBe(200);
        done();
      })
  })
});