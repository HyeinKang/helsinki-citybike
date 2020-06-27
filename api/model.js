//Import the mongoose module
var mongoose = require('mongoose');
require('dotenv').config({ path: '../.env' })

//Set up default mongoose connection
var mongoDB = `mongodb://${process.env.STATION_DB_USER}:${process.env.STATION_DB_PASSWORD}@mongo:27017/${process.env.STATION_DB}`;
mongoose.connect(mongoDB, { useNewUrlParser: true })
   .then(() =>  console.log('connection successful'))
   .catch((err) => console.error(err));

module.exports = mongoose;