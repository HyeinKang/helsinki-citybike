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

  render() {
    const that = this;
    axios.get(`/trends/${this.props.stationId}`)
    .then(res => {
      if (this.state.isMounted) {
        that.setState({'bikeTrends': res.data}); // [{averageBikesAvailable: 1, time:0}]
      }
    })

    return (
      <div onClick={this.toggleOpenState}>
        Station info
        Name
        Availibity / Capacity
        Distance
        Bike trneds with current date/time, highlighted current time in the graph
        Button to direct (Future feature)
      </div>
    );
  }
}

export default StationPopup;