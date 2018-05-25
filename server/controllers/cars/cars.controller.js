/**
 * Project       - ShaCar
 * Team          - Group 3 Carshare
 * Last Modified - 2018/05/26
 * Authors
 *               - Paul Crow
 *               - Inga Pflaumer
 *               - Jason Koh
 */
import Car from "../../models/car";
import VehicleType from "../../models/vehicleType";
import Location from "../../models/location";
import Booking from "../../models/booking";

import mongoose from 'mongoose';
import moment from 'moment';

import * as logger from '../../util/logger';


const getCars = function(req, res) {
  const filter = {
    'isDisabled': false, // cars that arent disabled
  };
  Car.find(filter)
    .populate('vehicleType')
    .populate('image')
    .populate({
      path: 'location',
      match: {isDisabled: false},
      populate: {path: 'coordinates'},
    })
    .populate('damages')
    .exec((err, cars) => {
      if (err) {
        res.status(500).send(err);
      } else {
        const filtered = cars.filter(f => f.location !== null);
        res.status(200).send(filtered);
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
  if(req.query.start){
    startsAt = moment(req.query.start);
  } else {
    startsAt = moment().startOf("week");
  }
  let endsAt = moment(startsAt).endOf("week");
  //Book ID also comes from the URL
  Booking.find({
      startsAt:{$lt:endsAt.toDate()}, 
      endsAt:{$gt:startsAt.toDate()}, 
      car:mongoose.Types.ObjectId(req.params.carId),
    }).populate('car')
    .exec((err, bookings)=> {
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
    _id:mongoose.Types.ObjectId(req.params.carId),
  }).populate('location image vehicleType').exec((err, car) => {
    if(err){
      return res.status(500).send(err);
    } else if (car) {
      return res.status(200).send(car);
    } else {
      return res.status(404).send('car not found');
    }
  });
}

const getCarsForType = function(req, res){
  VehicleType.find({name: req.params.VehicleName})  
  .exec((err, vt) => {
    if (err) {
      res.status(500).send(err);
      return;
    }
    const carQry = {
      vehicleType: vt,
    };
    if (!req.isAdmin) {
      carQry.isDisabled = false;
    }
    Car.find(carQry)
    .populate('vehicleType')
    .populate('image')
    .populate({
      path: 'location',
      match: {isDisabled: false},
      populate: {path: 'coordinates'},
    })
    .populate('damages')
    .exec((err, car) => {
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
