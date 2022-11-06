import mongoose from 'mongoose';
const { Schema } = mongoose;

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
    unique: [true, 'This email is already in used'],
  },
  password: {
    type: String,
    required: [true, 'Please provide password'],
    minlength: 6,
  },
});

export default mongoose.model('User', UserSchema);
