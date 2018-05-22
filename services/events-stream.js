var SocketIo = require("socket.io");
var sharedSession = require("express-socket.io-session");

var eventsStream = { };

eventsStream.init = function(server, session) {
  this.stream = SocketIo(server);
  
  this.stream.use(sharedSession(session));
  this.stream.on("connect", function(socket) {
    if (!socket.handshake.session.viewAuthorised) {
      socket.disconnect(0);
    }
  });
};

eventsStream.newEvent = function(event) {
  this.stream.emit("event.new", event);
};

module.exports = eventsStream;
