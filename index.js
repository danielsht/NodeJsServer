var express = require('express');
var app = express();
var server = app.listen(app.get('port'), listen);

var data;

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));

app.get('/HelloWorld', function (req, res) {
	res.send('Hello World!');
});

function listen() {
	console.log('App listening!');
};

app.get('/CAsequence', function (req, res) {
	res.send(data);
});

var io = require('socket.io')(server);

io.sockets.on('connection', function(socket) {
	//console.log("New Client: " + socket.id);

	socket.on('user', function(UserData) {
		data = UserData;
	});

	socket.on('disconnect', function() {
		//console.log("Client has disconnected: " + socket.id);
	});
});