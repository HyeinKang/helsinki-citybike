import React, { useEffect, useState } from 'react';
import ApolloClient from 'apollo-client';
import { useApolloClient } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import _ from 'lodash';

import { BikeRentalStationDetail } from '../types'

import Map from './Map';
import StationPopup from './StationPopup';

const asyncForEach = async(array:number[], callback:(arg0:any, arg1:number, arg2:number[])=>{}) => {
  for (let index = 0; index < array.length; index++) {
    callback(array[index], index, array);
  }
};


type BikeRentalStationDetails = BikeRentalStationDetail[] | null;

type BikeRentalStation = {
  stationId: number;
  lat: number;
  lon: number;
};

type BikeRentalStations = BikeRentalStation[] | null;

type Bound = {
  ne:{ lng: number; lat: number },
  sw:{ lng: number; lat: number }
} | null;

const CityBikeInfo = () => {
  const [allStations, setAllStations] = useState<BikeRentalStations>(null);
  const [stations, setStations] = useState<BikeRentalStationDetails>(null);
  const [bounds, setBounds] = useState<Bound>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [selectedStation, setSelectedStation] = useState<BikeRentalStationDetail>(null);
  const client:ApolloClient<object> = useApolloClient();

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

    const northMost = bounds.ne.lng;
    const eastMost = bounds.ne.lat;
    const southMost = bounds.sw.lng;
    const westMost = bounds.sw.lat;

    let visibleStations:BikeRentalStation[] = [];
    !!allStations && allStations.forEach((station) => {
      const lonInsideBound = northMost >= station.lon && station.lon >= southMost;
      const latInsideBound = eastMost >= station.lat && station.lat >= westMost;
      if(lonInsideBound && latInsideBound) {
        visibleStations = [...visibleStations, station]
      }
    });

    const stationIds:number[] = _.map(visibleStations, 'stationId');
    getStationInfo(stationIds).then(()=>{setStations(stationsArray)});
  }

  useEffect(() => {
    if (!allStations) {
      const getAllStations = async () => {
        await client.query<BikeRentalStations>({
          query: GET_ALL_STATIONS,
        }).then(({data})=>{
          setAllStations(data);
        })
      }
      getAllStations();
    }
    if(!!bounds) {
      processBounds();
    }
  }, [bounds, allStations, client, GET_ALL_STATIONS])

  let stationsArray:BikeRentalStationDetails = [];
  const getStationInfo = async (stationIds:number[]) => {
    asyncForEach(stationIds, async (id) => {
      await client.query<BikeRentalStationDetail>({
        query: STAIONS_INFO,
        variables: {id},
      }).then(({data}) => {
        stationsArray = [...stationsArray, data];
        setIsLoading(false);

        return data;
      });
    });
  }

  const updateBounds = (newBounds:Bound) => {
    setBounds(newBounds);
  }

  const updateSelectedStation = (newStation:BikeRentalStationDetail) => {
    setSelectedStation(newStation);
  }

  const height = window.innerHeight;

  return (
    <div style={{'height': height}}>
      { !!selectedStation &&
        (<StationPopup updateSelectedStation={updateSelectedStation} selectedStation={selectedStation} />)
      }
      <Map
        locations={stations}
        isLoading={isLoading}
        updateBounds={updateBounds}
        updateSelectedStation={updateSelectedStation}
      />
    </div>
  );
}

export default CityBikeInfo;