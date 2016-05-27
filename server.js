const applyRoutes = require('./api/router').applyRoutes;
const mongoose = require('mongoose');
const preflights = require('./preflights');
const restify = require('restify');

const server = restify.createServer({
    name: 'as-api'
});
const serverPort = 5001;

const startServer = function () {
    server.use(restify.queryParser());
    server.use(restify.bodyParser());
    server.use(restify.CORS());
    preflights(server);
    applyRoutes(server);

    mongoose.connect('mongodb://localhost/as1');

    server.listen(serverPort, function () {
        console.log('Listening HTTP on port:' + serverPort);
    });
};

startServer();
