import Location from '../../models/location';
import Car from '../../models/car';
import Coordinates from '../../models/coordinate';
import * as logger from '../../util/logger';


export const getAll = async (req, res) => {
  try {
    const locs = await Location.find({})
      .populate('coordinates')
      .exec();
      return res.status(200).send(locs);
  } catch(e) {
    logger.err(e);
    return res.status(500).send(e);
  }
};

export const create = async (req, res) => {
  try {
    const location = new Location();
    const coords = new Coordinates();

    if (!req.body.coordinates) {
      return res.status(400).send('Invalid coordinates');
    }
  
    coords.latitude = req.body.coordinates.latitude;
    coords.longitude = req.body.coordinates.longitude;
    const cErrs = coords.validateSync();
    if (cErrs) {
      return res.status(400).send('Invalid coordinates');
    }
    const savedCoords = await coords.save();

    location.name = req.body.name;
    location.coordinates = savedCoords;
    const lErrs = location.validateSync();
    if(lErrs) {
      return res.status(400).send('Invalid location');
    }
    const savedLocation = await location.save();

    return res.status(200).send(savedLocation);

  } catch(e) {
    logger.err(e);
    return res.status(500).send(e);
  }
};

export const update = async (req, res) => {
  try {
    const location = await Location
      .findById(req.params.locationId)
      .populate('coordinates')
      .exec();
    
    if (location === null) {
      return res.status(404).send('Location not found');
    }

    if (!location.coordinates) {
      location.coordinates = new Coordinates();
    }

    location.coordinates.latitude = req.body.coordinates.latitude;
    location.coordinates.longitude = req.body.coordinates.longitude;
    
    const savedCoords = await location.coordinates.save();
        
    location.name = req.body.name;
    location.isDisabled = req.body.isDisabled;
    
    const saved = await location.save();
    return res.status(200).send(saved);

  } catch(e) {
    console.log(e);
    logger.err(e);
    return res.status(500).send(e);
  }
};

export const stats = async (req, res) => {
  try {
    const totalLocations = await Location.find({}).exec();
    const inactive = totalLocations.filter(f => f.isDisabled === true);
    const carsWithLocations = await Car.find({})      
      .populate('location')
      .exec();
    const carsWithEnabledLocations = carsWithLocations.filter(f => f.location && f.location.isDisabled === false);
    const carsWithDisabledLocations = carsWithLocations.filter(f => f.location && f.location.isDisabled === true);
    const distinctLocationsWithCars = [...new Set(carsWithLocations.map(m => m.location))];
      
  
    const results = {
      total: totalLocations.length,
      inactive: inactive.length,
      carsActiveLocations: carsWithEnabledLocations.length,
      carsInactiveLocations: carsWithDisabledLocations.length,
      assignedToCars: distinctLocationsWithCars.length,
    }

    return res.status(200).send(results);
  }
  catch(e) {
    logger.err(e);
    return res.status(500).send(e);
  }
};
