import Express from 'express';
import compression from 'compression';
import bodyParser from 'body-parser';
import path from 'path';

// Webpack Requirements
import webpack from 'webpack';
import config from '../webpack.config.dev';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';

// Set Development modes checks
const isDevMode = process.env.NODE_ENV === 'development' || false;
const isProdMode = process.env.NODE_ENV === 'production' || false;

// Initialize the Express App
const app = new Express();

// in production we want to force app to be served over ssl
// this will help resolve issues like not being able to fetch images from s3 due to CORS rules
var forceSsl = function (req, res, next) {
  if (req.headers['x-forwarded-proto'] !== 'https') {
      return res.redirect(['https://', req.get('Host'), req.url].join(''));
  }
  return next();
};

if (isProdMode) {
  app.use(forceSsl);
}


// Run Webpack dev server in development mode
if (isDevMode) {
  const compiler = webpack(config);
  app.use(webpackDevMiddleware(compiler, { noInfo: true, publicPath: config.output.publicPath }));
  app.use(webpackHotMiddleware(compiler));
}

// React And Redux Setup
import { configureStore } from '../client/store';
import { Provider } from 'react-redux';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { match, RouterContext } from 'react-router';

// Import required modules
import routes from '../client/routes';
import { fetchComponentData } from './util/fetchData';
import serverConfig from './config';

// Apply body Parser and server public assets and routes
app.use(compression());
app.use(bodyParser.json({ limit: '20mb' }));
app.use(bodyParser.urlencoded({ limit: '20mb', extended: false }));
app.use(Express.static(path.resolve(__dirname, '../dist/client')));

const account = require('./routes/account.routes');
const profile = require('./routes/profile.routes');
const cars = require('./routes/cars.routes');
const booking = require('./routes/booking.routes');
const offer = require('./routes/offer.routes');
const images = require('./routes/images.routes');
const license = require('./routes/license.routes');
const paymentDetails = require('./routes/paymentDetails.routes');
const contact = require('./routes/contact.routes');
const confirm = require('./routes/confirm.routes');
const damage = require('./routes/damage.routes');
const manage = require('./routes/manage.routes');


app.use('/api/account', account);
app.use('/api/profile', profile);
app.use('/api/cars', cars);
app.use('/api/booking', booking);
app.use('/api/offer', offer);
app.use('/api/images', images);
app.use('/api/license', license);
app.use('/api/paymentDetails', paymentDetails);
app.use('/api/confirm', confirm);
app.use('/api/contact', contact);
app.use('/api/damage', damage);
app.use('/api/manage', manage);
app.use('/api/*', (req, res) => { res.status(404).send("Not found"); });

module.exports = app;
