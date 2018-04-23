import Booking from "../../models/booking";
import car from "../../models/car";
import User from "../../models/user";

import moment from "moment";

const codeGenerator = require("../../util/code.generator");

const createBooking = function(req, res) {
  if (
    typeof req.body.userid === "undefined" ||
    typeof req.body.startAt === "undefined" ||
    typeof req.body.endAt === "undefined" ||
    typeof req.body.car === "undefined"
  ) {
    //Bad Request if not all fields are present
    res.status(400).send();
  } else {
    const startAt = req.body.startAt;
    const endAt = req.body.endAt;
    const carid = req.body.car;
    const userid = req.body.userid;

    User.findById(userid).exec((usrErr, selecteduser) => {
      if (usrErr) {
        res.status(500).send(usrErr);
      } else if (!selecteduser) {
        // Unauthorised if unable to find current user
        res.status(401).send();
      } else {
        car.findById(carid).populate('vehicleType').exec((carErr, vehicle) => {
          if (carErr) {
            res.status(500).send(carErr);
          } else if (!vehicle) {
            // Bad Request if no requested car
            res.status(400).send();
          } else {
            let newBooking = new Booking();
            newBooking.car = vehicle._id;
            newBooking.startsAt = startAt.toString();
            newBooking.endsAt = endAt.toString();
            newBooking.user = selecteduser._id;
            newBooking.unlockCode = codeGenerator.generate();
            newBooking.disabled = false;
            var hours = moment.duration(moment(endAt, 'YYYY/MM/DD HH:mm')
            .diff(moment(startAt, 'YYYY/MM/DD HH:mm'))).asHours();
            newBooking.totalCost =  hours*vehicle.vehicleType.hourlyRate;
            let alreadyBooked = false;

            var validateErrs = newBooking.validateSync();
            if (validateErrs) {
              res.status(500).send(validateErrs);
            } else {
              Booking.find({ car: req.body.car, disabled: false }).exec(
                (err, bookings) => {
                  if (err) {
                    res.status(500).send(err);
                  } else {
                    if (!bookings) {
                      // No matching bookings -> ok to book
                      newBooking.save((err, booking) => {
                        if (err) {
                          res.status(500).send(err);
                        } else {
                          res.status(200).send(booking._id);
                        }
                      });
                    } else {
                      // found match for car, start comparing time
                      bookings.forEach(b => {
                        var compStart = moment(b.startsAt);
                        var compEnd = moment(b.endsAt);
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
                          //Sets alreadyBooked flag to true
                          alreadyBooked = true;
                          //Bad request as the time slot is invalid
                          res.status(400).send();
                        }
                      });
                      if(alreadyBooked===false)
                      {
                        newBooking.save((err, booking) => {
                          if (err) {
                            res.status(500).send(err);
                          } else {
                            res.status(200).send(booking._id);
                          }
                        });
                      }
                    }
                  }
                }
              );
            }
          }
        });
      }
    });
  }
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

module.exports = {
  createBooking: createBooking,
  getBooking: getBooking,
  cancelBooking: cancelBooking,
  changeBooking: changeBooking,
};
