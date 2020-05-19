import React from 'react';

import ReactMapboxGl, { Layer, Feature, Popup } from 'react-mapbox-gl';

const MapboxMap = ReactMapboxGl({
  accessToken: 'pk.eyJ1IjoiaGVpbmEta2FuZyIsImEiOiJja2FhNGppb2IwdDNqMnZxd3h1bnFja2NhIn0.si285aYkKGq4jcOjvpryzw',
  
});

class Map extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      center: [24.964421, 60.197636],
      zoom: [15],
    }
  }

  render() {
    return (
      <div>
        <MapboxMap
            style="mapbox://styles/mapbox/streets-v8"
            center={this.state.center}
            zoom={this.state.zoom}
            containerStyle={{
              height: '100vh',
              width: '100%'
            }}
          >
            <Layer type="symbol" id="marker" layout={{ 'icon-image': 'bicycle-15' }}>
              { this.props.locations.map((location) => (
                <Feature coordinates={[location.lon, location.lat]} key={location.stationId} />
              ))}
            </Layer>
          { this.props.locations.map((location) => (
            <Popup coordinates={[location.lon, location.lat]} key={location.stationId} >
              <div>{location.name}</div>
              <div>{location.bikesAvailable}/{location.spacesAvailable}</div>
            </Popup>
          ))}
        </MapboxMap>
      </div>
    );
  }
}

export default Map;