import { createApolloFetch } from 'apollo-fetch';
import * as cron from 'node-cron';

import  { saveToDB } from './dbController'

type Station = {
  stationId: string;
  bikesAvailable: number;
};

export const fetchBikes = async (): Promise<Station[]> => {
    const fetch = createApolloFetch({
      uri: 'https://api.digitransit.fi/routing/v1/routers/hsl/index/graphql',
    });
    const allStationsQuery = `query getAllStations {
      bikeRentalStations {
        stationId
        bikesAvailable
      }
    }`;
    const bikeRentalStations = await fetch({ query: allStationsQuery,}).then(res => {
      return res.data.bikeRentalStations;
    });

    return bikeRentalStations;
}

const trendsController = () => {
  cron.schedule('*/10 * * * *', () => {
    fetchBikes().then(data => {
      console.log('Available biked importing');
      const bikeRentalStations = data;
      bikeRentalStations.forEach((station:Station) => {
        saveToDB(station);
      });

      return bikeRentalStations;
    });
  });
}

export { trendsController }