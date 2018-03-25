import mongoose from "mongoose";
const Schema = mongoose.Schema;

const movementSchema = new Schema({
  car: { 
    type: mongoose.Schema.Types.ObjectId,
    ref: "Car",
    required: true,
  },
  coordinates: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Coordinate",
    required: true,
  },
  timestamp: { type: mongoose.Schema.Types.Date, default: Date.now },
});

module.exports = mongoose.model("Movement", movementSchema);