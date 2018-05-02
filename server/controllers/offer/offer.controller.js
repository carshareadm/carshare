import Offer from "../../models/offer";

import moment from "moment";

const validateOffer = function(req, res) {
  if (typeof req.body.code === "undefined") {
    //Bad Request if not all fields are present
    return res.status(400).send("invalid request params");
  }

  Offer.findOne({ offerCode: req.body.code}, { isDisabled: false }).exec((offerErr, discount) => {
      if (offerErr) {
        res.status(500).send(err);
      } else if (discount) {
        if(moment(discount.expiresAt).isAfter(moment()))
          res.status(200).send(discount);
        else
        {
          // 404 Not found if code is expired
          // Same status as no code in db to prevent guessing
          res.status(404).send();
        }
      } else {
        res.status(404).send();
      }
    });
};

module.exports = {
  validateOffer: validateOffer,
};
