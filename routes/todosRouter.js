const express = require('express');
const router = express.Router();

const validator = require('../middleware/validator');
const todoValidationRules = require('../utils/validation/todoValidationRules');

const {
  getTodos,
  addTodo,
  getTodo,
  updateTodo,
  deleteTodo,
} = require('../controller/todosController');
const authorizeToken = require('../middleware/tokenAuth');
const authorizeAdmin = require('../middleware/adminAuth');
const authorizeUser = require('../middleware/userAuth');

router
  .route('/')
  .get(authorizeToken, getTodos)
  .post(authorizeToken, validator(todoValidationRules), addTodo);

router
  .route('/:id')
  .get(authorizeToken, authorizeUser, getTodo)
  .put(
    authorizeToken,
    authorizeAdmin,
    validator(todoValidationRules),
    updateTodo
  )
  .delete(authorizeToken, authorizeAdmin, deleteTodo);

module.exports = router;
