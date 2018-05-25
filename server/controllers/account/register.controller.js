/**
 * Project       - ShaCar
 * Team          - Group 3 Carshare
 * Last Modified - 2018/05/26
 * Authors
 *               - Paul Crow
 *               - Tianqi Chen
 */
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
  user.isAccountConfirmed = false;
  user.isDisabled = false;
  user.isBlockedByAdmin = false;

  var errs = user.validateSync();

  if (errs) {
    res.status(400).send(errs);
  } else {
    let userLicense = new License();
    userLicense.licenseNumber = licensenum;
    userLicense.approvedByAdmin = false;
    var licenseErrs = userLicense.validateSync();

    if (licenseErrs) {
      return res.status(400).send(licenseErrs);
    }
    userLicense.save((licenseerr, usrlicense) => {
      if (licenseerr) {
        return res.status(500).send(licenseerr);
      }
      user.license = userLicense;
      User.findOne({ email: user.email }).exec((error, exist) => {
        if (exist) {
          return res.status(400).send();
        }
        user.save((err, saved) => {
          if (err) {
            return res.status(500).send(err);
          }
          let token = {
            sub: saved._id,
            email: saved.email,
            isAdmin: saved.isAdmin,
            exp: DateUtils.getDateInSeconds(
              DateUtils.addHours(new Date(), config.jwt.lifetimeInHours)
            ),
          };

          const encodedToken = jwt.encode(token, config.jwt.secret);
          return res.status(200).send({ token: encodedToken });
        });
      });
    });
  }
};
