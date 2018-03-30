const config = require('../config');
const jwt = require('jwt-simple');
const User = require('../models/user');
const DateUtils = require('../util/date.helper');

const isAuthenticatedGuard = function (req, res, next) {
  if (!req.headers.authorization) {
    return res.status(401).send({ error: 'Token Missing' });
  }
  var token = req.headers.authorization.split(' ')[1];

  var payload = null;
  try {
    payload = jwt.decode(token, config.jwt.secret);
  }
  catch (err) {
    return res.status(401).send({ error: err.message });
  }

  // check if the user exists
  User.findById(payload.sub, function(err, user){
    if (!user){
      return res.status(401).send({error: 'No User'});
    } else {
      req.userId = user._id;
      req.iaAdmin = user.isAdmin;
      next();
    }
  });
};

module.exports = isAuthenticatedGuard;