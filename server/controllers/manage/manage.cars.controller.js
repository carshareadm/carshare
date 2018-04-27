import Cars from '../../models/car';
import logger from '../../util/logger';


export const getAll = async (req, res) => {
  try {
    const cars = await Cars.find({})
      .populate('location vehicleType')
      .exec();

      return res.status(200).send(cars);
  } catch(e) {
    logger.err(e);
    return res.status(500).semd(e);
  }
};

export const update = async (req, res) => {
  try {
    const car = await Cars.findById(req.params.carId).exec();
    
    if (car === null) {
      return res.status(404).send('Car not found');
    }
    
    car.rego = req.body.rego;
    car.make = req.body.make;
    car.model = req.body.model;
    car.colour = req.body.colour;
    car.year = req.body.year;
    car.seats = req.body.seats;
    car.doors = req.body.doors;
    car.vehicleType = req.body.vehicleType;
    car.location = req.body.location;
    car.isDisabled = req.body.isDisabled;
    
    const saved = await car.save();
    return res.status(200).send(saved);

  } catch(e) {
    logger.err(e);
    return res.status(500).send(e);
  }
};