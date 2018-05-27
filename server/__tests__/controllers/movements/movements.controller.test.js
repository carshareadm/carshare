/**
 * Project       - ShaCar
 * Team          - Group 3 Carshare
 * Last Modified - 2018/05/26
 * Authors
 *               - Inga Pflaumer
 */
import {Mockgoose} from 'mockgoose-fix';
import moment from 'moment';
import mongoose from 'mongoose';

import Car from '../../../models/car';
import Movement from '../../../models/movement';
import Coordinate from '../../../models/coordinate';
import User from "../../../models/user";
import Location from "../../../models/location";
import VehicleType from "../../../models/vehicleType";
import Booking from "../../../models/booking";

const mockgoose = new Mockgoose(mongoose);
const app = require("../../../app");
const request = require("supertest");


describe("Movement controller", () => {
	let car1;
	let booking1;
	let coordinate;
	let user

	beforeAll(async () => {
		await mongoose.connect('mongodb://localhost/test', { useMongoClient: true });
	})

	beforeEach(done => {
		car1 = new Car();
		car1.rego = 'AAA111';
		car1.make = "AudiA"
		car1.model = "TT";
		car1.colour = "white";
		car1.year = "2018";
		car1.seats = "4";
		car1.doors = "2";
		car1.isDisabled = false;

		coordinate = new Coordinate();
		coordinate.latitude = "-37.669012";
		coordinate.longitude = "144.841027";

		var location = new Location();
		location.name = "Melbourne Airport";
		location.coordinates = coordinate;
		location.isDisabled = false;
		car1.location = location;
		
		var movements = new Movement();
		movements.car = car1;
		movements.coordinates = location.coordinates;

		var vehicleType = new VehicleType();
		vehicleType.name = "small"
		vehicleType.hourlyRate = 7;
		car1.vehicleType = vehicleType;

		user = new User();
		user.email = "adm@gmail.com";
		user.mobile = "0411111111";
		user.password = "12345";

		booking1 = new Booking();
		booking1.unlockCode = "ABSDE";
		booking1.startsAt = new Date(moment().subtract(2,"h").format());
		booking1.endsAt = new Date(moment().subtract(5, "m").format());
		booking1.car = car1;
		booking1.user = user;

		coordinate.save()
			.then(() => location.save())
			.then(() => vehicleType.save())
			.then(() => movements.save())
			.then(() => car1.save())
			.then(() => user.save())
			.then(() => booking1.save())
			.then(() => done())
			.catch(err => done(err))
		})

	afterEach((done) => {
		Promise.all(
			[Car, Movement, Coordinate, User, Location, VehicleType, Booking].map(k => k.remove({}))
		).then(() => done())
		.catch(err => done(err))
	});

	afterAll(async () => {
		await mongoose.disconnect();
	});


	test("Add Movement", async () => {
		const response = await request(app).post(`/api/movement/create`).send({
			car: car1._id,
			latitude: coordinate.latitude,
			longitude: coordinate.longitude,
			timestamp: new Date(),
		});
		const body = response.body;
		expect(response.statusCode).toBe(200);
	})
})