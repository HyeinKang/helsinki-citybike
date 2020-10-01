import React from 'react';
import _ from 'lodash';
import { isMobile } from "react-device-detect";
import { GeolocateControl } from "mapbox-gl";
import ReactMapboxGl, { Layer, Feature, Popup, ZoomControl } from 'react-mapbox-gl';

import MapboxGLButtonControl from "./MapboxGLButtonControl";
import StationPopover from "./StationPopover";

const MapboxMap = ReactMapboxGl({
  accessToken: 'pk.eyJ1IjoiaGVpbmEta2FuZyIsImEiOiJja2FhNGppb2IwdDNqMnZxd3h1bnFja2NhIn0.si285aYkKGq4jcOjvpryzw',
});

class Map extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      center: [24.941531, 60.170676],
      zoom: [16],
      minZoom: [15],
      maxZoom: [17]
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    const boundsUpdated = !_.isEqual(this.state.bounds, nextState.bounds)
    const locationUpdated = !_.isEqual(this.props.locations, nextProps.locations)
    const isLoadingUpdated= !_.isEqual(this.props.isLoading, nextProps.isLoading)
    return boundsUpdated || locationUpdated || isLoadingUpdated;
  }

  render() {
    const { updateBounds, locations, isLoading, updateSelectedStation } = this.props;

    const onMapLoad = map => {
      /* Instantiate new controls with custom event handlers */
      const refreshCtrl = new MapboxGLButtonControl({
        title: "Refresh the station information",
        innerHTML: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="black" width="18px" height="18px">
                      <path d="M0 0h24v24H0V0z" fill="none" />
                      <path
                        d="M17.65 6.35c-1.63-1.63-3.94-2.57-6.48-2.31-3.67.37-6.69 3.35-7.1 7.02C3.52 15.91 7.27 20 12 20c3.19 0 5.93-1.87 7.21-4.56.32-.67-.16-1.44-.9-1.44-.37 0-.72.2-.88.53-1.13 2.43-3.84 3.97-6.8 3.31-2.22-.49-4.01-2.3-4.48-4.52C5.31 9.44 8.26 6 12 6c1.66 0 3.14.69 4.22 1.78l-1.51 1.51c-.63.63-.19 1.71.7 1.71H19c.55 0 1-.45 1-1V6.41c0-.89-1.08-1.34-1.71-.71l-.64.65z" />
                    </svg>`,
        eventHandler: () => {updateBounds(map.getBounds())}
      });
      const geolocate = new GeolocateControl({
        positionOptions: {
          enableHighAccuracy: true
        },
        showUserLocation: true,
      });
  
      map.addControl(refreshCtrl, 'top-right');

      if (isMobile) {
        map.addControl(geolocate, 'top-left');
        setTimeout(()=>{
          geolocate.trigger();
        }, 500)
      }

      updateBounds(map.getBounds());
    };

    const StationsInfoPopup = ({location}) => {
      const stationCapability = location.bikesAvailable + location.spacesAvailable;
      const bikeAvailability = location.bikesAvailable;

      const bikePercentage = bikeAvailability / stationCapability * 100;
      const indicator = bikePercentage > 50 ? "safe" : bikePercentage > 0 ? "warning" : "bad";

      return (
        <Popup coordinates={[location.lon, location.lat]} key={location.stationId} >
          <StationPopover
            name={location.name}
            stationId={location.stationId}
            indicator={indicator}
            isLoading={isLoading}
            bikeAvailability={bikeAvailability}
            stationCapability={stationCapability}
            updateSelectedStation={updateSelectedStation}
          />
        </Popup>
      )
    }
    return (
      <div>
        <MapboxMap
            style="mapbox://styles/heina-kang/ckahkdlxb014m1itfktw9kt6s"
            center={this.state.center}
            zoom={this.state.zoom}
            minZoom={this.state.minZoom}
            maxZoom={this.state.maxZoom}
            containerStyle={{
              width: '100vw',
              height: window.innerHeight
            }}
            onStyleLoad={onMapLoad}
            onMoveEnd={(map) => {updateBounds(map.getBounds())}}
            attributionControl={false}
          >
            <Layer type="symbol" id="marker" layout={{ 'icon-image': 'bicycle-15' }}>
              { locations.map((location) => (
                <Feature coordinates={[location.lon, location.lat]} key={location.stationId} />
              ))}
            </Layer>
          { locations.map((location) => (
            <StationsInfoPopup key={location.stationId} location={location} />
          ))}
          <ZoomControl position="bottom-right" />
        </MapboxMap>
      </div>
    );
  }
}

export default Map;