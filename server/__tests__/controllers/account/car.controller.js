// test registration controller
import {Mockgoose} from 'mockgoose-fix';
import mongoose from 'mongoose';
import Car from '../../../models/car';
import VehicleType from '../../../models/vehicleType';
import Movement from '../../../models/movement';
import Coordinate from '../../../models/coordinate';
import Location from '../../../models/location';


const mockgoose = new Mockgoose(mongoose);


const app = require("../../../app");
const request = require("supertest");

describe("Car controller", () => {
	let car1;

	beforeAll(async () => {
		await mongoose.connect('mongodb://localhost/test');
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

		var coordinate = new Coordinate();
		coordinate.latitude = "-37.669012";
		coordinate.longitude = "144.841027";

		var location = new Location();
		location.name = "Melbourne Airport";
		location.coordinates = coordinate;
		car1.location = location;
		
		var movements = new Movement();
		movements.car = car1;
		movements.coordinates = location.coordinates;

		var vehicleType = new VehicleType();
		vehicleType.name = "Small"
		vehicleType.hourlyRate = 7;
		car1.vehicleType = vehicleType;

		coordinate.save()
			.then(() => location.save())
			.then(() => vehicleType.save())
			.then(() => movements.save())
			.then(() => car1.save())
			.then(() => done())
			.catch(err => done(err))
	})


	afterEach((done) => {
		Promise.all(
			[Car, Location, Movement, Coordinate, VehicleType].map(k => k.remove({}))
		).then(() => done())
		.catch(err => done(err))
	});

	afterAll(async () => {
		await mongoose.disconnect();
	});

	test("Request all cars", done => {
		request(app)
		.get("/api/cars")
		.then(response => {
			expect(response.statusCode).toBe(200);
			const body = response.body;
			console.log(body);
			done();
		})
	})

	test("Check car availability", done => {
		request(app)
		.get(`/api/cars/${car1._id}/times`)
		.then(response => {
			expect(response.statusCode).toBe(200);
			const body = response.body;
			done();
		})
	})
})