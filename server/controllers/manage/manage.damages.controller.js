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
    res.status(200).send(dmg);
  } catch(e) {
    logger.err(e);
    return res.status(500).send(e);
  }
};


export const update = async (req, res) => {
  try {
    const damage = await Damage.findById(req.params.damageId).exec();
    console.log(damage);
    damage.isDisabled = true;
    await damage.save();
    return res.status(200).send(damage);
  } catch(e) {
    logger.err(e);
    return res.status(500).send(e);
  }
};