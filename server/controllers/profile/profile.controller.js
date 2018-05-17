import User from "../../models/user";
import Address from "../../models/address";
import License from "../../models/license";
import Booking from "../../models/booking";
import Damage from "../../models/damage";
import Car from "../../models/car";

import mongoose from 'mongoose';

import * as logger from '../../util/logger';

const getMyProfile = function(req, res) {
  User.findById(req.userId)
    .select("email mobile license address")
    .populate("address")
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
      return res.status(500).send(usrErr);
    }
    if (!userFound) {
      return res.status(404).send();
    }
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
          return res.status(500).send(licenseUpdErr);
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
        return res.status(500).send(addressErr);
      }
      userFound.address.save((addressUpdErr, savedAdd) => {
        if (addressUpdErr) {
          return res.status(500).send(addressUpdErr);
        }
      });
      isUpdated = true;
    }

    if (isUpdated) {
      const usrChkErr = userFound.validateSync();
      if (usrChkErr) {
        return res.status(500).send(usrChkErr);
      }
      userFound.save((usrUpdErr, savedUsr) => {
        if (usrUpdErr) {
          return res.status(500).send(usrUpdErr);
        } else {
          return res.status(200).send(savedUsr);
        }
      });
    } else {
      return res.status(400).send('Nothing updated');
    }
  });
};


const getMyBookings = function(req, res){
  Booking.find({
    user: mongoose.Types.ObjectId(req.userId), isDisabled: false})
    .sort({ startsAt: -1 })
    .populate({
      path:'car', populate: ['vehicleType', 'location'],
    })
    .exec((err, bookings) =>{
      if(err){
        res.status(500).send(err);
      }
      // Make sure the damages are returned
      Promise.all(bookings.map((booking, n) =>
        Damage
          .find({ car: booking.car._id })
          .exec()
          .then(damages => {
            booking.car.damages = damages;
            return booking;
          })
      )).then(bs => res.status(200).send(bs));
    });
};

const deleteMyAccount = async (req, res) => {
  try {
    const user = await User.findById(req.userId).exec();

    if (!user) {
      return res.status(404).send('User not found');
    }
    const now = new Date();
    const deletedAt = `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()}`;
    user.isDisabled = true;
    user.email = `self_deleted_${deletedAt}_${user.email}`;

    const saved = await user.save();

    const bulkCancel = await Booking.update({user: req.userId}, {isDisabled: true}, {multi: true}).exec();

    return res.status(200).send(saved);
  }
  catch(e) {
    logger.err(e);
    return res.status(500).send(e);
  }
};

module.exports = {
  getMyProfile: getMyProfile,
  updateMyProfile: updateMyProfile,
  bookings: getMyBookings,
  deleteMyAccount: deleteMyAccount,
};
