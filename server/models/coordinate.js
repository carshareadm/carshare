import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const coordinateSchema = new Schema({
  latitude: { 
    type: 'String',
    required: true,
    trim: true,
    validate: {
      validator: function(v) {
        if (isNaN(v)) {
          return false;
        }
        const lat = parseFloat(v);
        return lat >= -90 && lat <= 90;
      },
      message: '{VALUE} is not a valid latitude',
    },
  },
  longitude: {  
    type: 'String',
    required: true,
    trim: true,
    validate: {
      validator: function(v) {
        if (isNaN(v)) {
          return false;
        }
        const lng = parseFloat(v);
        return lng >= -180 && lng <= 180;
      },
      message: '{VALUE} is not a valid longitude',
    },
  },
});

module.exports = mongoose.model('Coordinate', coordinateSchema);