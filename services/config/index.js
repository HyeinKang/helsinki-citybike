require('dotenv').config({ path: '../.env' })

module.exports = {
    
    getDbConnectionString: function() {
      var mongoDB = `mongodb://${process.env.BIKE_TREND_USER}:${process.env.BIKE_TREND_PASSOWRD}@mongo:27017/${process.env.BIKE_TREND_DB}`;
        return mongoDB;
    }
    
}