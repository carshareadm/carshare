/**
 * Project       - ShaCar
 * Team          - Group 3 Carshare
 * Last Modified - 2018/05/26
 * Authors
 *               - Paul Crow
 */
const isAdminGuard = function (req, res, next) {
  if (!req.isAdmin || req.isAdmin === false) {
    return res.status(403).send({ error: 'Requires Admin privileges' });
  }
  next();
};

module.exports = isAdminGuard;