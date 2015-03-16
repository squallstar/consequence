var redis = require('socket.io-redis');
var client;

if (process.env.REDISTOGO_URL) {
  var rtg = require('url').parse(process.env.REDISTOGO_URL),
      password = rtg.auth.split(':')[1],
      pub = redis(rtg.port, rtg.host, { auth_pass: password }),
      sub = redis(rtg.port, rtg.host, { detect_buffers: true, auth_pass: password});

  client = redis({ pubClient: pub, subClient: sub });
} else {
  client = redis();
}

module.exports = client;