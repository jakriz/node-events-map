var express = require('express');
var router = express.Router();

var auth = require('../auth');
var eventsStream = require('../services/events-stream');
var mmdbReader = require('maxmind-db-reader');
var localisator = mmdbReader.openSync('./mmdb/GeoLite2-City.mmdb');

router.post('/', auth(), function(req, res) {
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

}).get('/', function(req, res) {
  events = [
    {
      latitude: 48.493568,
      longitude: 11.208918
    },
    {
      latitude: 49.493568,
      longitude: 11.208918
    },
  ]
  res.json(events);
});

module.exports = router;
