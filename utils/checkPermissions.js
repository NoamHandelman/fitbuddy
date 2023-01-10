import { UnauthorizedError } from '../customErrors/index.js';

export const checkPermissions = (currentUser, ownerUser) => {
  if (currentUser === ownerUser.toString()) return;
  throw new UnauthorizedError(
    'You do not have permission to perform this action'
  );
};
