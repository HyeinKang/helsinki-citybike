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
  const [allStations, setAllStations] = useState(null);
  const [stations, setStations] = useState([]);
  const client = useApolloClient();

  const GET_ALL_STATIONS = gql`
  query getAllStations {
    bikeRentalStations {
      stationId
      lat
      lon
    }
  }
  `
  const STAIONS_INFO = gql`
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
    if (!allStations) {
      const getAllStations = async () => {
        const { data } = await client.query({
          query: GET_ALL_STATIONS,
        });
        setAllStations(data.bikeRentalStations);
      }
      getAllStations();
    }
  })

  let stationsArray = [];
  const getStationInfo = async () => {
    await asyncForEach(stationIds, async (id) => {
      const { data } = await client.query({
        query: STAIONS_INFO,
        variables: {id},
      });
      stationsArray = [...stationsArray, data.bikeRentalStation];
    });
    setStations([...stationsArray])
  }

  return (
    <div>
      <Map locations={stations} />
    </div>
  );
}

export default CityBikeInfo;