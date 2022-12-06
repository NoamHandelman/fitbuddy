import express from 'express';
const router = express.Router();

import {
  deleteUser,
  editUser,
  login,
  register,
} from '../controllers/authController.js';

router.route('/register').post(register);
router.route('/login').post(login);
router.route('/:id').patch(editUser).delete(deleteUser);

export default router;
