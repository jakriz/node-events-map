var express = require('express');
var router = express.Router();

var auth = require('../auth');

router.get('/', auth.viewAuth(), function(req, res) {
  req.session.viewAuth = true;
  res.render('index', { title: 'Realtime map' });
});

router.get('/heat', auth.viewAuth(), function(req, res) {
  req.session.viewAuth = true;
  res.render('heat', { title: 'Heatmap'})
});

module.exports = router;
