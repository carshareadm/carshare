import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const damageSchema = new Schema({
  description: { type: 'String', required: true, trim: true },
  loggedAt: { type: 'Date', default: Date.now },
  booking: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Booking',
    required: true,
  },
  car:
    { type: mongoose.Schema.Types.ObjectId, 
      ref: 'Car',
      required: true, 
    },
  image: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Image',
  },
  imageUrl: { type: 'String', trim: true },
  isDisabled: { type: "Boolean", required: true, default: false },
});

module.exports = mongoose.model('Damage', damageSchema);