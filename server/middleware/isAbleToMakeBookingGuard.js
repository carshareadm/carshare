/**
 * Project       - ShaCar
 * Team          - Group 3 Carshare
 * Last Modified - 2018/05/26
 * Authors
 *               - Paul Crow
 */
const User = require('../models/user');

const isAbleToMakeBookingGuard = async (req, res, next) => {
  
  if (req.isAdmin === true) {
    next();
  } else {
    // check if the user exists and license is approved
    const user = await User.findById(req.userId)
        .populate('license')
        .exec();
    if (!user) {
      // technically isAuthenticatedGuard should already have run and taken care of this
      return res.status(401).send({error: 'No User'});
    } 
    if (!user.license) { 
      return res.status(401).send({error: 'No License'});
    }
    if (!user.license.image) { 
      return res.status(401).send({error: 'License photo not uploaded'});
    }
    if (user.license.isDisabled === true) { 
      return res.status(401).send({error: 'License disabled'});
    }
    if (user.license.approvedByAdmin === false) { 
      return res.status(401).send({error: 'License has not been approved yet'});
    }
  
    next();
  }
};

module.exports = isAbleToMakeBookingGuard;