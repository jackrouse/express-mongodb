var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var apiRouter = require('./routes/api');
var heroRouter = require('./routes/hero');

var mongoose = require("mongoose");

mongoose.connect('mongodb://aibing:aibing123@124.156.105.122:27017/test?authSource=admin',{ useNewUrlParser: true, useUnifiedTopology: true,});
mongoose.Promise = global.Promise;
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB 连接错误：'));
db.on('connected', console.log.bind(console, 'MongoDB 连接成功：'));
db.on('disconnected', console.warn.bind(console, 'MongoDB 断开连接：'));

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/api', apiRouter);
app.use('/hero', heroRouter);

module.exports = app;
