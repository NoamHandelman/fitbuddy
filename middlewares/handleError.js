export const handleError = (err, req, res, next) => {
  const defaultError = {
    status: err.status || 500,
    message: err.message || 'Something happened ...',
  };

  res.status(defaultError.status).send({ message: defaultError.message });
};
