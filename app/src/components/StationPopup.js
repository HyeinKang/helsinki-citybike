import React from 'react';
import _ from 'lodash';
import axios from 'axios';
import moment from 'moment-timezone';
import {HorizontalBar} from 'react-chartjs-2';

class StationPopup extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      bikeTrends: [],
      dayNumber: moment().tz("Europe/Helsinki").day()
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    const bikeTrendsUpdated = !_.isEqual(this.state.bikeTrends, nextState.bikeTrends)
    const dayNumberUpdated = !_.isEqual(this.state.dayNumber, nextState.dayNumber)
    return bikeTrendsUpdated || dayNumberUpdated;
  }

  toggleOpenState = () => {
    this.setState({'isOpen': !this.state.isOpen});
  }

  updateSelectedStation = () => {
    this.props.updateSelectedStation();
  }

  render() {
    const { stationId, stationName, stationCapability, bikeAvailability } = this.props.selectedStation;
    const that = this;

    axios.get(`/trends/${stationId}/${this.state.dayNumber}`)
    .then(res => {
      that.setState({'bikeTrends': res.data}); // [{averageBikesAvailable: 1, time:0}]
    })

    const data = {
      labels: _.map(this.state.bikeTrends, 'time'),
      datasets: [
        {
          label: 'Available bikes',
          backgroundColor: 'rgba(242, 188, 25, 0.2)',
          borderWidth: 0,
          barThickness: 'flex',
          barPercentage: 1,
          categoryPercentage: 1,
          hoverBackgroundColor: 'rgba(242, 188, 25, 0.4)',
          data: _.map(this.state.bikeTrends, 'averageBikesAvailable')
        }
      ]
    };

    const chartOptions = {
      responsive: true,
      layout: {
          padding: {
              left: 0,
              right: 0,
              top: 0,
              bottom: 0
          }
      },
      scales: {
        xAxes: [{
          gridLines: {
            // display: false,
            // drawBorder: false,
            drawOnChartArea: false
          },
        }],
        yAxes: [{
          gridLines: {
            // display: false,
            // drawBorder: false,
            drawOnChartArea: false
          },
        }],
      }
    }

    const daySwitcher = () => {
      const daysOfTheWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

      const decreaseDayNumber = () => {
        if (this.state.dayNumber == 0) {
          that.setState({dayNumber: 6});
        } else {
          that.setState({dayNumber: this.state.dayNumber - 1});
        }
      }

      const increaseDayNumber = () => {
        if (this.state.dayNumber == 6) {
          that.setState({dayNumber: 0});
        } else {
          that.setState({dayNumber: this.state.dayNumber + 1});
        }
      }

      return (
        <div className="selected-day">
          <div className="button" onClick={decreaseDayNumber}>
            <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24">
              <path d="M0 0h24v24H0V0z" fill="none" />
              <path d="M15.41 16.59L10.83 12l4.58-4.59L14 6l-6 6 6 6 1.41-1.41z" />
            </svg>
          </div>
          <div>{daysOfTheWeek[this.state.dayNumber]}</div>
          <div className="button" onClick={increaseDayNumber}>
            <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24">
              <path d="M0 0h24v24H0V0z" fill="none" />
              <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z" />
            </svg>
          </div>
        </div>
      )
    }

    return (
      <div className="station-info-popup">
        <div className="station-info-content">
          <div className="station-info-content__header">
            <div>
              <h2>{stationName}</h2>
              {/* <p>N meters away</p> */}
            </div>
            <div className="close" onClick={this.updateSelectedStation}>
              <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24">
                <path d="M0 0h24v24H0z" fill="none" />
                <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
              </svg>
            </div>
          </div>
          <div>
            <h3>Bikes available now</h3>
            <p>{bikeAvailability} / {stationCapability}</p>
          </div>
          <div>
            <div className="trend-header">
              <h3>Availability Trend</h3>
              {daySwitcher()}
            </div>
            <div className="trend-chart">
              <HorizontalBar data={data} height={480} options={chartOptions} />
            </div>
          </div>
          {/* <div>
            <div>
              Button to direct (Future feature)
            </div>
          </div> */}
        </div>
        <div className="station-info-bg"></div>
      </div>
    );
  }
}

export default StationPopup;