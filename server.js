var http = require("http"),
	express = require("express"),
	websocket = require("websocket"),
	Game = require('./lib/battleship/Game');

var app = express();
app.use(express.static(__dirname + '/web'));

var server = http.createServer(app),
	game = new Game();

wsServer = new websocket.server({
	httpServer: server
});

wsServer.on('request', function(req) {
    var conn = req.accept();
    try {
		var iface = game.getNextInterface();
		conn.sendUTF(JSON.stringify({status:"OK", event: 'connected', message:"Greetings, Professor Falken."}));
	} catch (err) {
		// couldn't get a game interface. this is most likely because two players are already in the game.
        conn.sendUTF(JSON.stringify({status:"FULL", event: 'full', message:"The server is full."}));
        req.reject();
        return;
    }

	conn.on('message', function(message){
		// binary messages are not supported.
		if (message.type !== 'utf8') return;
		
		try {
			message = JSON.parse(message.utf8Data);
			if (message.command && typeof(iface[message.command]) == 'function') {
				var func = iface[message.command];
				conn.sendUTF(JSON.stringify({
					status:"OK",
					command:message.command,
					data:func.apply(iface, message.data || [])
				}));
			} else {
				conn.sendUTF(JSON.stringify({status:"Error", reason:"command not found"}));
			}
		} catch (err) {
			conn.sendUTF(JSON.stringify({status:"Error", reason:err.stack || err}));
		}
	});
	
	// relay all important events to the client
	['activate', 'deactivate', 'opponentNameChanged', 'hit', 'miss', 'sinking', 'win', 'lost', 'gameStart'].forEach(function(event){
		iface.on(event, function(){
			conn.sendUTF(JSON.stringify({event:event, data:arguments}));
		});
	});
});

server.listen(3000);