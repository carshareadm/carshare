/**
 * Project       - ShaCar
 * Team          - Group 3 Carshare
 * Last Modified - 2018/05/26
 * Authors
 *               - Paul Crow
 */
import {ObjectId} from 'mongoose';

const licenseGuard = (req, res, next) => {
  if(req.isAdmin) {
    next();
  }
  else {
    if(req.user.license.toString() !== req.params.id) {
      res.status(401).send();
    }
    else {
      next();
    }
  }
}; 

module.exports = licenseGuard;