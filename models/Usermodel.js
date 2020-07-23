const { Schema, model } = require('mongoose');
const { generateHash, check } = require('../utils/encryption');
const { sign, verify } = require('jsonwebtoken');

const UserSchema = new Schema(
  {
    userName: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ['user', 'admin'],
      default: 'user',
    },
  },
  {
    toJSON: {
      virtuals: true,
    },
    toObject: {
      virtuals: true,
    },
  }
);

UserSchema.virtual('todos', {
  ref: 'Todo',
  localField: '_id',
  foreignField: 'user',
});

UserSchema.method('toJSON', function () {
  return {
    userName: this.userName,
    email: this.email,
    _id: this._id,
    todos: this.todos,
  };
});

UserSchema.pre('save', async function (next) {
  //We do not this line of code unless we do not change our controller.
  if (!this.isModified('password')) return next();
  this.password = await generateHash(this.password);
  next();
});

UserSchema.pre('findOneAndUpdate', async function (next) {
  //here 'this' is query not document.
  if (!this._update.hasOwnProperty('password')) return next();
  this._update.password = await generateHash(this._update.password);
  next();
});

UserSchema.method('authenticate', async function (loginPassword) {
  return await check(loginPassword, this.password);
});

const secret = 'gdrfgdghdfkhdfjj54epi3456kdgfdfg';

UserSchema.method('createToken', async function () {
  const token = await sign({ _id: this._id }, secret);
  return token;
});

UserSchema.static('findByIdInsideToken', async function (token) {
  let payload;
  try {
    payload = await verify(token, tokenSecret);
  } catch (error) {
    return null;
  }
  const loggedUser = await this.findOne({ _id: payload._id });
  return loggedUser;
});

module.exports = model('User', UserSchema);
