'use strict';

const _ = require('lodash');
const mongoose = require('mongoose');
const requireAll = require('require-all');
const restify = require('restify');

const commonStatics = require('./commonStatics');
const config = require('./../config');

const applyRoutes = function (server) {
    // route middleware that will happen on every request
    server.use(function (request, response, next) {
        console.log(request.method, request.url);

        next();
    });

    //Generate REST routes
    
    //Create Mongoose model for each file in /models folder
    const controllers = requireAll({
        dirname: __dirname + '/models',
        resolve: function (basicModel) {
            //Add rest statics to the schema
            let mongooseSchema = mongoose.Schema(basicModel.schema)
            
            mongooseSchema.statics.rest = commonStatics;
            
            //Create Mongoose model
            mongoose.model(basicModel.mongooseModelName,  mongooseSchema);
        }
    });
    
    const restHandler = function (staticMethod) {
        return function (request, response) {
            let model = request.params.model;
            let mongooseModel = mongoose.model(model);

            //Call the function of the proper model
            mongooseModel.rest[staticMethod](request, response);
        }
    };

    server.get('/rest/:model', restHandler('findAll'));
    server.get('/rest/:model/:id', restHandler('findById'));
    server.post('/rest/:model', restHandler('create'));
    server.put('/rest/:model', restHandler('modificate'));
    server.del('/rest/:model/:id', restHandler('delete'));
    
    //Generate REST routes *end*

    }

module.exports = {
    applyRoutes: applyRoutes
}
