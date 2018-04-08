import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const imageSchema = new Schema({
  filename: { type: 'String', required: true, unique: true, trim: true },
});

module.exports = mongoose.model('Image', imageSchema);