import Booking from "../../models/booking";

const createBooking = function (req, res) {
  const startsAt= req.body.startsAt;
  const endsAt = req.body.endsAt;

  let newBooking = new Booking({
    startsAt: startsAt,
    endsAt: endsAt,
  });

  var errs = newBooking.validateSync();
  if (errs) {
    res.status(400).send(errs);
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

const cancelBooking = function (req, res) {
  const startsAt= req.body.startsAt;
  const endsAt = req.body.endsAt;


  Booking.find({'startsAt': startsAt}, {'endsAt': endsAt})
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
}

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


module.exports = {
  createBooking: createBooking,
  getBooking: getBooking,
  cancelBooking: cancelBooking,
};