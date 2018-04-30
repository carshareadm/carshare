// test Booking controller
import { Mockgoose } from "mockgoose-fix";
import mongoose from "mongoose";
import User from "../../../models/user";
import Car from "../../../models/car";
import VehicleType from "../../../models/vehicleType";
import Coordinate from "../../../models/coordinate";
import Location from "../../../models/location";
import Booking from '../../../models/booking';
import Damage from '../../../models/damage';

import moment from "moment";
const config = require("../../../config");
const DateUtils = require("../../../util/date.helper");
const jwt = require("jwt-simple");

const mockgoose = new Mockgoose(mongoose);

const app = require("../../../app");
const request = require("supertest");

let testUser = null;
let testCar = null;
let testDamage = null;

describe("Manage Damages", () => {
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

    const booking1 = new Booking();
	booking1.unlockCode = "ABSDE";
	booking1.startsAt = new Date(moment().startOf('week').add(5, 'h').format());
	booking1.endsAt = new Date(moment().startOf('week').add(7, 'h').format());
	booking1.car = car;
	booking1.user = user;

	const damage = new Damage();
	damage.description = "Some description";
  	damage.booking = booking1;
  	damage.car = car;

    try {      
      const savedUser = await user.save().catch(err => {console.log(err)});

      const savedCoordinate = await coordinate.save().catch(err => {console.log(err)});
      const savedCarType = await typeSmall.save().catch(err => {console.log(err)});
      location.coordinates = savedCoordinate;
      const savedLocation = await location.save().catch(err => {console.log(err)});

      const savedCar = await car.save().catch(err => {console.log(err)});

      const savedBooking = await booking1.save().catch(err => {console.log(err)});

      const savedDamage = await damage.save().catch(err => {console.log(err)});

      testCar = savedCar;
      testUser = savedUser;
      testDamage = savedDamage;
      done();
    } catch (e) {
      done(e);
    }
  });

  afterEach(done => {
    Promise.all([User, Location, Coordinate, VehicleType, Car, Booking, Damage].map(k => k.remove({})))
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

  test("get damages", async done => {
    try {      
      const encodedToken = token(); 
      const response = await request(app)
        .get("/api/manage/damages")
        .set("Authorization", "Bearer " + encodedToken)
        .send(); 
       console.log(response.text);       
      expect(response.statusCode).toBe(200);
      //const car = response.body[0];
      //expect(car._id).toBe(testCar.id);
      done();
    } catch (e) {
      done(e);
    }
  });

  test("get damages for car", async done =>{
  	try {
  		const otherDamage = new Damage({
  			description: "boom",
  			booking: mongoose.Types.ObjectId("00043de80d0fc97688ff1999"),
  			car: mongoose.Types.ObjectId("00043de80d0fc97688ff1000")
  		})
  		await otherDamage.save()

  		const encodedToken = token(); 
  		const response = await request(app)
        .get("/api/manage/damages?carId="+testCar._id)
        .set("Authorization", "Bearer " + encodedToken)
        .send(); 
      expect(response.statusCode).toBe(200);
      expect(response.body.length).toEqual(1);
  		done();
  	} catch (e){
  		done(e);
  	}
  });

  test("disable damage", async done =>{
  	try {
  		const encodedToken = token(); 
  		const response = await request(app)
        .put("/api/manage/damages/"+testDamage._id)
        .set("Authorization", "Bearer " + encodedToken)
        .send(); 
      expect(response.statusCode).toBe(200);
      const updDamage = await Damage.findOne({_id:testDamage._id})
      expect(updDamage.isDisabled).toBe(true);
  		done();
  	} catch (e){
  		done(e);
  	}
  });

});
