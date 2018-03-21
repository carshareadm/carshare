import mongoose from "mongoose";
const Schema = mongoose.Schema;

const enquirySchema = new Schema({
  emailFrom: { type: "String", required: true, trim: true, lowercase: true },
  message: { type: "String", required: true, trim: true },
  response: { type: "String", trim: true },
  receivedAt: { type: "Date", default: Date.now, required: true },
  responseAt: { type: "Date" },
  priority: { type: "String", enum: ["low", "med", "high"] },
});

export default mongoose.model("Enquiry", enquirySchema);