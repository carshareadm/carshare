const config = {
  mongoURL: process.env.MONGO_URL || 'mongodb://127.0.0.1:27017/carshare',
  port: process.env.PORT || 8000,
  jwt: {
    secret: process.env.JWT_SECRET || 'jegS3sh6v2bOuJQNhetCOi3WEWZzcZVcQXaht6xA7SV5HC1c18DWaWegkyHzdzo',
    lifetimeInHours: process.env.JWT_LIFETIME_HOURS || 1,  
  },  
};

module.exports = config;
