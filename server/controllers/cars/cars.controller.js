import Car from "../../models/car";
import VehicleType from "../../models/vehicleType";
import Location from "../../models/location";


const getCars = function(req, res) {
  Car.find().
    populate('vehicleType').
    populate('location').
    exec((err, cars) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.status(200).send(cars);
      }
    });
};

module.exports = {
  getCars: getCars,
};
