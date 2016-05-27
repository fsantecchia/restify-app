'use strict';

const _ = require('lodash');
const mongoose = require('mongoose');

const getParsedQueryString = function (params) {
    let queryString = _.clone(params);

    //remove de url param in order to obtein the qs
    delete queryString.model;

    return queryString;
};

module.exports = {
    create: function (request, response) {
        let model = request.params.model;
        let mongooseModel = mongoose.model(model);
        let props = request.body;

        mongooseModel.create(props).then(function (data) {
            response.send(data);
        }).catch(function (data) {
            response.send(data);
        });

    },
    delete: function (request, response) {
        let id = request.params.id;
        let model = request.params.model;
        let mongooseModel = mongoose.model(model);

        mongooseModel.findByIdAndRemove(id).then(function (data) {
            response.send(data);
        });
    },
    find: function (request, response) {
        let model = request.params.model;
        let mongooseModel = mongoose.model(model);
        let query = getParsedQueryString(request.params);
        let promise = mongooseModel.find(query);

        if (mongooseModel.fieldsToPopulate) {
            promise.populate(mongooseModel.fieldsToPopulate);
        }

        promise.then(function (data) {
            response.send(data);
        });
    },
    findById: function (request, response) {
        let id = request.params.id;
        let model = request.params.model;
        let mongooseModel = mongoose.model(model);
        let promise = mongooseModel.find(id);

        if (mongooseModel.fieldsToPopulate) {
            promise.populate(mongooseModel.fieldsToPopulate);
        }

        promise.then(function (data) {
            response.send(data);
        });
    },
    update: function () {

    }
};
