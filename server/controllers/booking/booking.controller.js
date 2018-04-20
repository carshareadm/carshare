import Booking from "../../models/booking";
import car from "../../models/car";
import User from "../../models/user";

import moment from "moment";

const codeGenerator = require("../../util/code.generator");

const createBooking = function(req, res) {
  const startAt = req.body.startAt;
  const endAt = req.body.endAt;
  const carid = req.body.car;
  const userid = req.body.userid;

  if (
    typeof userid === "undefined" ||
    typeof carid === "undefined" ||
    typeof startAt === "undefined" ||
    typeof endAt === "undefined"
  ) {
    res.status(400).send();
  }

  if (!userid || !carid || !startAt || !endAt) {
    //Bad Request if not userid or carid
    res.status(400).send();
  }

  User.findById(userid).exec((usrErr, selecteduser) => {
    if (usrErr) {
      res.status(500).send(usrErr);
    } else if (!selecteduser) {
      res.status(404).send();
    } else {
      car.findById(carid).exec((carErr, vehicle) => {
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
          newBooking.unlockCode = codeGenerator.generate();

          var validateErrs = newBooking.validateSync();
          if (validateErrs) {
            console.log(validateErrs);
            res.status(500).send(errs);
          } else {
            Booking.find({ car: req.body.car, disabled: false })
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
                      var compStart = moment(bookings.startsAt);
                      var compEnd = moment(bookings.endsAt);
                      //compDuartion=moment.duration(compEnd.diff(compStart));
                      var checkOne = moment(startAt).isBetween(
                        compStart,
                        compEnd,
                        null,
                        "()"
                      );
                      var checkTwo = moment(endAt).isBetween(
                        compStart,
                        compEnd,
                        null,
                        "()"
                      );
                      var checkThree = moment(endAt).isSame(compStart);
                      var checkFour = moment(endAt).isSame(compEnd);
                      var checkFive = moment(startAt).isSame(compStart);
                      var checkSix = moment(startAt).isSame(compEnd);
                      if (
                        checkOne ||
                        checkTwo ||
                        checkThree ||
                        checkFour ||
                        checkFive ||
                        checkSix
                      ) {
                        //Bad request as the time slot is invalid
                        res.status(400).send();
                      }
                    });
                    newBooking.save((err, booking) => {
                      if (err) {
                        res.status(500).send(err);
                      } else {
                        res.status(200).send(booking._id);
                      }
                    });
                  }
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

  /* No longer necessary due to moment creation now completed later
  To be removed at finalisation
  const startsTime = moment(startAt).format("YYYY-mm-ddTHH:MM:ss");
  const endsTime = moment(endAt).format("YYYY-mm-ddTHH:MM:ss");
  */

  Booking.find({ car: req.body.car, disabled: false })
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
            var compStart = moment(bookings.startsAt);
            var compEnd = moment(bookings.endsAt);
            //compDuartion=moment.duration(compEnd.diff(compStart));
            var checkOne = moment(startAt).isBetween(
              compStart,
              compEnd,
              null,
              "()"
            );
            var checkTwo = moment(endAt).isBetween(
              compStart,
              compEnd,
              null,
              "()"
            );
            var checkThree = moment(endAt).isSame(compStart);
            var checkFour = moment(endAt).isSame(compEnd);
            var checkFive = moment(startAt).isSame(compStart);
            var checkSix = moment(startAt).isSame(compEnd);
            if (
              checkOne ||
              checkTwo ||
              checkThree ||
              checkFour ||
              checkFive ||
              checkSix
            ) {
              //Bad request as the time slot is invalid
              res.status(400).send();
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
  checkBooking: checkBooking,
};
