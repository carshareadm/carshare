import mongoose from 'mongoose';
import mockgoose from 'mockgoose';
import request from 'supertest';
import * as reallyNeed from 'really-need';

module.exports = {
  connectDB: function (t, done) {
    mockgoose(mongoose).then(() => {
      mongoose.createConnection('mongodb://localhost:27017/carshare-test', err => {
        if (err) t.fail('Unable to connect to test database');
        done();
      });
    })
  },
  dropDB: function(t) {
    mockgoose.reset(err => {
      if (err) t.fail('Unable to reset test database');
    });
  },
  request: request,
  require: reallyNeed,
};

