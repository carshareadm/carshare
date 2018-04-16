import User from "../../models/user";
import Address from "../../models/address";
import License from "../../models/license";
import Booking from "../../models/booking";
import Car from "../../models/car";

import mongoose from 'mongoose';

const getMyProfile = function(req, res) {
  User.findById(req.userId)
    .populate("-confirmationCodes -__v")
    .exec((err, user) => {
      if (err) {
        res.status(500).send(err);
      } else if (!user) {
        res.status(404).send();
      } else {
        res.status(200).send(user);
      }
    });
};

const updateMyProfile = function(req, res) {
  const user = req.body.user;
  const email = req.body.email;
  const mobile = req.body.mobile;
  const licenseNumber = req.body.license;
  const password = req.body.password;
  const street1 = req.body.street1;
  const street2 = req.body.street2;
  const suburb = req.body.suburb;
  const state = req.body.state;
  const postCode = req.body.postCode;

  let isUpdated = false;

  if (
    !user &&
    !email &&
    !mobile &&
    !licenseNumber &&
    !password &&
    !street1 &&
    !street2 &&
    !suburb &&
    !state &&
    !postCode
  ) {
    // No fields sent, Bad request
    res.status(400).send('No request body');
  }

  User.findById(user).populate('address license').exec((usrErr, userFound) => {
    if (usrErr) {
      res.status(500).send(usrErr);
    } else if (!userFound) {
      res.status(404).send();
    } else {
      if (email && (!mobile && !password)) {
        userFound.email = email;
        isUpdated = true;
      }
      if (mobile && (!email && !password)) {
        userFound.mobile = mobile;
        isUpdated = true
      }
      if (password && (!email && !mobile)) {
        userFound.password = password;
        isUpdated = true
      }
      if (licenseNumber) {
        userFound.license.licenseNumber = licenseNumber;
        userFound.license.save((licenseUpdErr, savedLic) => {
          if (licenseUpdErr) {
            res.status(500).send(licenseUpdErr);
          }
        });
        isUpdated = true
      }
      // Address component update
      if (street1 || street2 || suburb || state || postCode) {
        if (!userFound.address) {
          userFound.address = new Address();
        }
        if (street1) {
          userFound.address.street1 = street1;
        }
        if (street2) {
          userFound.address.street2 = street2;
        }
        if (suburb) {
          userFound.address.suburb = suburb;
        }
        if (state) {
          userFound.address.state = state;
        }
        if (postCode) {
          userFound.address.postCode = postCode;
        }
        var addressErr = userFound.address.validateSync();
        if (addressErr) {
          res.status(500).send(addressErr);
        }
        userFound.address.save((addressUpdErr, savedAdd) => {
          if (addressUpdErr) {
            res.status(500).send(addressUpdErr);
          }
        });
        isUpdated = true
      }

      if (isUpdated) {
        const usrChkErr = userFound.validateSync();
        if (usrChkErr) {
          res.status(500).send(usrChkErr);
        } else {
          userFound.save((usrUpdErr, savedUsr) => {
            if (usrUpdErr) {
              res.status(500).send(usrUpdErr);
            } else {
              res.status(200).send(savedUsr);
            }
          });
        }
      } else {
        res.status(400).send('Nothing updated');
      }
    }
  });
};


const getMyBookings = function(req, res){
  Booking.find({
    user:mongoose.Types.ObjectId(req.userId)
  }).populate({
      path:'car', populate: ['vehicleType', 'location']
    })
    .exec((err, bookings) =>{
      if(err){
        res.status(500).send(err);
      } else {
        res.status(200).send(bookings);
      }
    });
};

module.exports = {
  getMyProfile: getMyProfile,
  updateMyProfile: updateMyProfile,
  bookings: getMyBookings
};
