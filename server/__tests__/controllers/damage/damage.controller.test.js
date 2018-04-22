import {Mockgoose} from 'mockgoose-fix';
import moment from 'moment';
import mongoose from 'mongoose';

import Car from '../../../models/car';
import VehicleType from '../../../models/vehicleType';
import Movement from '../../../models/movement';
import Coordinate from '../../../models/coordinate';
import Location from '../../../models/location';
import Booking from '../../../models/booking';
import User from '../../../models/user';

const mockgoose = new Mockgoose(mongoose);
const app = require("../../../app");
const request = require("supertest");


describe("Damage controller", () => {
	let booking1;
	let car1;
	let user;

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
		car1.disabled = false;

		var coordinate = new Coordinate();
		coordinate.latitude = "-37.669012";
		coordinate.longitude = "144.841027";

		var location = new Location();
		location.name = "Melbourne Airport";
		location.coordinates = coordinate;
		location.disabled = false;
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
		booking1.startsAt = new Date(moment().startOf('week').add(5, 'h').format());
		booking1.endsAt = new Date(moment().startOf('week').add(7, 'h').format());
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
			[Car, Location, Movement, Coordinate, VehicleType, User, Booking].map(k => k.remove({}))
		).then(() => done())
		.catch(err => done(err))
	});

	afterAll(async () => {
		await mongoose.disconnect();
	});


	test("Add damage", async () => {
		const response = await request(app).post(`/api/damage/${booking1._id}/createDamage`).send({description: "Scratch"});
		const body = response.body;
		console.log(response.text);
		expect(response.statusCode).toBe(200);
	})

	test("Display damage", async () => {
		const response = await request(app).get(`/api/damage/${booking1._id}/showDamage`);
		const body = response.body;
		expect(response.statusCode).toBe(200);
	})
})