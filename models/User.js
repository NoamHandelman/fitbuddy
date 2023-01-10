import mongoose from 'mongoose';
const { Schema } = mongoose;

import validator from 'validator';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import Post from './Post.js';

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

UserSchema.pre('remove', async function (next) {
  try {
    await Post.deleteMany({ user: this._id });
  } catch (error) {
    next(error);
  }
});

UserSchema.methods.comparePassword = async function (password) {
  const isValidPassword = await bcrypt.compare(password, this.password);
  return isValidPassword;
};

UserSchema.methods.createJWT = function () {
  return jwt.sign({ userID: this._id }, process.env.ACCESS_JWT_SECRET, {
    expiresIn: process.env.ACCESS_JWT_SECRET_LIFETIME,
  });
};

export default mongoose.model('User', UserSchema);
