var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var stationSchema = new Schema({
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

var Stations = mongoose.model('Stations', stationSchema);

module.exports = Stations;