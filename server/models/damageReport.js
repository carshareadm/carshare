import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const damageReportSchema = new Schema({
  description: { type: 'String', required: true, trim: true },
  loggedAt: { type: 'Date', default: Date.now },
  booking: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Booking',
    required: true,
  },
  images: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Image',
  }],
});

export default mongoose.model('DamageReport', damageReportSchema);