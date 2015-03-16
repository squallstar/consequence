var redis = require('./redis');

var Socket = require('./socket');

module.exports = function (app) {
  var sockets = [],
      io = require('socket.io')(app.server);

  io.adapter(redis);

  addEvents();

  function addEvents () {
    io.on('connection', function (rawSocket) {
      // Create local socket
      var socket = new Socket(rawSocket);

      socket.on('message', function (msg) {
        io.emit('message', msg);
      });

      sockets.push(socket);
    });
  }
}