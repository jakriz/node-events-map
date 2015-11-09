var express = require('express');
var router = express.Router();

var eventsStream = require('../services/events-stream');

var mmdbReader = require('maxmind-db-reader');
var localisator = mmdbReader.openSync('./mmdb/GeoLite2-City.mmdb');

router.post('/', function(req, res) {
  ipAddress = req.body.ipAddress;

  localisator.getGeoData(ipAddress, function(error, result) {
    if (!error && !!result) {
      eventsStream.newEvent({
        latitude: result.location.latitude,
        longitude: result.location.longitude
      });
    }
  });

  res.sendStatus(200);
});

module.exports = router;
