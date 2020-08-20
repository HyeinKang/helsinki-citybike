var express = require('express');
var app = express();
var mongoose = require('mongoose');
var config = require('./config');
var trendsController = require('./controllers/trendsController');

var port = process.env.PORT || 3001;

mongoose.connect(config.getDbConnectionString());
trendsController(app);

app.listen(port);