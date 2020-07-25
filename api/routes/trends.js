
var _ = require('lodash');
var moment = require('moment-timezone');
var express = require('express');
var router = express.Router();

var Trend = require('../models/trends');

/* GET available bikes by hour. */
router.get('/:id/:dayNumber', function(req, res, next) {
  // res.send('respond with a resource');
  var averageBikesByHour = [];

  Trend.find({ "stationId": req.params.id}, function(err, trends) {
    var groupByDay = _.groupBy(trends, (dt) => moment(dt.dateTime).tz("Europe/Helsinki").day());
    var today = moment().tz("Europe/Helsinki").day();
    var groupByHour = _.groupBy(groupByDay[req.params.dayNumber||today], (dt) => moment(dt.dateTime).tz("Europe/Helsinki").hour());
    _.forEach(groupByHour, (group, hour) => {
      var bikesAvailableArray = _.map(group, 'bikesAvailable');
      var allBikes = _.reduce(bikesAvailableArray, function(sum, n) {
        return sum + n;
      }, 0);
      var averageBikesAvailable = Math.round(allBikes/group.length);
      // averageBikesByHour[hour] = averageBikesAvailable;
      var formattedHour = moment(hour,'HH').format('ha'); // 21:00
      averageBikesByHour = [...averageBikesByHour,{'time': formattedHour, 'averageBikesAvailable': averageBikesAvailable}]
    })
    res.json(averageBikesByHour);
  });
});

module.exports = router;
