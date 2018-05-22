var basicAuth = require('basic-auth');
var config = require('config');

var auth = { };

auth.viewAuth = function() {
	return function(req, res, next) {
		if (req.session.viewAuthorised || isAuthValid(req, config.get('credentials.view'))) {
			req.session.viewAuthorised = true;
			next();
		} else {
			unauthorised(res);
		}
	}
};

auth.createAuth = function() {
	return function(req, res, next) {
		if (isAuthValid(req, config.get('credentials.create'))) {
			next();
		} else {
			unauthorised(res);
		}
	}
};

var isAuthValid = function(req, credentials) {
	if (!credentials) {
		return true;
	}

	var user = basicAuth(req);
	return !!user && user.name == credentials.username && user.pass == credentials.password;
};

var unauthorised = function(res) {
	res.set('WWW-Authenticate', 'Basic realm=Authorization Required');
	res.sendStatus(401);
}

module.exports = auth;
