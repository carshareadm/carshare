var Logger = require('r7insight_node');
var config = require('../config');
 
const logger = new Logger({
  token: config.insightOps.token,
  region: config.insightOps.region,
});

module.exports = logger;