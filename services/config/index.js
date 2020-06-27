require('dotenv').config({ path: '../.env' })

module.exports = {
    
    getDbConnectionString: function() {
      var mongoDB = `mongodb://${process.env.STATION_DB_USER}:${process.env.STATION_DB_PASSWORD}@mongo:27017/${process.env.STATION_DB}`;
        return mongoDB;
    }
    
}