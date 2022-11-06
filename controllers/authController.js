const register = (req, res) => {
  //   res.send('register');
  res.status(200).json(req.body);
};

const login = (req, res) => {
  //   res.send('login');
  res.status(200).json(req.body);
};

const editUser = (req, res) => {
  res.send('editUser');
};

const deleteUser = (req, res) => {
  res.send('deleteUser');
};

export { register, login, editUser, deleteUser };
