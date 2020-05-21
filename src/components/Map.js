import React from 'react';
import _ from 'lodash';

import { GeolocateControl } from "mapbox-gl";
import ReactMapboxGl, { Layer, Feature, Popup, ZoomControl } from 'react-mapbox-gl';

const MapboxMap = ReactMapboxGl({
  accessToken: 'pk.eyJ1IjoiaGVpbmEta2FuZyIsImEiOiJja2FhNGppb2IwdDNqMnZxd3h1bnFja2NhIn0.si285aYkKGq4jcOjvpryzw',
  
});

class Map extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      center: [24.964421, 60.197636],
      zoom: [15],
      maxZoom: [18]
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    const boundsUpdated = !_.isEqual(this.state.bounds, nextState.bounds)
    const locationUpdated = !_.isEqual(this.props.locations, nextProps.locations)
    return boundsUpdated || locationUpdated;
  }

  render() {
    const { updateBounds, locations } = this.props;
    const onMapLoad = map => { map.addControl(new GeolocateControl()); };

    function StationsInfo({location}) {
      const stationCapability = location.bikesAvailable + location.spacesAvailable;
      const bikeAvailability = location.bikesAvailable;

      const bikePercentage = bikeAvailability / stationCapability * 100;
      const indicator = bikePercentage > 50 ? "safe" : bikePercentage > 0 ? "warning" : "bad";

      return (
        <Popup coordinates={[location.lon, location.lat]} key={location.stationId} >
          <div className="station-name"><span>{location.name}</span> <div className={`${indicator} indicator`}></div></div>
          <div>{bikeAvailability}<span className="divider">/</span>{stationCapability}</div>
        </Popup>
      )
    }
    return (
      <div>
        <MapboxMap
            style="mapbox://styles/mapbox/streets-v8"
            center={this.state.center}
            zoom={this.state.zoom}
            maxZoom={this.state.maxZoom}
            containerStyle={{
              width: '100vw',
              height: '100vh'
            }}
            onStyleLoad={onMapLoad}
            onRender={(map) => { updateBounds(map.getBounds()) }}
          >
            <Layer type="symbol" id="marker" layout={{ 'icon-image': 'bicycle-15' }}>
              { locations.map((location) => (
                <Feature coordinates={[location.lon, location.lat]} key={location.stationId} />
              ))}
            </Layer>
          { locations.map((location) => (
            <StationsInfo key={location.stationId} location={location} />
          ))}
          <ZoomControl position="bottom-right" />
        </MapboxMap>
      </div>
    );
  }
}

export default Map;