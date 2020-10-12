import React, { useEffect, useState } from 'react';
import _ from 'lodash';
import axios from 'axios';
import moment from 'moment-timezone';
import { HorizontalBar } from 'react-chartjs-2';
import Accordion from './Accordion';

import { SelectedStation, BikeRentalStationDetail } from '../types';

interface State {
  updateSelectedStation: (newStation:BikeRentalStationDetail) => void;
  selectedStation: SelectedStation
}

const singularOrPlural = (amount:number, singular:string, plural:string) => {
  let word = singular;

  if(amount > 1) {
    word = plural;
  }

  return word;
}

const StationPopup: React.FunctionComponent<State> = (props) => {
  const { stationId, stationName, stationCapability, bikeAvailability } = props.selectedStation;

  const [averageBikesToday, setAverageBikesToday] = useState(null);
  const [bikeTrends, setBikeTrends] = useState([]);
  const [dayNumber, setDayNumber] = useState(moment().tz("Europe/Helsinki").day());

  useEffect(() => {
    if (!bikeTrends) {
      axios.get(`api/trends/${stationId}/${dayNumber}`)
      .then(res => {
        setBikeTrends(res.data);
        if(!averageBikesToday) {
          setAverageBikesToday(_.map(res.data, 'averageBikesAvailable')[moment().tz("Europe/Helsinki").hour()]);
        }
      })
    }
  }, [bikeTrends, dayNumber, averageBikesToday]);

  const updateSelectedStation = () => {
    props.updateSelectedStation(stationId);
  }

  const chartBgColors = () => {
    const baseColor = 'rgba(242, 188, 25, 0.2)';
    const highlightColor = 'rgba(242, 188, 25, 0.6)';
    const currentHour = moment().tz("Europe/Helsinki").hour();

    let colorsArray = [];
    for (let i = 0; i <= 23; i++) {
      colorsArray.push(baseColor);
    }
    colorsArray[currentHour] = highlightColor;

    return colorsArray;
  }

  const data = {
    labels: _.map(bikeTrends, 'time'),
    datasets: [
      {
        label: 'Available bikes',
        backgroundColor: chartBgColors,
        borderWidth: 0,
        barThickness: 'flex',
        barPercentage: 1,
        categoryPercentage: 1,
        hoverBackgroundColor: 'rgba(242, 188, 25, 0.4)',
        data: _.map(bikeTrends, 'averageBikesAvailable')
      }
    ]
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio : false,
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
      if (dayNumber === 0) {
        setDayNumber(6)
      } else {
        setDayNumber(dayNumber - 1)
      }
    }

    const increaseDayNumber = () => {
      if (dayNumber === 6) {
        setDayNumber(0)
      } else {
        setDayNumber(dayNumber + 1)
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
        <div>{daysOfTheWeek[dayNumber]}</div>
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
          </div>
          <div className="close" onClick={updateSelectedStation}>
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
                disclaimer={`${!averageBikesToday ? '...' : averageBikesToday} ${singularOrPlural(averageBikesToday, 'bike is', 'bikes are')} usually available at ${moment().tz("Europe/Helsinki").format('h a, dddd')}s`}
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
          </ul>
        </div>
      </div>
      <div className="station-info-bg" onClick={updateSelectedStation}></div>
    </div>
  );
}

export default StationPopup;