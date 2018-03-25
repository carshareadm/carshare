import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

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

// example of presave and compare password from 
// https://medium.com/@obrientimothya/make-an-api-with-node-js-mongodb-and-jwt-authentication-9da443a1f59b
// hash password pre save
userSchema.pre('save', function(next) {
  var user = this;
  if (!user.isModified('password')) {
    return next();
  }
  bcrypt.genSalt(10, function(err, salt) {
    bcrypt.hash(user.password, salt, function(err, hash) {
      user.password = hash;
      next();
    });
  });
});

// compare hashed password to plain text password
userSchema.methods.comparePassword = function(password, done) {
  bcrypt.compare(password, this.password, function(err, isMatch) {
    done(err, isMatch);
  });
};

module.exports = mongoose.model('User', userSchema);