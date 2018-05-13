const dotenv = require('dotenv');

// https://www.npmjs.com/package/dotenv#config
// adds config vars in .env file to process.env
const env = dotenv.config();



const config = {
  mongoURL: process.env.MONGO_URL || 'mongodb://127.0.0.1:27017/carshare',
  port: process.env.PORT || 8000,
  jwt: {
    secret: process.env.JWT_SECRET || 'jegS3sh6v2bOuJQNhetCOi3WEWZzcZVcQXaht6xA7SV5HC1c18DWaWegkyHzdzo',
    lifetimeInHours: process.env.JWT_LIFETIME_HOURS || 1,
  },
  loggly: {
    token: process.env.LOGGING_TOKEN || "ebfe2909-08cd-4500-bbd9-22049a5934e9",
    subdomain: process.env.LOGGLY_SUBDOMAIN ||  'shacar',
    tags: process.env.LOGGLY_TAGS || ["NodeJS"],
  },
  twilio: {
    // default values are the Twilio TEST account values and TEST phone number
    accountSid: process.env.TWILIO_ACCOUNT_SID || 'ACb2c95ca9c596846abfa75189338298b5',
    authToken: process.env.TWILIO_AUTH_TOKEN || 'f7dd9ea60433394d20c6e1462f749fc5',
    serviceSid: process.env.TWILIO_SERVICE_SID || 'IS3b2ab1b96693c152426f1ee9f587b6a7',
    sendSmsFrom: process.env.TWILIO_SEND_SMS_FROM || '+15005550006',
  },
  sendGrid: {
    apiKey: process.env.SENDGRID_API_KEY,
    sendEmailsFrom: 'carshareadm@gmail.com',
    sendAdminEmailsTo: 'carshareadm@gmail.com',
  },
  crypto: {
    secret: process.env.CRYPTO_SECRET || 'r8ZThckT4eZTvrZjCGcVHC7wq7Qzh2Zx6KtWfLmz237rPYtUHRzASJfTRMagULRN',
    algorithm: 'aes-256-cbc',
  },
};

module.exports = config;
