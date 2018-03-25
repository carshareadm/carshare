//server.js
const app = require("./app");

const dummyData = require("./dummyData");
import serverConfig from "./config";

import mongoose from "mongoose";

// Set native promises as mongoose promise
mongoose.Promise = global.Promise;

// MongoDB Connection
const options = {
  useMongoClient: true,
  reconnectTries: Number.MAX_VALUE, // Never stop trying to reconnect
  reconnectInterval: 500, // Reconnect every 500ms
  poolSize: 10, // Maintain up to 10 socket connections
  // If not connected, return errors immediately rather than waiting for reconnect
  bufferMaxEntries: 0,
};

mongoose.connect(serverConfig.mongoURL, options, error => {
  if (error) {
    console.error("Please make sure Mongodb is installed and running!"); // eslint-disable-line no-console
    throw error;
  }

  // feed some dummy data in DB.
  dummyData();

  // start app
  app.listen(serverConfig.port, error => {
    if (!error) {
      console.log(`ShaCar is running on port: ${serverConfig.port}!`); 
    }
  });
});

module.exports = app;
