var basicAuth = require('basic-auth');
var config = require('config');

var username = config.get('endpoint.username');
var password = config.get('endpoint.password');

var auth = function() {
  return function(req, res, next) {
    var user = basicAuth(req);

    if (!user || user.name !== username || user.pass !== password) {
      res.set('WWW-Authenticate', 'Basic realm=Authorization Required');
      res.sendStatus(401);
    } else {
      next();
    }
  };
};

module.exports = auth;
