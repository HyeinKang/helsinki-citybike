const mongoose = require('mongoose');
const { Schema } = mongoose

const Trends = mongoose.model('Trend', new Schema({
  stationId: String,
  bikesAvailable: Number,
  dateTime: Date
}));

module.exports = Trends;