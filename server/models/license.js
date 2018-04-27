import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const licenseSchema = new Schema({
  licenseNumber: { type: 'String', required: true, trim: true },
  image: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Image',
  },
  isDisabled: { type: "Boolean", required: true, default: false },
  approvedByAdmin: { type: "Boolean", required: true, default: false },
});

module.exports = mongoose.model('License', licenseSchema);