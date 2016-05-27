'use strict';

const mongoose = require('mongoose');

const mongooseModelName = 'InspectionOrder';
const closeInspection = function (request, response) {
    let id = request.body.id;
    let mongooseModel = mongoose.model(mongooseModelName);

    mongooseModel.findByIdAndUpdate(id, { $set: { closed: true }}).then(function (data) {
        response.send(data);
    }).catch(function (data) {
        response.send(data);
    });
};

module.exports = {
    mongooseModelName: mongooseModelName,
    schema: {
        note: 'string',
        inspectionType: { type: 'objectId', ref: 'InspectionType', required: true },
        vehicle: {
            make: { type: 'string', required: true },
            model: { type: 'string', required: true },
            year: { type: 'number', required: true }
        },
        closed: { type: 'boolean', default: false }
    },
    statics: {
        close: closeInspection
    },
    populate: ['inspectionType']
};
