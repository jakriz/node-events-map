var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
  res.render('index', { title: 'Realtime map' });
});

router.get('/heat', function(req, res) {
  res.render('heat', { title: 'Heatmap'})
});

module.exports = router;
