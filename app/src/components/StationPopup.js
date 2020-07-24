import React from 'react';
import _ from 'lodash';
import axios from 'axios';

class StationPopup extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      bikeTrends: [],
      isMounted: false
    }
  }

  componentDidMount() {
    this.state.isMounted = true;
  }

  componentWillUnmount() {
    this.state.isMounted = false;
  }

  shouldComponentUpdate(nextProps, nextState) {
    const bikeTrendsUpdated = !_.isEqual(this.state.bikeTrends, nextState.bikeTrends)
    const isOpenUpdated = !_.isEqual(this.state.isOpen, nextState.isOpen)
    return bikeTrendsUpdated || isOpenUpdated;
  }

  toggleOpenState = () => {
    this.setState({'isOpen': !this.state.isOpen});
  }

  updateSelectedStation = () => {
    this.props.updateSelectedStation();
  }

  render() {
    const that = this;
    axios.get(`/trends/${this.props.stationId}`)
    .then(res => {
      if (this.state.isMounted) {
        that.setState({'bikeTrends': res.data}); // [{averageBikesAvailable: 1, time:0}]
      }
    })

    return (
      <div className="station-info-popup">
        <div className="station-info-content">
          <div className="station-info-content__header">
            <h2>Name</h2>
            <div className="close" onClick={this.updateSelectedStation}>
              <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24">
                <path d="M0 0h24v24H0z" fill="none" />
                <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
              </svg>
            </div>
          </div>
          <h3>Availibity / Capacity</h3>
          <h3>Distance</h3>
          <h3>Bike trneds with current date/time, highlighted current time in the graph</h3>
          <div>
            Button to direct (Future feature)
          </div>
        </div>
        <div className="station-info-bg"></div>
      </div>
    );
  }
}

export default StationPopup;