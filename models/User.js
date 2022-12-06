import mongoose from 'mongoose';
const { Schema } = mongoose;

import validator from 'validator';
import bcrypt from 'bcryptjs';

const UserSchema = new Schema({
  username: {
    type: String,
    required: [true, 'We must know your name!'],
    maxLength: 20,
    trim: true,
  },
  email: {
    type: String,
    required: [true, 'We must know your email!'],
    validate: {
      validator: validator.isEmail,
      message: 'Please provide a valid email',
    },
    unique: [true, 'This email is already in used'],
  },
  password: {
    type: String,
    required: [true, 'Please provide password'],
    minlength: 6,
  },
});

UserSchema.pre('save', async function () {
  if (!this.isModified('password')) return;
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

UserSchema.methods.comparePassword = async function (password) {
  const isValidPassword = await bcrypt.compare(password, this.password);
  return isValidPassword;
};

export default mongoose.model('User', UserSchema);
