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
		conn.sendUTF(JSON.stringify({status:"OK", message:"Greetings, Professor Falken."}));
	} catch (err) {
		// couldn't get a game interface. this is most likely because two players are already in the game.
		conn.sendUTF(JSON.stringify({status:"Error", reason: err}));
		return conn.close();
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
					result:func.apply(iface, message.data || [])
				}));
			} else {
				conn.sendUTF(JSON.stringify({status:"Error", reason:"command not found"}));
			}
		} catch (err) {
			conn.sendUTF(JSON.stringify({status:"Error", reason:err.stack || err}));
		}
	});
	
	game.on('gameStart', function(){
		conn.sendUTF(JSON.stringify({event:"gameStart"}));
	});
	
	// relay all important events to the client
	['activate', 'deactivate', 'opponentNameChanged', 'hit', 'sinking'].forEach(function(event){
		iface.on(event, function(){
			conn.sendUTF(JSON.stringify({event:event, data:arguments}));
		});
	});
});

server.listen(3000);