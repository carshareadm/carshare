import Location from '../../models/location';
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