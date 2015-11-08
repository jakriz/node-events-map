var SocketIo = require("socket.io");

var eventsStream = { };

eventsStream.init = function(server) {
  this.stream = SocketIo(server);
};

eventsStream.newEvent = function(event) {
  this.stream.emit("event.new", event);
};

module.exports = eventsStream;
