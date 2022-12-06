import mongoose from 'mongoose';
const { Schema } = mongoose;

const PostSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Please provide user!'],
    },
    post: {
      type: String,
      required: [true, 'Please provide text for the post!'],
      trim: true,
    },
    likes: {
      type: Number,
      required: [true, 'Please provide likes for the post!'],
    },
  },
  { timestamps: true }
);

export default mongoose.model('Post', PostSchema);
