/**
 * Created by מרדכי on 29 ינואר 2017.
 */

var config = require('../../config');
var logger = require('../logger');
var q = require('q');

var dbConfig = config.db;
var url = 'mongodb://' + dbConfig.user + ':' +
    dbConfig.password + '@' +
    dbConfig.host + ':' +
    dbConfig.port + '/' +
    dbConfig.dbName;

module.exports = {
    connect: connect,
    disconnect: disconnect
};

function connect() {
    var deferred = q.defer();

    var db = require('mongoose');
    db.createConnection(url);
    db.connection.on('error', function (error) {
        logger.error('An error occurred in connection to db. Error: ' + error);
    });
    deferred.resolve(db);

    return deferred.promise;
}

function disconnect(db) {
    db.disconnect();
}