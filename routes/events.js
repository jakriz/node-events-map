var express = require('express');
var router = express.Router();

var auth = require('../auth');
var eventsStream = require('../services/events-stream');
var eventsDao = require('../services/events-dao');
var mmdbReader = require('maxmind-db-reader');
var localisator = mmdbReader.openSync('./mmdb/GeoLite2-City.mmdb');

router.post('/', auth(), function(req, res) {
  ipAddress = req.body.ipAddress;

  localisator.getGeoData(ipAddress, function(error, result) {
    if (!error && !!result && !!result.location) {
      event = {
        latitude: result.location.latitude,
        longitude: result.location.longitude
      };

      eventsStream.newEvent(event);
      eventsDao.add(event);
    }
  });

  res.sendStatus(200);

}).get('/', function(req, res) {
  eventsDao.getForLastDay(function(err, result) {
    if (err) {
      res.sendStatus(500);
    } else if (result.length) {
      res.json(result);
    } else {
      res.json([]);
    }
  });
});

module.exports = router;
