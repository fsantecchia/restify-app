'use strict';

const mongoose = require('mongoose');

module.exports = {
    create: function (request, response) {
        let model = request.params.model;
        let mongooseModel = mongoose.model(model);
        let props = request.body;
        console.log(props)
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
    findAll: function (request, response) {
        let model = request.params.model;
        let mongooseModel = mongoose.model(model);

        mongooseModel.find().then(function (data) {
            response.send(data);
        });
    },
    findById: function (request, response) {
        let id = request.params.id;
        let model = request.params.model;
        let mongooseModel = mongoose.model(model);

        mongooseModel.findById(id).then(function (data) {
            response.send(data);
        });
    },
    update: function () {

    }
};
