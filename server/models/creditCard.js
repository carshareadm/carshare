import mongoose from 'mongoose';
import * as crypto from 'crypto';
import config from '../config';

const Schema = mongoose.Schema;

const creditCardSchema = new Schema({
  cardNumber: { type: 'String', required: true, trim: true, select: false }, // encrypted pre-save
  lastFourDigits: { type: 'String', required: false, trim: true, minlength: 4, maxlength: 4 }, // set in code pre-save
  nameOnCard: { type: 'String', required: true, trim: true },
  expiryMonth: { type: 'Number', required: true, min: 1, max: 12 },
  expiryYear: { type: 'Number', required: true, min: 2018 },
  isDisabled: { type: "Boolean", required: true, default: false },
});

/**
 * encrypt a new credit card number before saving, and set the lastFourDigits field
 * so we can display something to user as a placeholder
 */
creditCardSchema.pre("save", function(next) {
  var cc = this;
  if (!cc.isModified("cardNumber")) {
    return next();
  }
  cc.lastFourDigits = cc.cardNumber.slice(-4);
  const encrypted = cc.encrypt(cc.cardNumber);
  cc.cardNumber = encrypted;
  return next();
});

/**
 * this method is called in pre save hook, no need to actaully invoke it in controller methods
 * @param {string} raw 
 */
creditCardSchema.methods.encrypt = (raw) => {
  var cipher = crypto.createCipher(config.crypto.algorithm, config.crypto.secret);
  var crypted = cipher.update(raw, 'utf-8', 'hex');
  crypted += cipher.final('hex');

  return crypted;
};

/**
 * call this to decrypt cc number so payment can be processed
 * @param {string} encrypted 
 */
creditCardSchema.methods.decrypt = (encrypted) => {
  var decipher = crypto.createDecipher(config.crypto.algorithm, config.crypto.secret);
  var decrypted = decipher.update(encrypted, 'hex', 'utf-8');
  decrypted += decipher.final('utf-8');

  return decrypted;
}

module.exports = mongoose.model('CreditCard', creditCardSchema);