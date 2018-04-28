import Locations from '../../models/location';
import Coordinates from '../../models/coordinate';
import logger from '../../util/logger';


export const getAll = async (req, res) => {
  try {
    const locs = await Locations.find({})
      .populate('coordinates')
      .exec();
      return res.status(200).send(locs);
  } catch(e) {
    logger.err(e);
    return res.status(500).send(e);
  }
};

export const update = async (req, res) => {
  try {
    const location = await Locations
      .findById(req.params.locationId)
      .populate('coordinates')
      .exec();
    
    if (location === null) {
      return res.status(404).send('Location not found');
    }

    let coords = new Coordinates();
    coords.latitude = req.body.coordinates.latitude;
    coords.longitude = req.body.coordinates.longitude;

    if (!location.coordinates
      || location.coordinates.latitude !== coords.latitude
      || location.coordinates.longitude !== coords.longitude
    ) {
      const savedCoords = await coords.save();
      location.coords = savedCoords;
    }
    
    location.name = req.body.name;
    location.isDisabled = req.body.isDisabled;
    
    const saved = await location.save();
    return res.status(200).send(saved);

  } catch(e) {
    logger.err(e);
    return res.status(500).send(e);
  }
};