const applyRoutes = require('./api/router').applyRoutes;
const mongoose = require('mongoose');
const restify = require('restify');

const baseApiURL = '/api';
const server = restify.createServer({
    name: 'as-api'
});
const serverPort = 5001;

const startServer = function () {
    server.use(restify.queryParser());
    server.use(restify.bodyParser());
    applyRoutes(server);

    mongoose.connect('mongodb://localhost/test');

    server.listen(serverPort, function () {
        console.log('Listening HTTP on port:' + serverPort);
    });

};

startServer();
