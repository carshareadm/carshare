import Damage from '../../models/damageReport';
import mongoose from 'mongoose';

const createDamage = function(req, res){
  let newDamage = new Damage({
    description: req.body.description,
    loggedAt: req.body.loggedAt,
    booking: mongoose.Types.ObjectId(req.params.booking)
  });

  newDamage
    .save()
    .then((damage) => {
      res.status(200).send(damage)
    })
    .catch((err) => {
      if (err.name === 'ValidationError'){
        res.status(400).send(err);
      } else {
        res.status(500).send(err)
      }
    })
}

const showDamage = function(req, res){
  const filter = {
    'disabled': false, // damages that arent disabled
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
  showDamage: showDamage
}
