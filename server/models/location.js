/**
 * Project       - ShaCar
 * Team          - Group 3 Carshare
 * Last Modified - 2018/05/26
 * Authors
 *               - Paul Crow
 */
import mongoose from "mongoose";
const Schema = mongoose.Schema;

const locationSchema = new Schema({
  name: { type: "String", required: true, trim: true },
  coordinates: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Coordinate",
    required: true,
  },
  isDisabled: { type: "Boolean", required: true, default: false },
});

module.exports = mongoose.model("Location", locationSchema);
