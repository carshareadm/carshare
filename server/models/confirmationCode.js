/**
 * Project       - ShaCar
 * Team          - Group 3 Carshare
 * Last Modified - 2018/05/26
 * Authors
 *               - Paul Crow
 */
import mongoose from "mongoose";
const Schema = mongoose.Schema;

const confirmationCodeSchema = new Schema({
  code: { type: "String", required: true, trim: true },
  codeType: { type: "String", required: true, enum: ["Register", "AccountUpdate"] },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  expiresAt: { type: "Date", required: true },
});

module.exports = mongoose.model("ConfirmationCode", confirmationCodeSchema);