import Post from '../models/Post.js';
import {
  BadRequestError,
  UnauthenticatedError,
  UnauthorizedError,
} from '../customErrors/index.js';
import { checkPermissions } from '../utils/checkPermissions.js';

const addPost = async (req, res, next) => {
  try {
    const { post } = req.body;
    if (!post) {
      throw new BadRequestError('Please provide text to the post!');
    }
    const newPost = await Post.create({ post, user: req.user });
    res.status(201).json({ post: newPost });
  } catch (error) {
    next(error);
  }
};

const editPost = async (req, res, next) => {
  try {
    const { id } = req.params;
    const post = await Post.findOne({ _id: id });
    if (!post) {
      throw new BadRequestError('This post was not found!');
    }
    if (!req.body.post) {
      throw new BadRequestError('Post must have text!');
    }
    checkPermissions(req.user, post.user);
    post.post = req.body.post;
    await post.save();
    res.status(200).json({ post, message: 'Post edited successfully' });
  } catch (error) {
    next(error);
  }
};

const handleLike = async (req, res, next) => {
  res.send('handleLike');
};

const deletePost = async (req, res, next) => {
  try {
    const { id } = req.params;
    const post = await Post.findOne({ _id: id });
    if (!post) {
      throw new BadRequestError('This post was not found');
    }
    checkPermissions(req.user, post.user);
    await post.remove();
    res.status(200).json({ message: 'Successfully deleted post' });
  } catch (error) {
    next(error);
  }
};

const allPosts = async (req, res, next) => {
  try {
    const posts = await Post.find({});
    res.status(200).json({ posts });
  } catch (error) {
    next(error);
  }
};

export { addPost, editPost, handleLike, deletePost, allPosts };
