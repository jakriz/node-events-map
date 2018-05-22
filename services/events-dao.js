var moment = require('moment');

var eventsDb = { };

eventsDb.init = function(db) {
  this.dbCollection = db.collection('events');
  this.dbCollection.createIndex( { 'createdAt': 1 }, { expireAfterSeconds: 60*60*24 } )
};

eventsDb.add = function(event) {
  event.createdAt = moment().toDate();
  this.dbCollection.insertOne(event);
};

eventsDb.getForLastDay = function(handler) {
  // the TTL index takes care of removing older records
  this.dbCollection.find({}, {latitude: 1, longitude: 1}).toArray(handler);
};

module.exports = eventsDb;
