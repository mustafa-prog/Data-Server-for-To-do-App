const express = require('express');
const router = express.Router();

const validator = require('../middleware/validator');
const userValidationRules = require('../utils/validation/userValidationRules');
const authorizeToken = require('../middleware/tokenAuth');
const authorizeAdmin = require('../middleware/adminAuth');
const authorizeUser = require('../middleware/userAuth');
const {
  getUsers,
  addUser,
  getUser,
  updateUser,
  deleteUser,
  loginUser,
} = require('../controller/usersController');

router.route('/').get(authorizeToken, authorizeAdmin, getUsers);

router.route('/signup').post(validator(userValidationRules), addUser);

router.route('/login').post(loginUser);

router
  .route('/:id')
  .get(authorizeToken, authorizeUser, getUser)
  .put(
    authorizeToken,
    authorizeUser,
    validator(userValidationRules),
    updateUser
  )
  .delete(authorizeToken, authorizeUser, deleteUser);

module.exports = router;
