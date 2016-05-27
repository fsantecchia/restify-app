const restify = require('restify');

module.exports = function (server) {
    // Manually implement the method not allowed handler to fix preflights
    server.on('MethodNotAllowed', function (request, response) {
        if (request.method.toUpperCase() === 'OPTIONS') {
            // Send the CORS headers
            response.header('Access-Control-Allow-Credentials', true);
            response.header('Access-Control-Allow-Headers', restify.CORS.ALLOW_HEADERS.join(', '));
            response.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
            response.header('Access-Control-Allow-Origin', request.headers.origin);
            response.header('Access-Control-Max-Age', 0);
            response.header('Content-type', 'application/json');
            response.header('Content-length', 0);

            response.send(204);
        } else {
            response.send(new restify.MethodNotAllowedError());
        }
    });
};
