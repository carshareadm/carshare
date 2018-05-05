import Users from '../../models/user';
import * as logger from '../../util/logger';


export const getAll = async (req, res) => {
  try {
    // license can be retrieved with image from license controller
    const users = await Users.find({ 'isAdmin': false})
      .populate('license')
      .exec();

      return res.status(200).send(users);
  } catch(e) {
    logger.err(e);
    return res.status(500).send(e);
  }
};

export const update = async (req, res) => {
  try {
    const user = await Users.findById(req.params.userId)
    .populate('license')
    .exec();
    
    if (user === null) {
      return res.status(404).send('User not found');
    }
    if (!user.license) {
      return res.status(500).send('User License not found');
    }
    
    user.email = req.body.email;
    user.mobile = req.body.mobile;    
    user.isDisabled = req.body.isDisabled;

    user.license.licenseNumber = req.body.license.licenseNumber;
    user.license.approvedByAdmin = req.body.license.approvedByAdmin;

    const savedLicense = await user.license.save();
    user.license = savedLicense;
    
    const saved = await user.save();
    return res.status(200).send(saved);

  } catch(e) {
    logger.err(e);
    return res.status(500).send(e);
  }
};