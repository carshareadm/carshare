/**
 * Project       - ShaCar
 * Team          - Group 3 Carshare
 * Last Modified - 2018/05/26
 * Authors
 *               - Paul Crow
 *               - Jason Koh
 */
import Users from '../../models/user';
import * as logger from '../../util/logger';
import * as email from '../../util/email.helper';

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

    const wasUnapproved = !user.license.approvedByAdmin;

    user.email = req.body.email;
    user.mobile = req.body.mobile;
    user.isDisabled = req.body.isDisabled;

    user.license.licenseNumber = req.body.license.licenseNumber;
    user.license.approvedByAdmin = req.body.license.approvedByAdmin;

    const savedLicense = await user.license.save();
    user.license = savedLicense;

    const saved = await user.save();

    if (wasUnapproved && savedLicense.approvedByAdmin) {
      try {
        await email.sendLicImageApprovedEmail(saved);
      } catch (e) {
        logger.err(e);
      }
    }

    return res.status(200).send(saved);

  } catch(e) {
    logger.err(e);
    return res.status(500).send(e);
  }
};

export const stats = async (req, res) => {
  try {
    const totalUsers = await Users.find({})
      .populate('license')
      .exec();
    const inactive = totalUsers.filter(f => f.isDisabled === true);
    const admin = totalUsers.filter(f => f.isAdmin === true);
    const pendingLicense = totalUsers.filter(f => f.license && f.license.image && f.license.approvedByAdmin === false);

    const results = {
      total: totalUsers.length,
      inactive: inactive.length,
      nonAdmin: totalUsers.length - admin.length,
      pendingApproval: pendingLicense.length,
    }

    return res.status(200).send(results);
  }
  catch(e) {
    logger.err(e);
    return res.status(500).send(e);
  }
};
