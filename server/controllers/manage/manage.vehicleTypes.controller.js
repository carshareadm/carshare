/**
 * Project       - ShaCar
 * Team          - Group 3 Carshare
 * Last Modified - 2018/05/26
 * Authors
 *               - Paul Crow
 */
import VehicleTypes from '../../models/vehicleType';
import * as logger from '../../util/logger';

export const getAll = async (req, res) => {
  try {
    const types = await VehicleTypes.find({}).exec();
    return res.status(200).send(types);
  } catch(e) {
    logger.err(e);
    return res.status(500).send(e);
  }

};