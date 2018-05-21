var basicAuth = require('basic-auth');
var config = require('config');

var auth = { };

var authMehtod = function(req, res, next, credentials) {
  var user = basicAuth(req);
  if (!user || user.name !== credentials.username || user.pass !== credentials.password) {
    res.set('WWW-Authenticate', 'Basic realm=Authorization Required');
    res.sendStatus(401);
  } else {
    next();
  }
};

auth.viewAuth = function() {
  return function(req, res, next) {
    authMehtod(req, res, next, config.get('credentials.view'));
  }
};

auth.createAuth = function() {
  return function(req, res, next) {
    authMehtod(req, res, next, config.get('credentials.create'));
  }
};

module.exports = auth;
