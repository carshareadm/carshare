import Car from "../../models/car";

const getCars = function(req, res) {
  Car.find()
    .exec((err, cars) => {
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