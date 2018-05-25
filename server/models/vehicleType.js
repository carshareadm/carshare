/**
 * Project       - ShaCar
 * Team          - Group 3 Carshare
 * Last Modified - 2018/05/26
 * Authors
 *               - Paul Crow
 */
import mongoose from "mongoose";
const Schema = mongoose.Schema;

const vehicleTypeSchema = new Schema({
  name: { type: "String", required: true, unique: true, trim: true },
  hourlyRate: { type: "Number", required: true },
});

module.exports = mongoose.model("VehicleType", vehicleTypeSchema);