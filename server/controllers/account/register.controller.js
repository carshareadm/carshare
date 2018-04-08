import User from "../../models/user";
import License from "../../models/license";
import Image from "../../models/image";

const config = require("../../config");
const DateUtils = require("../../util/date.helper");
const jwt = require("jwt-simple");

exports.register = function(req, res) {
  const email = req.body.email;
  const mobile = req.body.mobile;
  const licensenum = req.body.license;
  const password = req.body.password;

  let user = new User();
  user.email = email;
  user.mobile = mobile;
  user.password = password;
  user.isAdmin = false;

  var errs = user.validateSync();

  if (errs) {
    res.status(400).send(errs);
  } else {
    let userLicense = new License();
    userLicense.licenseNumber = licensenum;
    var licenseerrs = userLicense.validateSync();

    if (licenseerrs) {
      res.status(400).send(licenseerrs);
    } else {
      userLicense.save((licenseerr, usrlicense) => {
        if (licenseerr) {
          res.status(500).send(licenseerr);
        } else {
          user.license = userLicense;
          user.save((err, saved) => {
            if (err) {
              res.status(500).send(err);
            } else {
              let token = {
                sub: saved._id,
                email: saved.email,
                isAdmin: saved.isAdmin,
                exp: DateUtils.getDateInSeconds(
                  DateUtils.addHours(new Date(), config.jwt.lifetimeInHours)
                ),
              };

              const encodedToken = jwt.encode(token, config.jwt.secret);
              res.status(200).send({ token: encodedToken });
            }
          });
        }
      });
    }
  }
};
