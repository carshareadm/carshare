import Car from "../../models/car";
import VehicleType from "../../models/vehicleType";
import Location from "../../models/location";
import Booking from "../../models/booking";

import mongoose from 'mongoose';
import moment from 'moment';


const getCars = function(req, res) {
  Car.find().
    populate('vehicleType').
    populate({
      path:'location',
      populate: {path: 'coordinates'} 
    }).
    exec((err, cars) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.status(200).send(cars);
      }
    });
};

const parseBookings = function(booking, pStart, pEnd){
  const start = moment.max(moment(booking.startsAt), pStart);
  const end = moment.min(moment(booking.endsAt), pEnd);
  const hours = end.diff(start, 'hours');
  const times = [];
  // We add 1 hour to the booking length to make sure the car will be returned on time.
  for(let i=0; i<=hours; i++){
    times.push({
        hour: start.format("HH:mm"),
        weekday: start.format("ddd"),
      });
    start.add(1, 'h');
  }

  return times;
}

const getTimes = function(req, res) {
  // To allow for weeklly display and switch, we take Start period and End period from URL
  let startsAt;
  let endsAt;
  if(req.query.start && req.query.end){
    startsAt = moment(req.query.start);
    endsAt =  moment(req.query.end);
  } else {
    startsAt = moment().startOf("week");
    endsAt =  moment().endOf("week");
  }
  //Book ID also comes from the URL
  Booking.find({
      startsAt:{$lt:endsAt.toDate()}, 
      endsAt:{$gt:startsAt.toDate()}, 
      car:mongoose.Types.ObjectId(req.params.carId)
    }).exec((err, bookings)=> {
      if (err) {
        res.status(500).send(err);
      } else {
        let times = [];
        // For each found booking we count the hours included and add them to array we return
        bookings.forEach(b => {
          times = times.concat(parseBookings(b, startsAt, endsAt));
        });
        res.status(200).send(times);
      }
    });
};

const getCar = function(req, res) {
  Car.find({
    _id:mongoose.Types.ObjectId(req.params.carId)
  }).exec((err, car) => {
    if(err){
      res.status(500).send(err);
    } else {
      res.status(200).send(car);
    }
  });
}

const getCarsForType = function(req, res){
  VehicleType.find({
      name: req.params.VehicleName
    }).exec((err, vt) => {
      if(err){
        res.status(500).send(err);
        return;
      }
      Car.find({
        vehicleType: vt
      }).populate('vehicleType').exec((err, car) => {
        if(err){
          res.status(500).send(err);
        } else {
          res.status(200).send(car);
        }
      });
    });

}

module.exports = {
  getCars: getCars,
  getTimes: getTimes,
  getCar: getCar,
  getCarsForType: getCarsForType,
};
