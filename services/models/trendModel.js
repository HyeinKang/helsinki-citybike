var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var trendSchema = new Schema({
  stationId: String,
  stationName: String,
  lat: Number,
  lon: Number,
  spacesAvailable: Number,
  bikesAvailable: Number,
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

var Trends = mongoose.model('Trends', trendSchema);

module.exports = Trends;