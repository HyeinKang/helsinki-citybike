var mongoose = require('../model');

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