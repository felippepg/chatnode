const express = require('express');
const http = require('http');
const path = require('path');
const socktIO = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socktIO(server);

server.listen(3000);
app.use(express.static(path.join(__dirname, 'public')));

io.on('connection', (socket) => {
    console.log('Conexão criada com sucesso');
});