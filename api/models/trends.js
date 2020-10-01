const mongoose = require('mongoose')
const { Schema } = mongoose
const bikeTrendDB = `mongodb://${process.env.BIKE_TREND_USER}:${process.env.BIKE_TREND_PASSWORD}@${process.env.MONGO_DB_HOST}:27017/${process.env.BIKE_TREND_DB}`

mongoose.connect(bikeTrendDB, { useNewUrlParser: true })
   .then(() =>  console.log('connection successful'))
   .catch((err) => console.error(err))

const Trends = mongoose.model('Trend', new Schema({
  stationId: String,
  bikesAvailable: Number,
  dateTime: Date
}))

module.exports = Trends