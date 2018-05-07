import Car from '../../models/car';
import Images from '../../models/image';
import * as logger from '../../util/logger';


export const getAll = async (req, res) => {
  try {
    const cars = await Car.find({})
      .populate('vehicleType image')
      .populate({
        path: 'location',
        match: {isDisabled: false},
        populate: {path: 'coordinates'},
      })
      .exec();

      // get virtual publicUrl
      const mapped = cars.map(m => m.toObject());
      return res.status(200).send(mapped);
  } catch(e) {
    logger.err(e);
    return res.status(500).send(e);
  }
};

export const update = async (req, res) => {
  try {
    const car = await Car.findById(req.params.carId).exec();    

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
    car.image = req.body.image;
    car.isDisabled = req.body.isDisabled;

    const saved = await car.save();
    return res.status(200).send(saved.toObject());

  } catch(e) {
    logger.err(e);
    return res.status(500).send(e);
  }
};

export const updateImage = async (req, res) => {
  try {
    const car = await Car.findById(req.params.carId).exec();    
    if (car === null) {
      return res.status(404).send('Car not found');
    }

    const img = await Images.findById(req.params.imageId).exec();
    if (!img) {
      return res.status(404).send('Image not found');
    }

    car.image = img;
    
    const saved = await car.save();
    return res.status(200).send(saved.toObject());

  } catch(e) {
    logger.err(e);
    return res.status(500).send(e);
  }
};

export const create = async (req, res) => {
  try {
    const car = new Car();
    car.rego = req.body.rego;
    car.make = req.body.make;
    car.model = req.body.model;
    car.colour = req.body.colour;
    car.year = +req.body.year;
    car.seats = +req.body.seats;
    car.doors = +req.body.doors;
    car.vehicleType = req.body.vehicleType;
    car.isDisabled = false;
    car.location = req.body.location;
    car.image = req.body.image;

    const errs = car.validateSync();
    if (errs) {
      return res.status(400).send(errs);
    }

    const saved = await car.save();
    return res.status(200).send(saved);
  } catch(e) {
    const err = {...e};
    logger.err(e);
    return res.status(500).send(err);
  }
  
};
