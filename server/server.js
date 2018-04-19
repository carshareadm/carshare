//server.js
import 'babel-polyfill';
const app = require("./app");

const dummyData = require("./dummyData");
const logger = require('./util/logger');
import serverConfig from "./config";

import mongoose from "mongoose";

import * as s3Helper from './util/aws.helper';

// Set native promises as mongoose promise
mongoose.Promise = global.Promise;

// MongoDB Connection
const mongoOptions = {
  useMongoClient: true,
  reconnectTries: Number.MAX_VALUE, // Never stop trying to reconnect
  reconnectInterval: 500, // Reconnect every 500ms
  poolSize: 10, // Maintain up to 10 socket connections
  // If not connected, return errors immediately rather than waiting for reconnect
  bufferMaxEntries: 0,
};

logger.info('Starting shacar ' + process.env.NODE_ENV + '...')

if (process.env.NODE_ENV !== 'production') {
  const expressSwagger = require('express-swagger-generator')(app);
  
  let swaggerOptions = {
    swaggerDefinition: {
      info: {
        description: 'ShaCar API',
        title: 'Swagger',
        version: '1.0.0',
      },
      host: 'localhost:8000',
      basePath: '/api',
      produces: [
        "application/json",
        "application/xml",
      ],
      schemes: ['http', 'https'],
    },
    basedir: __dirname, //app absolute path
    files: ['./routes/**/*.js'], // Path to the API handle folder
  };
  logger.info({message: 'setting up swagger with options', options: swaggerOptions});
  expressSwagger(swaggerOptions);

}

logger.info('connecting to mongodb...');
mongoose.connect(serverConfig.mongoURL, mongoOptions, error => {
  if (error) {
    logger.err({message: "Please make sure Mongodb is installed and running!", err: error});
    throw error;
  }
  logger.info('connected to mongodb...');
  // feed some dummy data in DB.
  dummyData();

  // start app
  logger.info('starting express...');
  app.listen(serverConfig.port, error => {
    if (!error) {
      logger.info(`ShaCar is running on port: ${serverConfig.port}!`);
    }
    else {
      logger.err({message: 'express failed to start...', err: error});
    }
  });
});

module.exports = app;
