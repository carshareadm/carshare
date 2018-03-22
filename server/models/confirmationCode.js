import mongoose from "mongoose";
const Schema = mongoose.Schema;

const confirmationCodeSchema = new Schema({
  code: { type: "String", required: true, trim: true },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  expiresAt: { type: "Date", required: true },
});

export default mongoose.model("ConfirmationCode", confirmationCodeSchema);