//External dependencies
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');

//Internal dependencies
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/usersRouter');
const todosRouter = require('./routes/todosRouter');
const { handleErrors, wrongPath400 } = require('./middleware/error');

//Initialization
const app = express();

//Initialize mongoose
mongoose
  .connect('mongodb://127.0.0.1:27017/to-do-app', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .catch((err) => console.log(err));

mongoose.connection.on('open', () => console.log('MongoDB is running'));
mongoose.connection.on('error', (err) => console.error(err));

//Middleware
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//Routes
app.use('/', indexRouter);
app.use('/api/v1/users', usersRouter);
app.use('/api/v1/todos', todosRouter);

//wrong path error middleware
app.use(wrongPath400);

//Error handling
app.use(handleErrors);

module.exports = app;
