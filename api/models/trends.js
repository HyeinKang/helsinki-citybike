//Import the mongoose module
var mongoose = require('mongoose');

//Set up default mongoose connection
var mongoDB = `mongodb://${process.env.BIKE_TREND_USER}:${process.env.BIKE_TREND_PASSWORD}@${process.env.MONGO_DB_HOST}:27017/${process.env.BIKE_TREND_DB}`;
mongoose.connect(mongoDB, { useNewUrlParser: true })
   .then(() =>  console.log('connection successful'))
   .catch((err) => console.error(err));

var Schema = mongoose.Schema;

var trendSchema = new Schema({
  stationId: String,
  bikesAvailable: Number,
  dateTime: Date
});

var Trends = mongoose.model('Trend', trendSchema);

module.exports = Trends;