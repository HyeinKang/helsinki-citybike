import React, { useEffect, useState } from 'react';

import { useApolloClient } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';

import Map from './Map';

async function asyncForEach(array, callback) {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array);
  }
}

const CityBikeInfo = () => {
  const stationIds = [133, 134, 290];
  const [stations, setStations] = useState([]);
  const client = useApolloClient();

  const CITYBIKEINFO = gql`
  query getStation($id: String!) {
    bikeRentalStation(id:$id) {
      stationId
      name
      bikesAvailable
      spacesAvailable
      lat
      lon
    }
  }
  `
  useEffect(() => {
    let stationsArray = [];
    const getStationInfo = async () => {
      await asyncForEach(stationIds, async (id) => {
        const { data } = await client.query({
          query: CITYBIKEINFO,
          variables: {id},
        });
        stationsArray = [...stationsArray, data.bikeRentalStation];
      });
      setStations([...stationsArray])
    }
    getStationInfo();
  }, [])

  return (
    <div>
      <Map locations={stations} />
    </div>
  );
}

export default CityBikeInfo;