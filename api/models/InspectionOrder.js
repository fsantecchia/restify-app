module.exports = {
    mongooseModelName: 'InspectionOrder',
    schema: {
        title: 'string',
        body: 'string',
        inspectionType : { type: 'objectId', ref: 'InspectionType' }
    }
};
