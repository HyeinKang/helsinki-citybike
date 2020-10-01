const { createApolloFetch } = require('apollo-fetch');
const cron = require('node-cron');
const Trends = require('../models/trendModel');

module.exports = (app) => {
  const fetch = createApolloFetch({
    uri: 'https://api.digitransit.fi/routing/v1/routers/hsl/index/graphql',
  });

  cron.schedule('*/10 * * * *', () => {
    fetch({
      query: `query getAllStations {
        bikeRentalStations {
          stationId
          bikesAvailable
        }
      }
      `,
    }).then(res => {
      const bikeRentalStations = res.data.bikeRentalStations;
      bikeRentalStations.forEach((station) => {
        const newTimeline = Trends({
          bikesAvailable: station.bikesAvailable,
          dateTime: Date.now(),
          stationId: station.stationId
        });
        newTimeline.save((err) => {
          if (err) throw err;
        });
      });
      console.log('Available biked imported');
    });
  });
}