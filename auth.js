var basicAuth = require('basic-auth');
var config = require('config');

var auth = { };

auth.viewAuth = function() {
  return function(req, res, next) {
    var user = basicAuth(req);

    var username = config.get('credentials.view.username');
    var password = config.get('credentials.view.password');

    if (!user || user.name !== username || user.pass !== password) {
      res.set('WWW-Authenticate', 'Basic realm=Authorization Required');
      res.sendStatus(401);
    } else {
      next();
    }
  }
};

auth.createAuth = function() {
  return function(req, res, next) {
    var user = basicAuth(req);

    var username = config.get('credentials.create.username');
    var password = config.get('credentials.create.password');

    if (!user || user.name !== username || user.pass !== password) {
      res.set('WWW-Authenticate', 'Basic realm=Authorization Required');
      res.sendStatus(401);
    } else {
      next();
    }
  }
};

module.exports = auth;
