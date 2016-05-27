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
        id: { type: 'number', required: false },
        note: 'string',
        orderNumber: { type: 'string', required: false },
        inspectionType: { type: 'objectId', ref: 'InspectionType', required: false },
        vehicle: {
            make: { type: 'string', required: false },
            model: { type: 'string', required: false },
            year: { type: 'number', required: false }
        },
        closed: {type: 'boolean', default: false}
    },
    statics: {
        close: closeInspection
    },
    populate: ['inspectionType']
};
