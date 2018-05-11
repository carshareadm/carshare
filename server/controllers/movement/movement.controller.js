import Coordinate from '../../models/coordinate';
import Movement from '../../models/movement';
import mongoose from 'mongoose';

import {checkLocationBookingEnd} from "../../util/email.helper"
import * as logger from "../../util/logger"


// create movement from the frontend request. 
// Would be replace by the creation from the tracking device
const createMovement = async function(req, res){
  let newCoordinate = new Coordinate({
    latitude: req.body.latitude,
    longitude: req.body.longitude,
  });
  try {
    const savedCoord = await newCoordinate.save();
    const newMovement = new Movement({
      car: mongoose.Types.ObjectId(req.body.car),
      coordinates: newCoordinate._id,
      timestamp: new Date(),
    });

    const savedMovement = await newMovement.save();

    // Post saving check the car location and the movement location
    await checkLocationBookingEnd(savedMovement);

    return res.status(200).send(savedMovement);
  }
  catch(e) {
    logger.err(e);
    return res.status(500).send(e);
  }
}

module.exports = {
  createMovement: createMovement,
}