import React from 'react';
import _ from 'lodash';
import axios from 'axios';

class StationPopover extends React.Component {
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
    return bikeTrendsUpdated;
  }

  render() {
    const that = this;
    axios.get(`/trends/${this.props.stationId}`)
    .then(res => {
      if (this.state.isMounted) {
        that.setState({'bikeTrends': _.map(res.data)});
      }
    })
    console.log('bikeTrends: ', this.state.bikeTrends);

    return (
      <div>
        <div className="station-name"><span>{this.props.name}</span> <div className={`${this.props.indicator}  ${this.props.isLoading ? "is-loading" : ""} indicator`}></div></div>
        <div className={`avilability`}>{this.props.bikeAvailability}<span className="divider">/</span>{this.props.stationCapability}</div>
      </div>
    );
  }
}

export default StationPopover;