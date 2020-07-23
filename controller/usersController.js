const User = require('../models/Usermodel');
const createError = require('http-errors');
const mongoose = require('mongoose');

exports.getUsers = async (req, res, next) => {
  try {
    const users = await User.find().populate(
      'todos',
      '-_id -user done dueDate category text'
    );
    res.status(200).send(users);
  } catch (error) {
    next(error);
  }
};

exports.addUser = async (req, res, next) => {
  try {
    const newUser = new User({ ...req.body, role: 'user' });
    await newUser.save();
    res.status(201).send(newUser);
  } catch (error) {
    next(error);
  }
};

exports.getUser = async (req, res, next) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id))
      throw new createError.NotFound();
    const user = await User.findById(req.params.id).populate(
      'todos',
      '-_id -user done dueDate category text'
    );
    if (!user) throw new createError.NotFound();
    res.status(200).send(user);
  } catch (error) {
    next(error);
  }
};
exports.updateUser = async (req, res, next) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id))
      throw new createError.NotFound();
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { ...req.body, role: 'user' },
      {
        new: true,
        runValidators: true,
      }
    );
    if (!updatedUser) throw new createError.NotFound();
    res.status(200).send(updatedUser);
  } catch (error) {
    next(error);
  }
};
exports.deleteUser = async (req, res, next) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id))
      throw new createError.NotFound();
    const deletedUser = await User.findOneAndRemove(req.params.id);
    if (!deletedUser) throw new createError.NotFound();
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};

exports.loginUser = async (req, res, next) => {
  try {
    const loginUser = await User.findOne({ email: req.body.email });
    if (!loginUser) throw new createError.Unauthorized();
    const isAuthenticated = await loginUser.authenticate(req.body.password);
    if (!isAuthenticated) throw new createError.Unauthorized();
    const token = await loginUser.createToken();
    res.header('X-Auth-Token', token).status(200).send(loginUser);
  } catch (error) {
    next(error);
  }
};
