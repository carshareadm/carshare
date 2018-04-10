const config = {
  mongoURL: process.env.MONGO_URL || 'mongodb://127.0.0.1:27017/carshare',
  port: process.env.PORT || 8000,
  jwt: {
    secret: process.env.JWT_SECRET || 'jegS3sh6v2bOuJQNhetCOi3WEWZzcZVcQXaht6xA7SV5HC1c18DWaWegkyHzdzo',
    lifetimeInHours: process.env.JWT_LIFETIME_HOURS || 1,  
  },
  insightOps: {
    token: process.env.LOGGING_TOKEN || "c3700183-0984-45a0-9a58-2766945adade", 
    region: process.env.LOGGING_REGION ||  'us',
  },
  twilio: {
    // default values are the Twilio TEST account values and TEST phone number
    accountSid: process.env.TWILIO_ACCOUNT_SID || 'ACb2c95ca9c596846abfa75189338298b5',
    authToken: process.env.TWILIO_AUTH_TOKEN || 'f7dd9ea60433394d20c6e1462f749fc5',
    serviceSid: process.env.TWILIO_SERVICE_SID || 'IS3b2ab1b96693c152426f1ee9f587b6a7',
    sendSmsFrom: '+15005550006',
  },
};

module.exports = config;
