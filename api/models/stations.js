//Import the mongoose module
var mongoose = require('mongoose');
require('dotenv').config({ path: '../.env' })

//Set up default mongoose connection
var mongoDB = `mongodb://${process.env.STATION_DB_USER}:${process.env.STATION_DB_PASSWORD}@mongo:27017/${process.env.STATION_DB}`;
mongoose.connect(mongoDB, { useNewUrlParser: true })
   .then(() =>  console.log('connection successful'))
   .catch((err) => console.error(err));

var Schema = mongoose.Schema;

var StationSchema = new Schema({
  stationId: String,
  stationName: String,
  lat: Number,
  lon: Number,
  spacesAvailable: Number,
  trends: Array,
  comments: [
    {
      body: String,
      createdDate: Date
    }
  ],
  lastUpdateDate: Date,
  date: Date
});

var Station = mongoose.model('station', StationSchema);

module.exports = Station;