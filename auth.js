var basicAuth = require('basic-auth');

var auth = function(username, password) {
  return function(req, res, next) {
    var user = basicAuth(req);

    if (!user || user.name !== username || user.pass !== password) {
      res.set('WWW-Authenticate', 'Basic realm=Authorization Required');
      res.send(401);
    } else {
      next();
    }
  };
};

module.exports = auth;
