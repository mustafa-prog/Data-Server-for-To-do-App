const createError = require('http-errors');

const authorizeAdmin = async (req, res, next) => {
  try {
    if (req.loggedUser.role !== 'admin') throw new createError.Unauthorized();
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = authorizeAdmin;
