import jwt from 'jsonwebtoken';
import {
  UnauthenticatedError,
  UnauthorizedError,
} from '../customErrors/index.js';

export const authenticateUserByToken = async (req, res, next) => {
    console.log('You hit JWT Middleware');
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    throw new UnauthenticatedError(
      'You are not authorized to perform this action'
    );
  }
  const token = authHeader.split(' ')[1];
  try {
    const payload = jwt.verify(token, process.env.ACCESS_JWT_SECRET);
    console.log(payload);
    const { userID } = payload;
    req.userID = userID;
    next();
  } catch (error) {
    throw new UnauthorizedError(
      'You are not authorized to perform this action'
    );
  }
};
