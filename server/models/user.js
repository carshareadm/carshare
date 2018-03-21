import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: { type: 'String', required: true, trim: true, unique: true, lowercase: true },
  mobile: { type: 'String', required: true, trim: true },
  password: { type: 'String', required: true, trim: true },
  isAdmin: { type: 'Boolean', required: true, default: false },
  license: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'License',
  },
  address: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Address',
  },
  creditCard: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'CreditCard',
  },
  confirmationCodes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'ConfirmationCode',
  }],
});

// TODO: auto hash password on set
export default mongoose.model('User', userSchema);