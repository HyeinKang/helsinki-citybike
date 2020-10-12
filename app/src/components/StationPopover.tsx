import React from 'react';
import { SelectedStation } from '../types';

type Props = {
  indicator: string;
  isLoading: boolean;
}

const StationPopover = (props:SelectedStation & Props) => {
  const updateSelectedStation = () => {
    const selectedStation = {
      stationId: props.stationId,
      stationName: props.name,
      stationCapability: props.stationCapability,
      bikeAvailability: props.bikeAvailability,
    }
    props.updateSelectedStation(selectedStation);
  }
  return (
    <div>
      <div>
        <div className="station-name"><span>{props.name}</span> <div className={`${props.indicator}  ${props.isLoading ? "is-loading" : ""} indicator`}></div></div>
        <div className="station-availity">
          <div className="avilability">{props.bikeAvailability}<span className="divider">/</span>{props.stationCapability}</div>
          <div className="more-info" onClick={updateSelectedStation}>
            <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24">
              <path d="M0 0h24v24H0V0z" fill="none" />
              <path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8-8-8z" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StationPopover;