import React, { useEffect, useState } from 'react';
import { useApolloClient } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import _ from 'lodash';

import Map from './Map';
import StationPopup from './StationPopup';

const asyncForEach = async(array, callback) => {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array);
  }
}

const CityBikeInfo = () => {
  const [allStations, setAllStations] = useState(null);
  const [stations, setStations] = useState([]);
  const [bounds, setBounds] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedStation, setSelectedStation] = useState(null);
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

    let visibleStations = [];
    !!allStations && allStations.forEach((station) => {
      const lonInsideBound = northMost >= station.lon && station.lon >= southMost;
      const latInsideBound = eastMost >= station.lat && station.lat >= westMost;
      if(lonInsideBound && latInsideBound) {
        visibleStations = [...visibleStations, station]
      }
    });

    const stationIds = _.map(visibleStations, 'stationId');
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
      }).then(()=>{
        stationsArray = [...stationsArray, data.bikeRentalStation];
        setIsLoading(false);
      });
    });

    setStations([...stationsArray])
  }

  const updateBounds = (newBounds, oldBounds) => {
    setBounds(newBounds);
  }

  const updateSelectedStation = (newStation, oldStation) => {
    setSelectedStation(newStation);
  }

  const height = window.innerHeight;

  return (
    <div style={{'height': height}}>
      { !!selectedStation && (<StationPopup updateSelectedStation={updateSelectedStation} selectedStation={selectedStation} />) }
      <Map locations={stations} isLoading={isLoading} updateBounds={updateBounds} updateSelectedStation={updateSelectedStation} />
    </div>
  );
}

export default CityBikeInfo;