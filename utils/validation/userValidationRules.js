const { body } = require('express-validator');

module.exports = [
  body('userName')
    .trim()
    .escape()
    .optional()
    .isLength({ min: 2, max: 30 })
    .withMessage(
      'UserName must have minimum 2 characters maximum 30 characters'
    ),

  body('email')
    .isEmail()
    .withMessage('Invalid email')
    .optional()
    .normalizeEmail()
    .trim(),

  body('password')
    .optional()
    .trim()
    .matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/)
    .withMessage(
      'Minimum eight characters, at least one upper case letter, one lower case letter, one number and one special character'
    ),
];
