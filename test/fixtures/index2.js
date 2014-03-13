var http = require('http');

// http://nodejs.org/
http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.end('Hello World\n');
}).listen(1338, '127.0.0.1');