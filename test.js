var server = require('http').createServer();
var port = process.env.PORT || 3000;

server.listen(port, function() {
  console.log('Listening on ' + port);
});