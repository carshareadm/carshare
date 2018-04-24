// test registration controller
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

describe("Car controller", () => {
	let car1;
	let vehicleType;

	beforeAll(async () => {
		await mongoose.connect('mongodb://localhost/test', { useMongoClient: true });
	})

	beforeEach(async done => {
		try {
			car1 = new Car();
			car1.rego = 'AAA111';
			car1.make = "AudiA"
			car1.model = "TT";
			car1.colour = "white";
			car1.year = "2018";
			car1.seats = "4";
			car1.doors = "2";
			car1.isDisabled = false;
	
			var coordinate = new Coordinate();
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
	
			vehicleType = new VehicleType();
			vehicleType.name = "small"
			vehicleType.hourlyRate = 7;
			car1.vehicleType = vehicleType;

			let s = await coordinate.save();
			s = await location.save();
			s = await vehicleType.save();
			s = await car1.save();

			done();
		} catch(e) {
			done(e);
		}
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

	describe("Disabled path", () => {
		test("Request all cars, disabled car", async () => {
			car1.isDisabled = true;
			car1 = await car1.save();
			const response = await request(app).get("/api/cars")
			expect(response.statusCode).toBe(200);
			expect(response.body.length).toBe(0);
		})

		test("Request all cars, disabled location", async () => {
			car1.location.isDisabled = true;
			const loc = await car1.location.save();
			car1.location = loc;
			car1 = await car1.save();
			const response = await request(app).get("/api/cars")
			expect(response.statusCode).toBe(200);
			expect(response.body.length).toBe(0);
		})
	});

	describe("Enabled path", () => {
		test("Request all cars", async () => {
			const response = await request(app).get("/api/cars")
			expect(response.statusCode).toBe(200);
			expect(response.body.length).toBe(1);
		})
	
		test("Request one car", async () => {
			const response = await request(app).get(`/api/cars/${car1._id}`);
			expect(response.statusCode).toBe(200);
			const body = response.body;
			//expect(body).toBe();
		})
	
		test("Get cars based on type", async () => {
			const response = await request(app).get(`/api/cars/types/${vehicleType.name}`);
			expect(response.statusCode).toBe(200);
			const body = response.body; 
			const obj = {
				rego:'AAA111',
				make: "AudiA",
				model: "TT",
			}
			expect(body[0]).toMatchObject(obj);
		})
	
		test("Check car availability", async () => {
				const user = new User();
				user.email = "adm@gmail.com";
				user.mobile = "0411111111";
				user.password = "12345";
	
				await user.save();
	
				// Mid day booking in one day
			const booking1 = new Booking();
			booking1.unlockCode = "ABSDE";
				booking1.startsAt = new Date(moment().startOf('week').add(5, 'h').format());
				booking1.endsAt = new Date(moment().startOf('week').add(7, 'h').format());
				booking1.car = car1;
				booking1.user = user;
	
				await booking1.save();
	
				// Booking overlapping the start of the week, should only return what's in current week
				const booking2 = new Booking();
			booking2.unlockCode = "EDSBA";
				booking2.startsAt = new Date(moment().startOf('week').subtract(2,'h').format());
				booking2.endsAt = new Date(moment().startOf('week').add(1,'h').format());
				booking2.car = car1;
				booking2.user = user;
	
				await booking2.save();
	
				// Booking overlapping the end of the week
				const booking3 = new Booking();
			booking3.unlockCode = "EABSD";
				booking3.startsAt = new Date(moment().startOf('week').add(1, 'w').subtract(2,'h').format());
				booking3.endsAt = new Date(moment().startOf('week').add(1, 'w').add(1,'h').format());
				booking3.car = car1;
				booking3.user = user;
	
				await booking3.save();
	
			const response = await request(app)
				.get(`/api/cars/${car1._id}/times?start=${encodeURIComponent(moment().startOf('week').format())}&end=${encodeURIComponent(moment().endOf('week').format())}`);
			const body = response.body;
			expect(body).toEqual(
				[
					{ hour: '05:00', weekday: 'Sun' },
					{ hour: '06:00', weekday: 'Sun' },
					{ hour: '07:00', weekday: 'Sun' },
					{ hour: '00:00', weekday: 'Sun' },
					{ hour: '01:00', weekday: 'Sun' },
					{ hour: '22:00', weekday: 'Sat' },
					{ hour: '23:00', weekday: 'Sat' },
				]
			);
			expect(response.statusCode).toBe(200);
		})
	});
	
})