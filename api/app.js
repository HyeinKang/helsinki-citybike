var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var stationsRouter = require('./routes/stations');
var trendsRouter = require('./routes/trends');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/stations', stationsRouter);
app.use('/trends', trendsRouter);

module.exports = app;
