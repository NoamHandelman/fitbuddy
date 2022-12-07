import User from '../models/User.js';
import Post from '../models/Post.js';
import {
  BadRequestError,
  UnauthenticatedError,
  UnauthorizedError,
} from '../customErrors/index.js';

const register = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
      throw new BadRequestError('Please provide all values!');
    }

    const userExist = await User.findOne({ email });
    if (userExist) {
      throw new BadRequestError('User with this email is already exists!');
    }

    const user = await User.create({ username, email, password });
    const token = user.createJWT();

    user.password = undefined;
    res.status(201).json({ user, token });
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      throw new BadRequestError('Please provide all values!');
    }

    const user = await User.findOne({ email });
    if (!user) {
      throw new UnauthenticatedError(
        'User not found, please check your details!'
      );
    }

    const isValidPassword = await user.comparePassword(password);
    if (!isValidPassword) {
      throw new UnauthenticatedError(
        'User not found, please check your details!'
      );
    }

    const token = user.createJWT();
    user.password = undefined;
    res.status(200).json({ user, token });
  } catch (error) {
    next(error);
  }
};

const editUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      throw new BadRequestError('Please provide all values');
    }
    const user = await User.findOne({ _id: req.userID });
    if (!user) {
      throw new UnauthorizedError(
        'You are not authorized to perform this action'
      );
    }

    user.email = email;
    user.password = password;
    const token = user.createJWT();
    await user.save();
    res.status(200).json({ user, token });
  } catch (error) {
    next(error);
  }
};

const deleteUser = async (req, res, next) => {
  try {
    const user = await User.findOne({ _id: req.userID });
    if (!user) {
      throw new UnauthorizedError(
        'You are not authorized to perform this action'
      );
    }
    await Post.deleteMany({ user: req.userID });
    await user.remove();
    res.status(200).send({ message: 'User successfully deleted!' });
  } catch (error) {
    next(error);
  }
};

export { register, login, editUser, deleteUser };
