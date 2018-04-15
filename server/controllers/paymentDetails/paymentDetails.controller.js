import User from '../../models/user';
import CreditCard from '../../models/creditCard';

const getMyPaymentDetails = function(req, res) {
  User
    .findById(req.userId)
    .select('creditCard')
    .populate('creditCard')
    .then((user) => {
      if (user) {
        res.status(200).send(user);
      } else {
        res.status(404).send();
      }
    })
    .catch((err) => { res.status(500).send(err); });
}

const addPaymentDetails = function(req, res) {
  let newCard = new CreditCard(
    {
      cardNumber: req.body.cardNumber,
      nameOnCard: req.body.nameOnCard,
      ccv: req.body.ccv,
      expiryMonth: req.body.expiryMonth,
      expiryYear: req.body.expiryYear,
    }
  );

  // save creditCard then add to user profile asynchronously
  newCard
    .save()
    .then(
      (card) => {
        return User.findByIdAndUpdate(req.userId, { creditCard: card._id });
      })
    // finally, send response
    .then((user) => { res.status(200).send(user); })
    .catch((err) => {
      switch (err.name)
      {
        case 'ValidationError':
          res.status(400).send(err);
          console.log(err);
          break;
        case 'DocumentNotFoundError':
          res.status(404).send(err);
          break;
        default:
          res.status(500).send(err);
      }
    });
}

const updatePaymentDetails = function(req, res) {
  CreditCard
    .findByIdAndUpdate(
        req.body._id,
        {
          cardNumber: req.body.cardNumber,
          nameOnCard: req.body.nameOnCard,
          ccv: req.body.ccv,
          expiryMonth: req.body.expiryMonth,
          expiryYear: req.body.expiryYear,
        }
      )
    .then((user) => { res.status(200).send(user); })
    .catch((err) => {
      switch (err.name)
      {
        case 'ValidationError':
          res.status(400).send(err);
          break;
        case 'DocumentNotFoundError':
          res.status(404).send(err);
          break;
        default:
          res.status(500).send(err);
      }
    });
}

module.exports = {
  getMyPaymentDetails: getMyPaymentDetails,
  addPaymentDetails: addPaymentDetails,
  updatePaymentDetails: updatePaymentDetails,
};
