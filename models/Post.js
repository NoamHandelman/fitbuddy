import mongoose from 'mongoose';
const { Schema } = mongoose;

const PostSchema = new Schema(
  {
    user: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
      required: [true, 'Please provide user'],
    },
    post: {
      type: String,
      required: [true, 'Please provide text for the post!'],
      trim: true,
    },
    likes: [
      {
        user: {
          type: mongoose.Types.ObjectId,
          ref: 'User',
          required: [true, 'Please provide user'],
        },
        default: [],
      },
    ],
    // comments: [
    //   {
    //     user: {
    //       type: mongoose.Types.ObjectId,
    //       ref: 'User',
    //       required: [true, 'Please provide user'],
    //     },
    //     comment: {
    //       type: String,
    //       required: [true, 'Please provide text for your comment'],
    //     },
        
    //   },
    // ],
  },
  { timestamps: true }
);

export default mongoose.model('Post', PostSchema);
