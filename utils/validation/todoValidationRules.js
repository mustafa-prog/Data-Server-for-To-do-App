const { body } = require('express-validator');

module.exports = [
  body('category').trim().escape().optional(),
  body('text')
    .optional()
    .trim()
    .isLength({ min: 2, max: 500 })
    .withMessage('Text must have minimum 2 characters maximum 500 characters'),
  body('done').optional().escape(),
  body('user').optional().trim().escape(),
];
