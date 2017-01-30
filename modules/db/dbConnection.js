/**
 * Created by מרדכי on 29 ינואר 2017.
 */

var config = require('../../config');
var logger = require('../logger');
var mongoose = require('mongoose');
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
    mongoose.connect(url, function (error) {
        if (error) {
            logger.error('Connection to db failed. Error: ' + error);
            deferred.reject();
        } else {
            deferred.resolve();
        }
    });

    var db = mongoose.connection;
    db.on('error', function (error) {
        logger.error('An error occurred in connection to db. Error: ' + error);
    });

    return deferred.promise;
}

function disconnect() {
    var deferred = q.defer();
    mongoose.disconnect(deferred.resolve);
    return deferred.promise;
}