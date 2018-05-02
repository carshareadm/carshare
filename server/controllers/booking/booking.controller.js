import Booking from "../../models/booking";
import Car from "../../models/car";
import User from "../../models/user";
import Offer from "../../models/offer";

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
    return res.status(400).send("invalid request params");
  }

  const startAt = req.body.startAt;
  const endAt = req.body.endAt;
  const carId = req.body.car;
  const userId = req.body.userid;

  User.findById(userId).exec((usrErr, selectedUser) => {
    if (usrErr) {
      return res.status(500).send(usrErr);
    }
    if (!selectedUser) {
      // Unauthorised if unable to find current user
      return res.status(401).send();
    }

    Car.findById(carId)
      .populate("vehicleType")
      .exec((carErr, vehicle) => {
        if (carErr) {
          return res.status(500).send(carErr);
        }
        if (!vehicle) {
          // Bad Request if no requested car
          return res.status(400).send("vehicle not found");
        }
        let newBooking = new Booking();
        newBooking.car = vehicle._id;
        newBooking.startsAt = startAt.toString();
        newBooking.endsAt = endAt.toString();
        newBooking.user = selectedUser._id;
        newBooking.unlockCode = codeGenerator.generate();

        var hours = moment
          .duration(
            moment(endAt, "YYYY/MM/DD HH:mm").diff(
              moment(startAt, "YYYY/MM/DD HH:mm")
            )
          )
          .asHours();
        newBooking.totalCost = hours * vehicle.vehicleType.hourlyRate;

        var validateErrs = newBooking.validateSync();
        if (validateErrs) {
          return res.status(500).send(validateErrs);
        }
        Booking.find({
          $and: [
            { car: req.body.car, isDisabled: false },
            {
              $or: [
                {
                  $and: [
                    { startsAt: { $gte: newBooking.startsAt } },
                    { startsAt: { $lte: newBooking.endsAt } },
                  ],
                },
                {
                  $and: [
                    { endsAt: { $gte: newBooking.startsAt } },
                    { endsAt: { $lte: newBooking.endsAt } },
                  ],
                },
                {
                  $and: [
                    { startsAt: { $lte: newBooking.startsAt } },
                    { endsAt: { $gte: newBooking.endsAt } },
                  ],
                },
              ],
            },
          ],
        }).exec((err, bookings) => {
          if (err) {
            return res.status(500).send(err);
          }
          else if (bookings.length > 0) {
            return res
              .status(400)
              .send("Booking would clash with existing booking");
          }
          // Offer validation is part of offer controller and applied by the apply button at booking
          else if (typeof req.body.code!=="undefined")
          {
            // FindOne as Offer Codes are set as unique
            Offer.findOne({ offerCode: req.body.code, isDisabled: false }).exec((offerErr, discount) => {
              if (offerErr) {
                return res.status(500).send(offerErr);
              }
              if (discount) {
              
                newBooking.offer = discount._id;
                //Multiplier applied first
                if (discount.multiplier) {
                  newBooking.totalCost =
                    (100 - discount.multiplier)/100 * newBooking.totalCost;
                }
                if (discount.oneOffValue) {
                  newBooking.totalCost =
                    newBooking.totalCost - discount.oneOffValue;
                }
              }
              newBooking.save((err, booking) => {
                if (err) {
                  return res.status(500).send(err);
                } else {
                  return res.status(200).send(booking);
                }
              });
            });
          }
          else
          {
            newBooking.save((err, booking) => {
              if (err) {
                return res.status(500).send(err);
              } else {
                return res.status(200).send(booking);
              }
            });
          }
          
        });
      });
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

module.exports = {
  createBooking: createBooking,
  getBooking: getBooking,
  cancelBooking: cancelBooking,
  changeBooking: changeBooking,
};
