const express = require('express');
const app = express();
const mongoose = require('mongoose');
const config = require('./config');
const trendsController = require('./controllers/trendsController');
const port = process.env.PORT || 3001;

mongoose.connect(config.getbikeTrendDB());
trendsController(app);

app.listen(port);