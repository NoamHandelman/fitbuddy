const addUserToLocalStorage = (user) => {
  localStorage.setItem('user', JSON.stringify(user));
};

const getUserFromLocalStorage = () => {
  const user = localStorage.getItem('user');
  return user ? JSON.parse(user) : null;
};

const removeUserFromLocalStorage = (user) => {
  localStorage.removeItem('user');
};

export {
  addUserToLocalStorage,
  getUserFromLocalStorage,
  removeUserFromLocalStorage,
};
