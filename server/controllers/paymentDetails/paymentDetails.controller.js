import User from '../../models/user';
import CreditCard from '../../models/creditCard';

const getMyPaymentDetails = function(req, res) {
  User.
  findById(req.userId)
    .select('creditCard')
    .populate('creditCard')
    .exec((err, user) => {
      if (err) {
        res.status(500).send(err);
      } else if (!user) {
        res.status(404).send();
      } else {
        res.status(200).send(user);
      }
    });
};

const changePaymentDetails = function(req, res) {
  let newCard = new CreditCard(
    {
      cardNumber: req.body.cardNumber,
      nameOnCard: req.body.nameOnCard,
      ccv: req.body.ccv,
      expiryyMonth: req.body.expiryMonth,
      expiryYear: req.body.expiryYear,
    }
  );

  let validateErrs = newCard.validateSync();
  if (validateErrs)
  {
    res.status(400).send(validateErrs);
    return;
  }

  // perform update asynchronously
  User
    .findById(req.userId)
    // get the old credit card
    .select('creditCard')
    // remove it
    .then((user) => { CreditCard.findByIdAndRemove(user.creditCard); })
    // save the new credit card
    .then(() => { newCard.save; })
    // update user's credit card field
    .then((card) => {
      User.findByIdAndUpdate(req.userId, { creditCard: card });
    })
    // finally, send response
    .then((user) => { res.status(200).send(user); })
    .catch((err) => { res.status(500).send(err); });

}

module.exports = {
  getMyPaymentDetails: getMyPaymentDetails,
  changePaymentDetails: changePaymentDetails,
};
