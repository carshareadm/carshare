const config = {
  mongoURL: process.env.MONGO_URL || 'mongodb://127.0.0.1:27017/mern-starter',
  port: process.env.PORT || 8000,
};

export default config;
