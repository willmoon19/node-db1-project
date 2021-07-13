const express = require("express");
const accountRouter = require('./accounts/accounts-router');

const server = express();

server.use(express.json());
server.use('/api/accounts', accountRouter);

server.use('*', (req, res) => {
    console.log("main page up")
    res.json({message: 'main page up'})
})

module.exports = server;
