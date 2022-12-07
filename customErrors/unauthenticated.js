export class UnauthenticatedError extends Error {
    constructor(message) {
      super(message);
      this.status = 401;
    }
  }
  