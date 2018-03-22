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
});

export default mongoose.model("Address", addressSchema);
