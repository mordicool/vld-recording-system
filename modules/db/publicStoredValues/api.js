/**
 * Created by מרדכי on 31 ינואר 2017.
 */

var dbConnection = require('../dbConnection');
var logger = require('../../logger');
var q = require('q');
var schema = require('./schema');
var sharedDbQueries = require('../sharedDbQueries');

module.exports = {
    changeTree: changeTree,
    getTree: getTree,
    getLecturers: getLecturers
};

function changeTree(newTree) {
    var deferred = q.defer();
    dbConnection.connect().then(function (db) {
        schema.findOne({name: 'jstree'}, function (err, jstree) {
            jstree.value = newTree;
            jstree.save(function (error) {
                if (error) {
                    logger.error('Error while changing tree form.');
                    deferred.reject(error);
                } else {
                    logger.info('Tree changed successfully.');
                    deferred.resolve();
                }
                dbConnection.disconnect(db);
            });
        });
    });
    return deferred.promise;
}
function getTree() {
    return sharedDbQueries.getDocumentByName(schema, 'jstree');
}
function getLecturers() {
    return sharedDbQueries.getDocumentByName(schema, 'lecturers');
}