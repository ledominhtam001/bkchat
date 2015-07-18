// Load required modules
var http    = require('http');              // http server core module
var express = require('express');           // web framework external module
var io      = require('socket.io');         // web socket external module
var easyrtc = require('easyrtc');           // EasyRTC external module
var bodyParser = require('body-parser');
var ejs = require('ejs');
var path = require('path');
var base64url = require('base64-url');
var config = require('./config');

// Setup and configure Express http server. Expect a subfolder called "static" to be the web root.
var httpApp = express();

httpApp.set('view engine', 'ejs')
httpApp.set('views', path.join(__dirname, '/public/views'));  

httpApp.use(bodyParser.urlencoded({ extended: true }));
httpApp.use(bodyParser.json());

httpApp.use(express.static(__dirname + "/public"));

httpApp.get('/', function(req, res) {
	res.render('index', {
		success: false
	});
});

httpApp.post('/', function(req, res) {
	var roomName = req.body.roomName;
	var link = req.headers.host + '/' + base64url.encode(roomName);
	res.render('index', {
		success: true,
		link: link
	});
});

httpApp.get('/:room', function(req, res) {
	var room = base64url.decode(req.params.room);
	res.render('chat', {
		roomName: room
	});
});

// Start Express http server on port 8080
var webServer = http.createServer(httpApp).listen(config.port);

// Start Socket.io so it attaches itself to Express server
var socketServer = io.listen(webServer, {"log level":1});

// Start EasyRTC server
var rtc = easyrtc.listen(httpApp, socketServer);