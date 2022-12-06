import express from 'express';
const router = express.Router();

import {
  addPost,
  editPost,
  deletePost,
  allPosts,
} from '../controllers/postController.js';

router.route('/addPost').post(addPost);
router.route('/allPosts').get(allPosts);
router.route('/:id').patch(editPost).delete(deletePost);

export default router;
