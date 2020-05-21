import React, { useEffect, useState } from 'react';
import { useApolloClient } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import _ from 'lodash';

import Map from './Map';

async function asyncForEach(array, callback) {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array);
  }
}

const CityBikeInfo = () => {
  // const stationIds = [133, 134, 290];
  const [allStations, setAllStations] = useState(null);
  const [stations, setStations] = useState([]);
  const [bounds, setBounds] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
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
  
  const processBounds = () => {
    if (!bounds) return false;
    setIsLoading(true);

    const northMost = bounds._ne.lng;
    const eastMost = bounds._ne.lat;
    const southMost = bounds._sw.lng;
    const westMost = bounds._sw.lat;

    let selectedStations = [];
    !!allStations && allStations.forEach((station) => {
      const lonInsideBound = northMost >= station.lon && station.lon >= southMost;
      const latInsideBound = eastMost >= station.lat && station.lat >= westMost;
      if(lonInsideBound && latInsideBound) {
        selectedStations = [...selectedStations, station]
      }
    });

    const stationIds = _.map(selectedStations, 'stationId');
    getStationInfo(stationIds);
  }

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
    if(!!bounds) {
      processBounds();
    }
  }, [bounds, allStations, client, GET_ALL_STATIONS])

  let stationsArray = [];
  const getStationInfo = async (stationIds) => {
    await asyncForEach(stationIds, async (id) => {
      const { data } = await client.query({
        query: STAIONS_INFO,
        variables: {id},
      });
      stationsArray = [...stationsArray, data.bikeRentalStation];
    });
    setTimeout(() => {
      setIsLoading(false);
    }, 30)

    setStations([...stationsArray])
  }

  const updateBounds = (newBounds, oldBounds) => {
    setBounds(newBounds);
  }

  return (
    <div>
      <Map locations={stations} isLoading={isLoading} updateBounds={updateBounds} />
    </div>
  );
}

export default CityBikeInfo;