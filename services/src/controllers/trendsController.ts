import { createApolloFetch } from 'apollo-fetch';
import cron from 'node-cron';
import { TrendModel } from '../models/trendModel'

interface Station {
  stationId: string;
  bikesAvailable: number;
}

const trendsController = () => {
  const fetch = createApolloFetch({
    uri: 'https://api.digitransit.fi/routing/v1/routers/hsl/index/graphql',
  });

  cron.schedule('* * * * *', () => {
    fetch({
      query: `query getAllStations {
        bikeRentalStations {
          stationId
          bikesAvailable
        }
      }
      `,
    }).then(res => {
      console.log('Available biked importing');
      const bikeRentalStations = res.data.bikeRentalStations;
      bikeRentalStations.forEach((station:Station) => {
        const newTimeline = new TrendModel({
          bikesAvailable: station.bikesAvailable,
          dateTime: Date.now(),
          stationId: station.stationId
        });
        newTimeline.save((err) => {
          if (err) throw err;
        });
      });
    });
  });

}

export { trendsController }