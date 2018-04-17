import Booking from "../../models/booking";
import car from "../../models/car";
import User from "../../models/user";

import mongoose from 'mongoose';

import moment from "moment";

const createBooking = function(req, res) {
  const startAt = moment(req.body.startAt).format("YYYY-mm-ddTHH:MM:ss");
  const endAt = moment(req.body.endAt).format("YYYY-mm-ddTHH:MM:ss");
  const carid = req.body.car;
  const userid = req.body.userid;

  User.findById({ userid }).exec((usrErr, selecteduser) => {
    if (usrErr) {
      res.status(500).send(usrErr);
    } else if (!selecteduser) {
      res.status(404).send();
    } else {
      car.findById({ carid }).exec((carErr, vehicle) => {
        if (carErr) {
          res.status(500).send(carErr);
        } else if (!vehicle) {
          res.status(404).send();
        } else {
          let newBooking = new Booking();
          newBooking.car = vehicle._id;
          newBooking.startsAt = startAt.toString();
          newBooking.endsAt = endAt.toString();
          newBooking.user = selecteduser._id;

          var errs = newBooking.validateSync();
          if (errs) {
            res.status(500).send(errs);
          } else {
            newBooking.save((err, booking) => {
              if (err) {
                res.status(500).send(err);
              } else {
                res.json(booking._id);
              }
            });
          }
        }
      });
    }
  });
};

const cancelBooking = function(req, res) {
  const startsAt = req.body.startsAt;
  const endsAt = req.body.endsAt;

  Booking.find({ startsAt: startsAt }, { endsAt: endsAt })
    // Placeholder, should look for booking belonging to current user
    .exec((err, bookings) => {
      if (err) {
        res.status(500).send(err);
      } else if (!bookings) {
        res.status(404).send();
      } else {
        // update booking
        res.status(200);
      }
    });
};

const getBooking = function(req, res) {
  Booking.find()
    // Placeholder, should look for booking belonging to current user
    .exec((err, bookings) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.status(200).send(bookings);
      }
    });
};

const changeBooking = function(req, res) {
  Booking.find()
    // Placeholder, should look for booking belonging to current user
    .exec((err, bookings) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.status(200).send(bookings);
      }
    });
};

const checkBooking = function(req, res) {
  const startAt = req.body.startAt;
  const endAt = req.body.endAt;
  const startsTime = moment(startAt).format("YYYY-mm-ddTHH:MM:ss");
  const endsTime = moment(endAt).format("YYYY-mm-ddTHH:MM:ss");

  Booking.find({ 'car': req.body.car })
    // Placeholder, should look for booking belonging to current user
    .exec((err, bookings) => {
      if (err) {
        res.status(500).send(err);
      } else {
        // found match for car, start comparing time
        if (!bookings) {
          // No matching bookings -> ok to book
          res.status(200).send(true);
        } else {
          //checking of time to be implemented
          bookings.forEach(b => {
           var compStart = moment(bookings.startsAt).format("YYYY-mm-ddTHH:MM:ss");
           var compEnd = moment(bookings.endsAt).format("YYYY-mm-ddTHH:MM:ss");
           //compDuartion=moment.duration(compEnd.diff(compStart));
           if(startsTime.isBetween(compStart, compEnd, null, '()') || endsTime.isBetween(compStart, compEnd, null, '()'))
           {
             //Bad request as the time slot is invalid
             res.status(400).send();
           }
           else
           {
             next();
           }
          });
          res.status(200).send(true);
        }
      }
    });
};

module.exports = {
  createBooking: createBooking,
  getBooking: getBooking,
  cancelBooking: cancelBooking,
  changeBooking: changeBooking,
  checkBooking: checkBooking
};
