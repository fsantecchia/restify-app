'use strict';

const mongoose = require('mongoose');
const requireAll = require('require-all');

const commonStatics = require('./commonStatics');

const applyRoutes = function (server) {
    //Generate REST endopints

    //Create Mongoose model for each file in /models folder
    requireAll({
        dirname: __dirname + '/models',
        resolve: function (basicModel) {
            //Add statics to the schema
            let mongooseSchema = mongoose.Schema(basicModel.schema);

            mongooseSchema.statics.custom = basicModel.statics;
            mongooseSchema.statics.rest = commonStatics;
            mongooseSchema.statics.fieldsToPopulate = basicModel.populate;

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
        };
    };

    server.get('/api/:model', restHandler('find'));
    server.get('/api/:model/:id', restHandler('findById'));
    server.post('/api/:model', restHandler('create'));
    server.put('/api/:model', restHandler('modificate'));
    server.del('/api/:model/:id', restHandler('delete'));
    //Generate REST endopints *end*

    //Custom endpoints
    server.put('/api/InspectionOrder/close', mongoose.model('InspectionOrder').custom.close);
};

module.exports = {
    applyRoutes: applyRoutes
};
