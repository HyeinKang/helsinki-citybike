var mongoose = require('mongoose');

var mongoDB = `mongodb://${process.env.STATION_DB_USER}:${process.env.STATION_DB_PASSWORD}@${process.env.MONGO_DB_HOST}:27017/${process.env.STATION_DB}`;
mongoose.connect(mongoDB, { useNewUrlParser: true })
   .then(() =>  console.log('connection successful'))
   .catch((err) => console.error(err));

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