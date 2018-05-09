import Offers from '../../models/offer';
import * as logger from '../../util/logger';

import moment from 'moment'

export const getAll = async (req, res) => {
  try {
    const offers = await Offers.find({})
      .exec();

      return res.status(200).send(offers);
  } catch(e) {
    logger.err(e);
    return res.status(500).send(e);
  }
};

export const update = async (req, res) => {
  try {
    const offer = await Offers.findById(req.params.offerId).exec();
    
    if (offer === null) {
      return res.status(404).send('Offer not found');
    }

    offer.expiresAt = moment(req.body.expiresAt);
    offer.offerCode = req.body.offerCode;
    offer.oneOffValue = req.body.oneOffValue;
    offer.multiplier = req.body.multiplier;
    offer.isDisabled = req.body.isDisabled;
    
    const saved = await offer.save();
    return res.status(200).send(saved);

  } catch(e) {
    logger.err(e);
    return res.status(500).send(e);
  }
};

export const add = async (req, res) => {
  try {
    const offer = new Offers();
    
    offer.expiresAt = req.body.expiresAt;
    offer.offerCode = req.body.offerCode;
    offer.oneOffValue = req.body.oneOffValue;
    offer.multiplier = req.body.multiplier;
    offer.isDisabled = req.body.isDisabled;
    
    const errs = offer.validateSync();
    if (errs) {
      return res.status(400).send(errs);
    }

    const saved = await offer.save();
    return res.status(200).send(saved);
  } catch(e) {
    const err = {...e};
    console.log(e);
    logger.err(e);
    return res.status(500).send(err);
  }
  
};