const express = require('express');
const path = require('path');

const clientPath = __dirname + '/client';

const app = express();

app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(express.static(path.join(clientPath)));


const messages = [];


app.get('/', (req, res) => {
    res.sendFile(path.join(clientPath + '/index.html'));
});

app.listen(8000, () => {
    console.log('Server running on port 8000');
});