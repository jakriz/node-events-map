var session = require('express-session');
var config = require('config');

var session = session({
  secret: config.secretKey,
  cookie: { maxAge: 60000 },
  saveUninitialized: true,
  resave: true
});

module.exports = session;
