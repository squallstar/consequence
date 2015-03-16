(function() {
  var socket = io();
  socket.emit('message', 'hello');
  socket.on('message', function() {
    console.log(arguments);
  })
})();