/**
 * Project       - ShaCar
 * Team          - Group 3 Carshare
 * Last Modified - 2018/05/26
 * Authors
 *               - Paul Crow
 *               - Jason Koh
 */
import mongoose from "mongoose";
const Schema = mongoose.Schema;

const enquirySchema = new Schema({
  emailFrom: {
    type: "String",
    required: true,
    trim: true,
    lowercase: true,
    validate: {
      validator: function(v) {
        var re = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;
        return re.test(v);
      },
      message: "Email format is invalid",
    },
  },
  name: { type: "String", required: true, trim: true },
  message: { type: "String", required: true, trim: true },
  response: { type: "String", trim: true },
  receivedAt: { type: "Date", default: Date.now, required: true },
  responseAt: { type: "Date", default: null },
  priority: { type: "String", enum: ["low", "med", "high"] },
});

module.exports = mongoose.model("Enquiry", enquirySchema);
