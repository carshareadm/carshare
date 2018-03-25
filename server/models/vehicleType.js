import mongoose from "mongoose";
const Schema = mongoose.Schema;

const vehicleTypeSchema = new Schema({
  name: { type: "String", required: true, unique: true, trim: true },
  hourlyRate: { type: "Number", required: true },
});

module.exports = mongoose.model("VehicleType", vehicleTypeSchema);