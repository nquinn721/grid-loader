var express = require('express'),
	app = express(),
	server = require('http').Server(app),
	io = require('socket.io')(server),
	util = require('util'),
	port = 3000,
	_ = require('underscore');

server.listen(port, function() {
	console.log('Listening on port', port);
});
app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res) {
	res.sendFile(__dirname + '/index.html');
});



//Lib
var Player = require('./player'),
	config = require('./lib/config'),
	requirejsConfig = require('./requirejs-config'),
	grid = requirejs('grid')(config);

var players = [];



io.on('connection', function(socket) {
	console.log("Socket connected", socket.id);

	socket.emit('canvas', config.gridSize, config.segmentSize);
	socket.emit('grid', grid.getAllSegmentsCoords());

	// Create player and add to collection
	socket.player = new Player(
		socket,
		grid,
		Math.random() * config.gridSize.width,
		Math.random() * config.gridSize.height
	);
	socket.emit('player', socket.player.item.client());
	socket.player.init(io);

	socket.on('move', function(dir) {
		socket.player.move(dir);
	});
	socket.on('stopmove', function() {
		socket.player.stopmove();
	});
	socket.on('add speed', function() {
		socket.player.addSpeed();
	});
	socket.on('remove speed', function () {
		socket.player.removeSpeed();
	});


	socket.on('disconnect', function() {
		grid.removeItem(socket.player);
		players.splice(players.indexOf(socket.player), 1);
		io.emit('players', players);
	});
})
setInterval(function() {
	for(var i = 0, total = players.length; i < total; i++)
		players[i].tick(io);

}, 1000 / 60);