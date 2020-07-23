const Todo = require('../models/Todomodel');
const createError = require('http-errors');
const mongoose = require('mongoose');

exports.getTodos = async (req, res, next) => {
  try {
    const todos = await Todo.find();
    res.status(200).send(todos);
  } catch (error) {
    next(error);
  }
};

exports.addTodo = async (req, res, next) => {
  try {
    const newTodo = new Todo(req.body);
    await newTodo.save();
    res.status(201).send(newTodo);
  } catch (error) {
    next(error);
  }
};

exports.getTodo = async (req, res, next) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id))
      throw new createError.NotFound();
    const todo = await Todo.findById(req.params.id);
    if (!todo) throw new createError.NotFound();
    res.status(200).send(todo);
  } catch (error) {
    next(error);
  }
};

exports.updateTodo = async (req, res, next) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id))
      throw new createError.NotFound();
    const updatedTodo = await Todo.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    console.log(updatedTodo);
    if (!updatedTodo) throw new createError.NotFound();
    res.status(200).send(updatedTodo);
  } catch (error) {
    next(error);
  }
};

exports.deleteTodo = async (req, res, next) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id))
      throw new createError.NotFound();
    const deletedTodo = await Todo.findOneAndRemove(req.params.id);
    if (!deletedTodo) throw new createError.NotFound();
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};
