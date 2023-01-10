import mongoose from 'mongoose';
const { Schema } = mongoose;

const ProfileSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Please provide user for this profile!'],
  },
  bio: {
    type: String,
    trim: true,
  },
  profession: {
    type: String,
    trim: true,
  },
  education: {
    type: String,
    trim: true,
  },
  birthDate: {
    type: Date,
  },
  location: String,
  sport: {
    type: String,
    enum: ['aerobic', 'bodybuilding', 'powerlifting', 'crossfit', 'general'],
    default: 'general',
  },
  socialNetworks: {
    facebook: {
      type: String,
    },
    instagram: {
      type: String,
    },
    youtube: {
      type: String,
    },
    twitter: {
      type: String,
    },
  },
});

export default mongoose.model('Profile', ProfileSchema);
