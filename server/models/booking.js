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
  damages: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Damage',
  }],
  isDisabled: { type: "Boolean", required: true, default: false },
  totalCost: { type: mongoose.Schema.Types.Number},
  //To aid tracking what code was used with the booking
  offer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Offer',
  },
});


module.exports = mongoose.model('Booking', bookingSchema);