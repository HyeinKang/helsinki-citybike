var express = require('express');
var router = express.Router();

var Trend = require('../models/trends');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');

  Trend.find({}, function(err, trends) {
    console.log('trends', trends);
  });

  // res.json({ firstname: 'John', lastname: 'Doe' });
});

module.exports = router;
