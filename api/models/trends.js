const mongoose = require('mongoose')
const { Schema } = mongoose
const config = require('../config');

mongoose.connect(config.getbikeTrendDB(), { useNewUrlParser: true })
   .then(() =>  console.log('connection successful'))
   .catch((err) => console.error(err))

const Trends = mongoose.model('Trend', new Schema({
  stationId: String,
  bikesAvailable: Number,
  dateTime: Date
}))

module.exports = Trends