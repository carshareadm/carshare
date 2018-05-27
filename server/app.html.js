/**
 * Project       - ShaCar
 * Team          - Group 3 Carshare
 * Last Modified - 2018/05/26
 * Authors
 *               - Paul Crow
 *               - Inga Pflaumer
 */
// Set Development modes checks
const isDevMode = process.env.NODE_ENV === 'development' || false;
const isProdMode = process.env.NODE_ENV === 'production' || false;

// Render Initial HTML
export const renderFullPage = (html, initialState) => {
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
        <meta name="google-site-verification" content="RXukJRCaEihe7x-eKg0Z5sKQ1wzqgqsDrYvDTmcW0xA" />

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
