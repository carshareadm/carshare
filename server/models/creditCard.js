import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const creditCardSchema = new Schema({
  cardNumber: { type: 'String', required: true, trim: true },
  nameOnCard: { type: 'String', required: true, trim: true },
  ccv: { type: 'String', required: true, trim: true, minlength: 3 },
  expiryMonth: { type: 'Number', required: true, min: 1, max: 12 },
  expiryYear: { type: 'Number', required: true, min: 2018 },
});

module.exports = mongoose.model('CreditCard', creditCardSchema);