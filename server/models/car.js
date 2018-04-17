import mongoose from "mongoose";
const Schema = mongoose.Schema;

const carSchema = new Schema({
  rego: { type: "String", required: true, unique: true, trim: true },
  make: { type: "String", required: true, trim: true },
  model: { type: "String", required: true, trim: true },
  colour: { type: "String", required: true, trim: true },
  year: { type: "Number", required: true },
  seats: { type: "Number", required: true },
  doors: { type: "Number", required: true },
  vehicleType: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "VehicleType",
    required: true,
  },
  location: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Location",
    required: true,
  },
  movements: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Movement",
  }],
  disabled: { type: "Boolean", required: true, default: false },
});

module.exports = mongoose.model("Car", carSchema);