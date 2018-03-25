import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const licenseSchema = new Schema({
  licenseNumber: { type: 'String', required: true, trim: true },
  image: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Image',
    required: true,
  },
});

module.exports = mongoose.model('License', licenseSchema);