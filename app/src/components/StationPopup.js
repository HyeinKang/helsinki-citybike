import React from 'react';
import _ from 'lodash';
import axios from 'axios';
import moment from 'moment-timezone';
import {HorizontalBar} from 'react-chartjs-2';
import Accordion from './Accordion';

class StationPopup extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      averageBikesToday: "...",
      bikeTrends: [],
      dayNumber: moment().tz("Europe/Helsinki").day()
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    const bikeTrendsUpdated = !_.isEqual(this.state.bikeTrends, nextState.bikeTrends)
    const dayNumberUpdated = !_.isEqual(this.state.dayNumber, nextState.dayNumber)
    const averageBikesTodayUpdated = !_.isEqual(this.state.averageBikesToday, nextState.averageBikesToday)
    return bikeTrendsUpdated || dayNumberUpdated || averageBikesTodayUpdated;
  }

  toggleOpenState = () => {
    this.setState({'isOpen': !this.state.isOpen});
  }

  updateSelectedStation = () => {
    this.props.updateSelectedStation();
  }

  singularOrPlural = (amount, singular, plural) => {
    let word = singular;

    if(amount > 1) {
      word = plural;
    }

    return word;
  }

  render() {
    const { stationId, stationName, stationCapability, bikeAvailability } = this.props.selectedStation;
    const that = this;

    axios.get(`${process.env.API_URL}/${stationId}/${this.state.dayNumber}`)
    .then(res => {
      that.setState({'bikeTrends': res.data}); // [{averageBikesAvailable: 1, time:0}]
      if(that.state.averageBikesToday === "...") {
        that.setState({'averageBikesToday': _.map(res.data, 'averageBikesAvailable')[moment().tz("Europe/Helsinki").hour()]});
      }
    })

    const chartBgColors = () => {
      const baseColor = 'rgba(242, 188, 25, 0.2)';
      const highlightColor = 'rgba(242, 188, 25, 0.6)';
      const currentHour = moment().tz("Europe/Helsinki").hour();

      let colorsArray = [];
      for (var i = 0; i <= 23; i++) {
        colorsArray.push(baseColor);
      }
      colorsArray[currentHour] = highlightColor;

      return colorsArray;
    }

    const data = {
      labels: _.map(this.state.bikeTrends, 'time'),
      datasets: [
        {
          label: 'Available bikes',
          backgroundColor: chartBgColors,
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
          position: 'top',
          ticks: {
            beginAtZero: true,
            stepSize: 5,
            suggestedMin: 5,
            suggestedMax: 10
          }
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
        if (this.state.dayNumber === 0) {
          that.setState({dayNumber: 6});
        } else {
          that.setState({dayNumber: this.state.dayNumber - 1});
        }
      }

      const increaseDayNumber = () => {
        if (this.state.dayNumber === 6) {
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
          <div className="station-info-content__content">
            <ul className="accordion-list">
              <li className="accordion-list__item">
                <Accordion
                  heading={`Station bike capacity: ${bikeAvailability} / ${stationCapability}`}
                  disclaimer={`${this.state.averageBikesToday} ${this.singularOrPlural(this.state.averageBikesToday, 'bike is', 'bikes are')} usually available at ${moment().tz("Europe/Helsinki").format('h a, dddd')}s`}
                >
                  <div className="trend-header">
                    <h3>Availability Trend</h3>
                    {daySwitcher()}
                  </div>
                  <div className="trend-chart">
                    <HorizontalBar data={data} height={400} options={chartOptions} />
                  </div>
                </Accordion>
              </li>
              {/* <li>
                <Accordion
                  heading="There are 2 comments about this station"
                  disclaimer="Only comments published within 24 hours will be displayed"
                >
                  <div className="comment-wall">
                    <h3 className="header">Comments</h3>
                    <ul className="comments">
                      <li className="comment">
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                        <div className="comment__publisher">Some name, <span>16h ago</span></div>
                      </li>
                      <li className="comment">
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec malesuada neque sed eros pretium vehicula. Proin nec dictum dui. Nunc est orci, accumsan at semper et, iaculis dapibus est. Vestibulum vulputate leo vitae lectus scelerisque, at viverra fusce.</p>
                        <div className="comment__publisher">Some name, <span>10h ago</span></div>
                      </li>
                    </ul>
                  </div>
                  <div className="comment-input">
                    <input type="text" maxLength="255" placeholder="Add comment..." />
                    <button>
                      <div className="icon">
                        <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24">
                          <path d="M0 0h24v24H0z" fill="none" />
                          <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
                        </svg>
                      </div>
                    </button>
                  </div>
                </Accordion>
              </li> */}
            </ul>
          </div>
          {/* <div className="get-direction">
            <button>Get direction</button>
          </div> */}
        </div>
        <div className="station-info-bg" onClick={this.updateSelectedStation}></div>
      </div>
    );
  }
}

export default StationPopup;