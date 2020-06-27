var express = require('express');
var app = express();
var mongoose = require('mongoose');
var config = require('./config');
var stationsController = require('./controllers/stationsController');

var port = process.env.PORT || 3000;

mongoose.connect(config.getDbConnectionString());
stationsController(app);

app.listen(port);