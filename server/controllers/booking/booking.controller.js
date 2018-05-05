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

        //Add one hour buffer
        var bufferEndTime = moment(endAt).add(1,'h');

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
                    { startsAt: { $lte: bufferEndTime } },
                  ],
                },
                {
                  $and: [
                    { endsAt: { $gte: newBooking.startsAt } },
                    { endsAt: { $lte: bufferEndTime } },
                  ],
                },
                {
                  $and: [
                    { startsAt: { $lte: newBooking.startsAt } },
                    { endsAt: { $gte: bufferEndTime } },
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

const extendBooking = function(req, res) {
  if (
    typeof req.body.bookid === "undefined" ||
    typeof req.body.endAt === "undefined"
  ) {
    //Bad Request if not all fields are present
    return res.status(400).send("invalid request params");
  }

  const endAt = req.body.endAt;
  const bookingId = req.body.bookid;
  const checkEndTime = moment(endAt).add(1, 'h');

  Booking.findById(bookingId).exec((bookFindErr, foundBook) => {
    if (bookFindErr) {
      return res.status(500).send(usrErr);
    }
    if (!foundBook) {
      // Bad Request if booking not found
      return res.status(400).send();
    }

    else
    {
        Booking.find({
          $and: [
            { car: foundBook.car, isDisabled: false },
            {
              $or: [
                {
                  $and: [
                    { startsAt: { $gte: foundBook.startsAt } },
                    { startsAt: { $lte: checkEndTime } },
                  ],
                },
                {
                  $and: [
                    { endsAt: { $gte: foundBook.startsAt } },
                    { endsAt: { $lte: checkEndTime } },
                  ],
                },
                {
                  $and: [
                    { startsAt: { $lte: foundBook.startsAt } },
                    { endsAt: { $gte: checkEndTime } },
                  ],
                },
              ],
            },
          ],
        }).exec((err, bookings) => {
          console.log(bookings);
          if (err) {
            return res.status(500).send(err);
          }
          //Should only be one from current booking
          else if (bookings.length > 1) {
            return res
              .status(400)
              .send("Booking would clash with existing booking");
          }
          // Offer validation is part of offer controller and applied by the apply button at booking
          else if (typeof foundBook.offerCode!=="undefined")
          {
            // FindOne as Offer Codes are set as unique
            Offer.findOne({ offerCode: foundBook.OfferCode, isDisabled: false }).exec((offerErr, discount) => {
              if (offerErr) {
                return res.status(500).send(offerErr);
              }
              if (discount) {
              
                foundBook.offer = discount._id;
                //Multiplier applied first
                if (discount.multiplier) {
                  foundBook.totalCost =
                    (100 - discount.multiplier)/100 * foundBook.totalCost;
                }
                if (discount.oneOffValue) {
                  foundBook.totalCost =
                    foundBook.totalCost - discount.oneOffValue;
                }
              }
              foundBook.endsAt=endAt.toString();
              foundBook.save((err, booking) => {
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
            foundBook.endsAt=endAt.toString();
            foundBook.save((err, booking) => {
              if (err) {
                return res.status(500).send(err);
              } else {
                return res.status(200).send(booking);
              }
            });
          }
          
        });
    }
  });
};



const cancelBooking = function(req, res) {
  if (typeof req.body.bookingid === "undefined" || 
      typeof req.body.userid === "undefined") {
    //Bad Request if no bookingid
    return res.status(400).send("invalid request params");
  }

  const bookingId = req.body.bookingid;
  const userId = req.body.userid;

  Booking.findById(bookingId)
    .exec((err, booking) => {
      if (err) {
        res.status(500).send(err);
      } else if (!booking) {
        res.status(404).send();
      } else {
        if(booking.user!=userId)
        {
          // Not a booking belonging to the user
          res.status(401).send();
        }
        else if(moment(booking.startsAt).isAfter(moment()))
        {
          // Set isDisabled flag for cancellation
          booking.isDisabled=true;
          booking.save((err, booking) => {
            if (err) {
              return res.status(500).send(err);
            } else {
              return res.status(200).send();
            }
          });
        }
        else
        {
          // Bad Request as booking start time is after current time
          res.status(400).send();
        }
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
  if (
    typeof req.body.userid === "undefined" ||
    typeof req.body.startAt === "undefined" ||
    typeof req.body.endAt === "undefined" ||
    typeof req.body.car === "undefined" ||
    typeof req.body.bookingid === "undefined"
  ) {
    //Bad Request if not all fields are present
    return res.status(400).send("invalid request params");
  }

  const startAt = req.body.startAt;
  const endAt = req.body.endAt;
  const carId = req.body.car;
  const userId = req.body.userid;
  const bookingId = req.body.bookingid;

  Booking.findById(bookingId)
    .exec((err, bookings) => {
      if (err) {
        res.status(500).send(err);
      } else if (!bookings) {
        res.status(404).send();
      } else {
        // update booking
        // Update changes
        res.status(200).send();
      }
    });
};

module.exports = {
  createBooking: createBooking,
  getBooking: getBooking,
  cancelBooking: cancelBooking,
  changeBooking: changeBooking,
  extendBooking: extendBooking,
};
