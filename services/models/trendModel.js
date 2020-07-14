var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var trendSchema = new Schema({
  stationId: String,
  bikesAvailable: Number,
  dateTime: Date
});

var Trends = mongoose.model('Trend', trendSchema);

module.exports = Trends;