
var _ = require('lodash/core');
var express = require('express');
var router = express.Router();

var Trend = require('../models/trends');

/* GET users listing. */
router.get('/:id', function(req, res, next) {
  res.send('respond with a resource');

  Trend.find({ "stationId": req.params.id}, function(err, trends) {
    console.log('trends', trends);

    // TODO: Get all collections with the statioinId
    // TODO: Group collections by hour
    // TODO: In each hour, get length of availbableBikes key-value pair
    // TODO: Find the average available bikes by summing all availableBikes / length of the pair
    // TODO: Return average bike trends per hour by bikeStationId

    // var test = _.map(trends, 'availableBikes');
    // console.log('test: ', test);
  });

  // res.json({ firstname: 'John', lastname: 'Doe' });
});

module.exports = router;
