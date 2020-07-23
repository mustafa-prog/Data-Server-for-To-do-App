const createError = require('http-errors');
const User = require('../models/Usermodel');

const authorizeToken = async (req, res, next) => {
  const token = req.header('X-Auth-Token');
  try {
    const loggedUser = await User.findByIdInsideToken(token);
    if (!loggedUser) throw new createError.Unauthorized();
    req.loggedUser = loggedUser;
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = authorizeToken;
