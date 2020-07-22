import React from 'react';
import _ from 'lodash';
import axios from 'axios';

class StationPopover extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isOpen: false,
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

  render() {
    const that = this;
    axios.get(`/trends/${this.props.stationId}`)
    .then(res => {
      if (this.state.isMounted) {
        that.setState({'bikeTrends': res.data}); // [{averageBikesAvailable: 1, time:0}]
      }
    })

    return (
      <div className={this.state.isOpen ? 'is-open' : ''} onClick={this.toggleOpenState}>
        <div>
          <div className="station-name"><span>{this.props.name}</span> <div className={`${this.props.indicator}  ${this.props.isLoading ? "is-loading" : ""} indicator`}></div></div>
          <div className="station-availity">
            <div className={`avilability`}>{this.props.bikeAvailability}<span className="divider">/</span>{this.props.stationCapability}</div>
            <div>
              <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24">
                <path d="M0 0h24v24H0V0z" fill="none"/>
                <path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z"/>
              </svg>
            </div>
          </div>
        </div>
        <div className="station-more">
          Graph
        </div>
      </div>
    );
  }
}

export default StationPopover;