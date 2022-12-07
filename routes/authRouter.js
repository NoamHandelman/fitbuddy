import express from 'express';
const router = express.Router();

import { authenticateUserByToken } from '../middlewares/authenticateUser.js';

import {
  deleteUser,
  editUser,
  login,
  register,
} from '../controllers/authController.js';

router.route('/register').post(register);
router.route('/login').post(login);
router.route('/editUser').patch(authenticateUserByToken, editUser);
router.route('/deleteUser').delete(authenticateUserByToken, deleteUser);

export default router;
