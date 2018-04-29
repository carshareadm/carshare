import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const imageSchema = new Schema({
  filename: { type: 'String', required: true, unique: true, trim: true },
  isPublic: { type: 'Boolean', required: true, default: false },
});

imageSchema.virtual('publicUrl').get(function() {
  return this.isPublic
  ? `https://s3.us-east-2.amazonaws.com/carshare-public/${this.filename}`
  : '';
});

imageSchema.set('toObject', { virtuals: true });

module.exports = mongoose.model('Image', imageSchema);