import Damage from '../../models/damage';
import Booking from '../../models/booking';
import mongoose from 'mongoose';

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
      image: req.body.image,
    });
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
  };
  Damage.find(filter)
    .populate('booking')
    .populate('car')
    .exec((err, damages) => {
      if (err) {
        res.status(500).send(err);
      } else {
        const filtered = damages.filter(f => f.car !== null);
        res.status(200).send(filtered);
      }
    });
}

module.exports = {
  createDamage: createDamage,
  showDamage: showDamage,
}
