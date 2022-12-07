import Post from '../models/Post.js';

const addPost = async (req, res) => {
  const { post, user } = req.body;
  if (!post) {
    return console.log('No post to show');
  }

  const newPost = await Post.create({ post, user });

  res.status(201).json({ post: newPost });
};

const editPost = async (req, res) => {
  res.send('editPost');
};

const deletePost = async (req, res) => {
  const { id } = req.params;
  const post = await Post.findOne({ _id: id });

  if (!post) {
    return console.log('delete fail');
  }
  post.remove();
  res.status(200).json({ message: 'Successfully deleted post' });
};

const allPosts = async (req, res) => {
  const posts = await Post.find({});
  res.status(200).json({ posts });
};

export { addPost, editPost, deletePost, allPosts };
