const express = require('express');
const http = require('http');
const path = require('path');
const socktIO = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socktIO(server);

server.listen(3000);
app.use(express.static(path.join(__dirname, 'public')));

let connectedUsers = [];

io.on('connection', (socket) => {
    console.log('Conexão criada com sucesso');

    socket.on('join-user', (username) => {
        socket.username = username;
        connectedUsers.push(username);
        console.log(connectedUsers);

        socket.emit('user-ok', connectedUsers);
        socket.broadcast.emit('update-users', {
            join: username,
            list: connectedUsers
        });
    });

    socket.on('disconnect', () => {
        connectedUsers = connectedUsers.filter(user => user != socket.username);
        console.log(connectedUsers);
        socket.broadcast.emit('update-users', {
            left: socket.username,
            list: connectedUsers
        });
    });
});