
var _ = require('lodash');
var moment = require('moment');
var express = require('express');
var router = express.Router();

var Trend = require('../models/trends');

/* GET available bikes by hour. */
router.get('/:id', function(req, res, next) {
  // res.send('respond with a resource');
  var averageBikesByHour = {};

  Trend.find({ "stationId": req.params.id}, function(err, trends) {
    var groupByHour = _.groupBy(trends, (dt) => moment(dt.dateTime).hour());
    _.forEach(groupByHour, (group, hour) => {
      var bikesAvailableArray = _.map(group, 'bikesAvailable');
      var allBikes = _.reduce(bikesAvailableArray, function(sum, n) {
        return sum + n;
      }, 0);
      var averageBikesAvailable = Math.round(allBikes/group.length);
      averageBikesByHour[hour] = averageBikesAvailable;
    })
    res.json(averageBikesByHour);
  });
});

module.exports = router;
