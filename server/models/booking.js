import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const bookingSchema = new Schema({
  unlockCode: { type: 'String', required: true, trim: true },
  startsAt: { type: 'Date', required: true },
  endsAt: { type: 'Date', required: true },
  lastAccessAt: { type: 'Date' },
  car: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Car',
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  damage: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Damage',
  }],
  disabled: { type: "Boolean", required: true, default: false },
});

module.exports = mongoose.model('Booking', bookingSchema);