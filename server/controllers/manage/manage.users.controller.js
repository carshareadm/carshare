import Users from '../../models/user';
import logger from '../../util/logger';


export const getAll = async (req, res) => {
  try {
    const users = await Users.find({})
      .populate('license address creditCard confirmationCodes')
      .exec();

      return res.status(200).send(users);
  } catch(e) {
    logger.err(e);
    return res.status(500).semd(e);
  }
};

export const update = async (req, res) => {
  try {
    const user = await Users.findById(req.params.userId).exec();
    
    if (user === null) {
      return res.status(404).send('User not found');
    }
    
    user.email = req.body.email;
    user.mobile = req.body.mobile;
    user.password = req.body.password;
    /* Additional DB links
    user.license = req.body.license;
    user.address = req.body.address;
    user.creditCard = req.body.creditCard;
    user.confirmationCodes = req.confirmationCodes;
    */
    user.isAccountConfirmed = req.body.isAccountConfirmed;
    user.isAdmin = req.body.isAdmin;
    user.isDisabled = req.body.isDisabled;
    user.isBlockedByAdmin = req.body.isBlockedByAdmin;
    
    const saved = await user.save();
    return res.status(200).send(saved);

  } catch(e) {
    logger.err(e);
    return res.status(500).send(e);
  }
};