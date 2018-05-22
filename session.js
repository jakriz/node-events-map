var session = require('express-session');
var config = require('config');
var MongoStore = require('connect-mongodb-session')(session);

var session = session({
  secret: config.secretKey,
  cookie: { maxAge: 60000 },
  saveUninitialized: true,
  resave: true,
  store: new MongoStore({
    uri: 'mongodb://'+process.env.MONGO_PORT_27017_TCP_ADDR+':'+process.env.MONGO_PORT_27017_TCP_PORT,
    databaseName: 'db',
    collection: 'sessions'
  })
});

module.exports = session;
