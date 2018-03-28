import User from "../../models/user";
const config = require('../../config');
const DateUtils = require('../../util/date.helper');
const jwt = require('jwt-simple');

exports.login = function(req, res) {
  const email = req.body.email;
  const password = req.body.password;

  User.findOne({ email: email })
    .select("+password")
    .exec((err, user) => {
      if (err ) {
        res.status(401).send("Username or password did not match");
      } else if (!user) {
        res.status(401).send("Username or password did not match");
      } else {        
        let match = user.comparePassword(password, function (error, isMatch) {
          if (error || !isMatch) {
            res.status(401).send("Username or password did not match");
          } else {
            let token = {
              sub: user._id,
              email: user.email,
              isAdmin: user.isAdmin,
              exp: DateUtils.getDateInSeconds(DateUtils.addHours(new Date(), config.jwt.lifetimeInHours)),
            };
  
            const encodedToken = jwt.encode(token, config.jwt.secret);
  
            res.status(200).send({ token: encodedToken });
          }
        });
      }
    });
};
