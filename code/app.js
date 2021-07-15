var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var targetRouter = require('./routes/targetRoute');
var communityRouter = require('./routes/communityRoute');
var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/targets', targetRouter);
app.use('/api/communities', communityRouter);


module.exports = app;