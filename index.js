var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var usercount = 0;
var userhashmap = {};

app.get('/', function(req, res){
    res.sendFile(__dirname + '/index.html');
});

app.get('/js/phaser.min.js', function(req, res){
    res.sendFile(__dirname + '/js/phaser.min.js');
});
app.get('/assets/platform.png', function(req, res){
    res.sendFile(__dirname + '/assets/platform.png');
});
app.get('/assets/dude.png', function(req, res){
    res.sendFile(__dirname + '/assets/dude.png');
});
app.get('/assets/sky.png', function(req, res){
    res.sendFile(__dirname + '/assets/sky.png');
});


io.on('connection', function(socket){

    function communicate(status) {
        if (status == '+') {
            usercount += 1;
            userhashmap[socket.id] = true;
        } else if (status == '-') {
            usercount -= 1;
            delete userhashmap[socket.id];
        }
        io.emit('playerconnect', status + socket.id);
        console.log(status + socket.id);

        io.emit('userscount', usercount);
        console.log("users: " + usercount);

        for (var x in userhashmap) {
            console.log(" |  " + x);
        }
    }

    communicate("+");

    socket.on('disconnect', function() {

        communicate("-");

    });
});


http.listen(3000, function(){
    console.log('listening on *:3000');
});