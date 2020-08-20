var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var stationsRouter = require('./routes/stations');
var trendsRouter = require('./routes/trends');

var app = express();

var mongoHost = process.env.MONGO_DB_HOST;
console.log('mongoHost: ', mongoHost);

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/stations', stationsRouter);
app.use('/api/trends', trendsRouter);

app.get('/api/test', function(req, res){
  res.json({'averageBikesByHour': 'roar'});
});

module.exports = app;
