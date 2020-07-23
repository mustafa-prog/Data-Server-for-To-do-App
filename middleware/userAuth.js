const createError = require('http-errors');

const authorizeUser = (req, res, next) => {
  try {
    if (
      String(req.loggedUser._id) !== String(req.params.id) &&
      req.loggedUser.role !== 'admin'
    )
      throw new createError.Unauthorized();
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = authorizeUser;
