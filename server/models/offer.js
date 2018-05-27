/**
 * Project       - ShaCar
 * Team          - Group 3 Carshare
 * Last Modified - 2018/05/26
 * Authors
 *               - Tianqi Chen
 */
import mongoose from "mongoose";
const Schema = mongoose.Schema;

const offerSchema = new Schema({
  offerCode: { type: "String", required: true, unique: true, trim: true },
  // Multiplier for % off
  multiplier: { type: mongoose.Schema.Types.Number},
  // oneOffValue for $ off
  oneOffValue: { type: mongoose.Schema.Types.Number},
  isDisabled: { type: "Boolean", required: true, default: false },
  expiresAt: { type: "Date", required: true },
});

module.exports = mongoose.model("Offer", offerSchema);