import User from '../models/User.js';

const register = async (req, res, next) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    //throw error
    console.log('Please provide all values');
  }

  const userExist = await User.findOne({ email });
  if (userExist) {
    //throw error
    console.log('User with this email exist');
  }

  const user = await User.create({ username, email, password });

  res.status(201).json({
    user: {
      username,
      email,
    },
  });
};

const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    console.log('Please provide all values');
    //throw error
  }

  const user = await User.findOne({ email });
  if (!user) {
    console.log('User not found, please check your details');
    //throw error
  }

  const isValidPassword = await user.comparePassword(password);
  console.log(isValidPassword);

  if (!isValidPassword) {
    console.log('User not found, please check your details');
    //throw error
  }

  user.password = undefined;
  res.status(200).json({ user });
};

const editUser = (req, res) => {
  res.send('editUser');
};

const deleteUser = (req, res) => {
  res.send('deleteUser');
};

export { register, login, editUser, deleteUser };
