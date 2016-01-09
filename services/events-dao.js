var moment = require('moment');

var eventsDb = { };

eventsDb.init = function(db) {
  this.db = db;

  this.db.createCollection('events');
  this.db.collection('events').createIndex( { 'createdAt': 1 }, { expireAfterSeconds: 60*60*24 } )
};

eventsDb.add = function(event) {
  event.createdAt = moment().toDate();
  this.db.collection('events').save(event);
};

eventsDb.getForLastDay = function(handler) {
  // the TTL index takes care of removing older records
  this.db.collection('events').find({}, {latitude: 1, longitude: 1}).toArray(handler);
};

module.exports = eventsDb;
