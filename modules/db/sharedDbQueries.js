/**
 * Created by מרדכי on 31 ינואר 2017.
 */

var logger = require('../logger');
var q = require('q');

module.exports = {
    getAllDocumentsBySchema: getAllDocumentsBySchema,
    getDocumentByName: getDocumentByName,
    editDocumentByName: editDocumentByName
};

function getAllDocumentsBySchema(schema) {
    var deferred = q.defer();
    schema.find(function (error, documents) {
        if (error) {
            logger.error('Error while receiving documents from db. Error: %s', JSON.stringify(error));
            deferred.reject(error);
        } else {
            deferred.resolve(documents);
        }
    });
    return deferred.promise;    
}

function getDocumentByName(schema, name) {
    var deferred = q.defer();
    schema.findOne({name: name}, function (error, document) {
        if (error) {
            logger.error('Error while receiving document $s from db. Error: %s', name, JSON.stringify(error));
            deferred.reject(error);
        } else {
            deferred.resolve(document);
        }
    });
    return deferred.promise;
}

function editDocumentByName(schema, name, propName, newDataForPropName) {
    var deferred = q.defer();
    schema.findOne({name: name}, function (error, document) {
        document[propName] = newDataForPropName;
        document.save(function (error) {
            if (error) {
                logger.error('Error while editing document of $s.', name);
                deferred.reject(error);
            } else {
                deferred.resolve();
            }
        });
    });
    return deferred.promise;
}