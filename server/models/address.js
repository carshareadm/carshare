/**
 * Project       - ShaCar
 * Team          - Group 3 Carshare
 * Last Modified - 2018/05/26
 * Authors
 *               - Paul Crow
 */
import mongoose from "mongoose";
const Schema = mongoose.Schema;

const addressSchema = new Schema({
  street1: { type: "String", required: true, trim: true },
  street2: { type: "String", trim: true },
  suburb: { type: "String", required: true, trim: true },
  state: {
    type: "String",
    required: true,
    trim: true,
    enum: ["ACT", "NSW", "NT", "QLD", "SA", "TAS", "VIC", "WA"],
  },
  postCode: { type: "String", required: true, trim: true },
  isDisabled: { type: "Boolean", required: true, default: false },
});

module.exports = mongoose.model("Address", addressSchema);
