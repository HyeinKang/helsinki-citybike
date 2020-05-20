import React from 'react';
import _ from 'lodash';

import ReactMapboxGl, { Layer, Feature, Popup } from 'react-mapbox-gl';

const MapboxMap = ReactMapboxGl({
  accessToken: 'pk.eyJ1IjoiaGVpbmEta2FuZyIsImEiOiJja2FhNGppb2IwdDNqMnZxd3h1bnFja2NhIn0.si285aYkKGq4jcOjvpryzw',
  
});

class Map extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      center: [24.964421, 60.197636],
      zoom: [15]
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    const boundsUpdated = !_.isEqual(this.state.bounds, nextState.bounds)
    const locationUpdated = !_.isEqual(this.props.locations, nextProps.locations)
    return boundsUpdated || locationUpdated;
  }

  render() {
    const { updateBounds, locations } = this.props;
    return (
      <div>
        <MapboxMap
            style="mapbox://styles/mapbox/streets-v8"
            center={this.state.center}
            zoom={this.state.zoom}
            containerStyle={{
              width: '100vw',
              height: '100vh'
            }}
            onRender={(map) => { updateBounds(map.getBounds()) }}
          >
            <Layer type="symbol" id="marker" layout={{ 'icon-image': 'bicycle-15' }}>
              { locations.map((location) => (
                <Feature coordinates={[location.lon, location.lat]} key={location.stationId} />
              ))}
            </Layer>
          { locations.map((location) => (
            <Popup coordinates={[location.lon, location.lat]} key={location.stationId} >
              <div>{location.name}</div>
              <div>{location.bikesAvailable}/{location.bikesAvailable + location.spacesAvailable}</div>
            </Popup>
          ))}
        </MapboxMap>
      </div>
    );
  }
}

export default Map;