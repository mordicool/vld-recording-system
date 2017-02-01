/**
 * Created by מרדכי on 31 ינואר 2017.
 */

var dbConnection = require('./dbConnection');
var logger = require('../logger');
var q = require('q');

module.exports = {
    getAllDocumentsBySchema: getAllDocumentsBySchema,
    getDocumentByName: getDocumentByName
};

function getAllDocumentsBySchema(schema) {
    var deferred = q.defer();
    var promise = dbConnection.connect();

    console.log('HERE', promise);
    promise.then(function (db) {
        schema.find(function (error, documents) {
            if (error) {
                logger.error('Error while receiving documents from db. Error: %s', JSON.stringify(error));
                deferred.reject(error);
            } else {
                deferred.resolve(documents);
            }
            dbConnection.disconnect(db);
        });
    });
    return deferred.promise;
}

function getDocumentByName(schema, name) {
    var deferred = q.defer();
    dbConnection.connect().then(function (db) {
        schema.findOne({name: name}, function (err, document) {
            if (error) {
                logger.error('Error while receiving document from db. Error: %s', JSON.stringify(error));
                deferred.reject(error);
            } else {
                deferred.resolve(document);
            }
            dbConnection.disconnect(db);
        });
    });
    return deferred.promise;
}