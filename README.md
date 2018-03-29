# carshare
[![Build Status](https://travis-ci.org/carshareadm/carshare.svg?branch=master)](https://travis-ci.org/carshareadm/carshare)
---

Project bootstrapped with the MERN.io starter project

hosted in heroku - visit it at https://obscure-waters-10676.herokuapp.com/

Swagger API documentation available when running the ap in dev mode at http;//localhost:8000/api-docs

Make sure that mongoDb is installed prior to running the project.

### see [DevRequirements](./DevRequirements.md) for a list of tools to install

### [Git branching Strategy](./GitBranching.md)

### Site authentication
* successful login now returns a [JWT](https://jwt.io/) (JSON Web Token) as body of response
* endpoints that require user to be authorised need the request to have Authorization header set with value of 'Bearer <JWT value>'
* the body of the JWT will contain an object if base64 decoded in the react app, the isAdmin field can be used to determine if user is an admin :)
```
{
  "sub": "user._id",
  "email": "user.email",
  "isAdmin": false,
  "exp": 1522246501.732
}
```
FRONTEND INDTRUCTIONS:
Install the project and open project folder.

The files you need to know about but don’t need to edit for now:
server.js combines all of your components into html. You don’t need to edit it. unless you need to change fonts or meta. If you can’t understand where the html is - it’s there.

client -> index.js combines you components. Don’t edit it.
client -> App.js imports application routes (routes.js), main.css and links everything together
client -> routes.js  holds together the routes to your components. 
client -> main.css is the global CSS that all of your pages use.
client->components->DevTools.js the devtools that show on the right in development mode

All of our pages will have the same structure
Header
Content
Footer

Files to work with:
The client->Layout sets up the Layout for our pages. All of them have the same header and footer.
client->Layout->components->Header the header for all of your website pages.
client->Layout->components->Footer the footer for all of your website pages.

client->modules->Layout
Structure of All pages. It connects the Header/Footer with the central components like Faq.

If our FAQ will have additional components inside it, we will add them to Faq->components folder

Don’t forget to connect your component to the application by going into client -> routes.js  and importing it and adding a path inside Route Layout component same way as for faq (that sets the url for the page)
Note that we are using old router, so look for documentation here: https://github.com/ReactTraining/react-router/tree/v2.8.1/docs


To start application in dev mode run
npm run start:dev 
and open localhost:8000 (check the port in the logs)

