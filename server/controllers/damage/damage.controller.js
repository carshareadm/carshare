import Damage from '../../models/damage';
import Booking from '../../models/booking';
import mongoose from 'mongoose';

const s3Helper = require('../../util/aws.helper');

const createDamage = function(req, res){
  Booking.findOne(mongoose.Types.ObjectId(req.params.booking))
  .exec((err, booking) => {
    if (err) {
        return res.status(500).send(err);
      }
    let newDamage = new Damage({
      description: req.body.description,
      loggedAt: new Date(),
      booking: booking._id,
      car: booking.car,
    });
    if(req.body.image){
      newDamage.image = req.body.image
    }
    newDamage
      .save()
      .then((damage) => {
        res.status(200).send(damage)
      })
      .catch((err) => {
          res.status(500).send(err)
      })
    })
}

const showDamage = function(req, res){
  const filter = {
    'isDisabled': false, // damages that arent disabled
    'car': mongoose.Types.ObjectId(req.params.carId),
  };
  Damage.find(filter)
    .sort({ loggedAt: -1 })
    .populate('image')
    .populate('booking')
    .populate('car')
    .exec((err, damages) => {
      if (err) {
        res.status(500).send(err);
      } else {
        const dmg = damages.map((d) => {
          if(d.image){
            d.imageUrl = s3Helper.getDownloadSignedUrl(d.image.filename);
          }
          return d;
        })
        res.status(200).send(dmg);
      }
    });
}

module.exports = {
  createDamage: createDamage,
  showDamage: showDamage,
}
