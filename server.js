var http = require("http"),
	express = require("express"),
	websocket = require("websocket");

var app = express();
app.use(express.static(__dirname + '/web'));

var server = http.createServer(app);

wsServer = new websocket.server({
	httpServer: server
});

wsServer.on('request', function(req) {
	var conn = req.accept();
});

server.listen(3000);