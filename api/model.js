//Import the mongoose module
var mongoose = require('mongoose');
require('dotenv').config({ path: '../.env' })

//Set up default mongoose connection
var mongoDB = `mongodb://${process.env.MONGO_DB_USER}:${process.env.MONGO_DB_PASSWORD}@mongo:27017/${process.env.MONGO_DB}`;
console.log('mongoDB: ', mongoDB);
mongoose.connect(mongoDB, { useNewUrlParser: true })
   .then(() =>  console.log('connection successful'))
   .catch((err) => console.error(err));;

//Get the default connection
var db = mongoose.connection;

module.exports = db;