import User from "../../models/user";
import ConfirmationCode from "../../models/confirmationCode";
const config = require('../../config');
const DateUtils = require('../../util/date.helper');

exports.reset = function(req, res) {
  const email = req.body.email;
  const confirmationCode = req.body.confirmationCode;
  const newpassword = req.body.password;

  User.findOne({ email: email })
    .exec((err, user) => {
      if (err ) {
        res.status(401).send("Username or code did not match");
      } else if (!user) {
        res.status(401).send("Username or code did not match");
      } else {        
        ConfirmationCode.find({ user: user._id }).sort({_id:-1}).limit(1)
          .exec((error, code) => {
        //let match = user.comparePassword(password, function (error, isMatch) {
          /* 
          searches for last entry in confirmation code. 
          */
          
          if (error || code.code!=confirmationCode) {
            res.status(401).send("Username or code did not match");
          } else {
            user.password=newpassword;
            user.save((err, saved) => {
              if (err) {
                res.status(500).send(err);
              } else {
                res.json(saved._id);
              }
            });
          }
        });
        
      }
    });
};
