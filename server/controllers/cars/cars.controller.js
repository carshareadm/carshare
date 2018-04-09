import Car from "../../models/car";
import VehicleType from "../../models/vehicleType";
import Location from "../../models/location";


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

const getTimes = function(req, res) {
  console.log(req.params.carId);
  // Find car by ID and then times available from it -> Car.find({'_id': })
  res.status(200).send([]);
}

module.exports = {
  getCars: getCars,
  getTimes: getTimes,
};
