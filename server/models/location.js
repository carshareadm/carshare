import mongoose from "mongoose";
const Schema = mongoose.Schema;

const locationSchema = new Schema({
  name: { type: "String", required: true, trim: true },
  coordinates: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Coordinate",
    required: true,
  },
});

module.exports = mongoose.model("Location", locationSchema);
