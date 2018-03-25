import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const imageSchema = new Schema({
  fileHandle: { type: 'String', required: true, unique: true, trim: true },
  extension: { type: 'String', required: true, trim: true },
});

module.exports = mongoose.model('Image', imageSchema);