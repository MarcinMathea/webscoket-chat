const express = require('express');
const path = require('path');
const socket = require('socket.io');

const clientPath = __dirname + '/client';

const app = express();
const server = app.listen(8000, () => { console.log('Server running on port 8000') });
const io = socket(server);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(clientPath)));

let messages = [];
let users = [];

app.get('/', (req, res) => {
    res.sendFile(path.join(clientPath + '/index.html'));
});

io.on('connection', (socket) => {
    socket.on('message', (message) => {
        console.log('Oh, I\'ve got something from ' + socket.id);
        messages.push(message);
        socket.broadcast.emit('message', message);
    });
    socket.on('join', user => {
        console.log('User ' + user.id + ' has loged.');
        users.push(user);
        socket.broadcast.emit('join', user);
    });
    socket.on('disconnect', () => {
        console.log('Oh, socket ' + socket.id + ' has left');
        const userDiscon = users.find(user => user.id == socket.id);
        users = users.filter(user => user.id !== socket.id);
        socket.broadcast.emit('userDiscon', userDiscon);
      });
    });