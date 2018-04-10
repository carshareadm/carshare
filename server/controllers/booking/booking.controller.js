import Booking from "../../models/booking";
import car from "../../models/car";
import User from "../../models/user";

import moment from 'moment';

const createBooking = function (req, res) {
  const startAt = moment(req.body.startAt).format("YYYY-mm-ddTHH:MM:ss");
  const endAt = moment(req.body.endAt).format("YYYY-mm-ddTHH:MM:ss");
  const carid = req.body.car;
  const userid = req.body.userid;

  User.find({'_id': userid})
  .exec((usrerr, selecteduser) => {
    if (usrerr) {
      res.status(500).send(usrerr);
    } else if (!selecteduser) {
      res.status(404).send();
    } else {

  car.find({'_id': carid})
  .exec((carerr, vehicle) => {
    if (carerr) {
      res.status(500).send(carerr);
    } else if (!vehicle) {
      res.status(404).send();
    } else {

  let newBooking = new Booking();
  newBooking.car=carid;
  newBooking.startsAt = startAt.toString();
  newBooking.endsAt = endAt.toString();
  newBooking.user= selecteduser;

  console.log(newBooking);
  

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
});

}
});

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

const checkBooking = function (req, res) {
  const startAt= req.body.startAt;
  const endAt = req.body.endAt;
  const startsTime=moment(startAt).format("YYYY-mm-ddTHH:MM:ss");
  const endsTime=moment(endAt).format("YYYY-mm-ddTHH:MM:ss");


  const carid = req.body.car;


  Booking.find({'car': carid})
    .populate('startsAt', 'endsAt')
    // Placeholder, should look for booking belonging to current user
    .exec((err, bookings) => {
      if (err) {
        res.status(500).send(err);
      }
      else {
        // found match for car, start comparing time
        if(!bookings.startsAt)
        {
          res.status(200).send(true);
        }
        else
        {
          //checking of time to be implemented
          moment(bookings.startsAt).format("YYYY-mm-ddTHH:MM:ss");
          res.status(404);
        }
      }
    });
}


module.exports = {
  createBooking: createBooking,
  getBooking: getBooking,
  cancelBooking: cancelBooking,
  changeBooking: changeBooking,
  checkBooking: checkBooking,
};