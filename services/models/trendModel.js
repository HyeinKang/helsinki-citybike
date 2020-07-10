var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var trendSchema = new Schema({
  availableBikes: Object,
  dateTime: Date
});

var Trends = mongoose.model('Trend', trendSchema);

module.exports = Trends;