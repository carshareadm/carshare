import Cars from '../../models/car';
import Damage from '../../models/damage';
import * as logger from '../../util/logger';
import mongoose from 'mongoose';

const s3Helper = require('../../util/aws.helper');

export const getAll = async (req, res) => {
  const filter = {}
  try {
  	if(req.query.carId){
  		filter.car = mongoose.Types.ObjectId(req.query.carId);
  	}
    const damages = await Damage.find(filter)
    .sort({ loggedAt: -1 })
    .populate('image')
    .populate('booking')
    .populate('car')
    .exec();
    
    const dmg = damages.map((d) => {
	    if(d.image){
	        d.imageUrl = s3Helper.getDownloadSignedUrl(d.image.filename);
	    }
      return d;
    })
    return res.status(200).send(dmg);
  } catch(e) {
    logger.err(e);
    return res.status(500).send(e);
  }
};


export const update = async (req, res) => {
  try {
    const damage = await Damage.findById(req.params.damageId).exec();
    damage.isDisabled = true;
    await damage.save();
    return res.status(200).send(damage);
  } catch(e) {
    logger.err(e);
    return res.status(500).send(e);
  }
};

export const stats = async (req, res) => {
  try {
    const totalDamage = await Damage.find({}).exec();
    const resolvedDamage = totalDamage.filter(f => f.isDisabled === true);
    const cars = await Cars.find({})
      .populate('damages')
      .exec();
    const carsUnresolved = cars.filter(f => f.damages && f.damages.some(s => s.isDisabled === false));
  
    const results = {
      allReported: totalDamage.length,
      resolved: resolvedDamage.length,
      outstanding: totalDamage.length - resolvedDamage.length,
      totalDamagedCars: cars.filter(f => f.damages && f.damages.length > 0).length,
      unresolvedDamagedCars: carsUnresolved.length,
    }

    return res.status(200).send(results);
  }
  catch(e) {
    logger.err(e);
    return res.status(500).send(e);
  }
};
