// test registration controller
import {Mockgoose} from 'mockgoose-fix';
import mongoose from 'mongoose';
import User from '../../../models/user';
import Image from '../../../models/image';
import License from '../../../models/license';

const mockgoose = new Mockgoose(mongoose);


const app = require("../../../app");
const request = require("supertest");

describe("Register controller", () => {
  beforeAll(async () => {
    await mongoose.connect('mongodb://localhost/test');
  })

  afterEach((done) => {
    User.remove({})
      .then(() => done())
			.catch(err => done(err))
    Image.remove({})
      .then(() => done())
      .catch(err => done(err))
    License.remove({})
      .then(() => done())
			.catch(err => done(err))
  });

  afterAll(async (done) => {
    await mongoose.disconnect();
    done();
  });

  test("it should return BadRequest if only has email", done => {
    request(app)
      .post("/api/account/register")
      .send({
        email: "foo@bar.com",
      })
      .then(response => {
        expect(response.statusCode).toBe(400);
        done();
      });
  });
  
  test("it should return bad request if no license number", done => {
    request(app)
      .post("/api/account/register")
      .send({
        email: "foo@bar.com",
        mobile: "0422222222",
        password: "password",
      })
      .then(response => {
        expect(response.statusCode).toBe(400);
        done();
      });
  });

  test("it should return OK if email, mobile, license and password fields exist", done => {
    request(app)
      .post("/api/account/register")
      .send({
        email: "foo@bar.com",
        mobile: "0422222222",
        license: "7716000",
        password: "password",
      })
      .then(response => {
        expect(response.statusCode).toBe(200);
        const body = response.body;
        expect(Object.keys(body)).toContain('token');
        done();
      });
  });
});
