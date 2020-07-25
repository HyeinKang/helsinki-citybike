const { createApolloFetch } = require('apollo-fetch');
var cron = require('node-cron');
var Trends = require('../models/trendModel');

module.exports = function(app) {
  const fetch = createApolloFetch({
    uri: 'https://api.digitransit.fi/routing/v1/routers/hsl/index/graphql',
  });

  cron.schedule('*/10 * * * *', () => {
    console.log('running a task every 10 mins');
    
    fetch({
      query: `query getAllStations {
        bikeRentalStations {
          stationId
          bikesAvailable
        }
      }
      `,
    }).then(res => {
      const data = res.data.bikeRentalStations;
      data.reduce((obj, item) => {
        
        var newTimeline = Trends({
          bikesAvailable: item.bikesAvailable,
          dateTime: Date.now(),
          stationId: item.stationId
        });
        newTimeline.save(function(err) {
          if (err) throw err;
        });
      });
      console.log('Available biked imported');
    });
  });
}