var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var trendSchema = new Schema({
  stationId: String,
  availableBikes: Object
});

var Trends = mongoose.model('Trend', trendSchema);

module.exports = Trends;