import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const coordinateSchema = new Schema({
  latitude: { type: 'String', required: true, trim: true },
  longitude: { type: 'String', required: true, trim: true },
});

module.exports = mongoose.model('Coordinate', coordinateSchema);