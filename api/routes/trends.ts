const _ = require('lodash')
const moment = require('moment-timezone')
const express = require('express')
const router = express.Router()
const Trend = require('../models/trends')

const today = moment().tz("Europe/Helsinki").day()

router.get('/:id/:dayNumber', (req, res, next) => {
  Trend
    .find({ "stationId": req.params.id })
    .maxTime(10000)
    .exec((err, availableBikesByStation) => {
      if (err) return next(err);

      const selectedDayNumber = req.params.dayNumber
      const availableBikesByDay = _.groupBy(availableBikesByStation, (dt) => moment(dt.dateTime).tz("Europe/Helsinki").day())
      const availableBikesByHour = _.groupBy(availableBikesByDay[selectedDayNumber||today], (dt) => moment(dt.dateTime).tz("Europe/Helsinki").hour())
      let averageBikesByHour = []

      _.forEach(availableBikesByHour, (bikes, hour) => {
        const allBikesAmount = _.reduce(_.map(bikes, 'bikesAvailable'), (sum, n) => {
          return sum + n
        }, 0)
        const averageBikesAvailable = Math.round(allBikesAmount/bikes.length)
        const formattedHour = moment(hour,'HH').format('ha') // 21:00
        const averageBikes = {
          'time': formattedHour,
          'averageBikesAvailable': averageBikesAvailable
        }
        averageBikesByHour = [...averageBikesByHour, averageBikes]
      })
      res.json(averageBikesByHour)
    })
})

module.exports = router
