import Express from 'express';
import compression from 'compression';
import bodyParser from 'body-parser';
import path from 'path';

// Webpack Requirements
import webpack from 'webpack';
import config from '../webpack.config.dev';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';

// Initialize the Express App
const app = new Express();

// Set Development modes checks
const isDevMode = process.env.NODE_ENV === 'development' || false;
const isProdMode = process.env.NODE_ENV === 'production' || false;

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
const images = require('./routes/images.routes');
const license = require('./routes/license.routes');
const paymentDetails = require('./routes/paymentDetails.routes');
app.use('/api/account', account);
app.use('/api/profile', profile);
app.use('/api/cars', cars);
app.use('/api/booking', booking);
app.use('/api/images', images);
app.use('/api/license', license);
app.use('/api/paymentDetails', paymentDetails);

// Render Initial HTML
const renderFullPage = (html, initialState) => {
  // Import Manifests
  const assetsManifest = process.env.webpackAssets && JSON.parse(process.env.webpackAssets);
  const chunkManifest = process.env.webpackChunkAssets && JSON.parse(process.env.webpackChunkAssets);

  return `
    <!doctype html>
    <html>
      <head>
        <meta charset="utf-8"/>
        <meta http-equiv="X-UA-Compatible" content="IE=edge"/>
        <meta name="viewport" content="width=device-width, initial-scale=1"/>
        
        ${isProdMode ? `<link rel='stylesheet' href='${assetsManifest['/app.css']}' />` : ''}
        <link href='https://fonts.googleapis.com/css?family=Lato:400,300,700' rel='stylesheet' type='text/css'/>
        <link rel="shortcut icon" href="http://res.cloudinary.com/hashnode/image/upload/v1455629445/static_imgs/mern/mern-favicon-circle-fill.png" type="image/png" />
        </head>
        <body>
        <div id="root">${html}</div>
        <script>
        window.__INITIAL_STATE__ = ${JSON.stringify(initialState)};
        ${isProdMode ?
          `//<![CDATA[
            window.webpackManifest = ${JSON.stringify(chunkManifest)};
            //]]>` : ''}
            </script>
            <script src='${isProdMode ? assetsManifest['/vendor.js'] : '/vendor.js'}'></script>
            <script src='${isProdMode ? assetsManifest['/app.js'] : '/app.js'}'></script>
            </body>
            </html>
            `;
};

const renderError = err => {
  const softTab = '&#32;&#32;&#32;&#32;';
  const errTrace = isProdMode ?
    `:<br><br><pre style="color:red">${softTab}${err.stack.replace(/\n/g, `<br>${softTab}`)}</pre>` : '';
  return renderFullPage(`Server Error${errTrace}`, {});
};

app.use('/*',
  (req, res) => res.send(renderFullPage('', { app: {} }))
);

module.exports = app;
