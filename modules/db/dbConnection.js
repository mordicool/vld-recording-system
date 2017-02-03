/**
 * Created by מרדכי on 29 ינואר 2017.
 */

var config = require('../../config');
var logger = require('../logger');
var mongoose = require('mongoose');
var q = require('q');
mongoose.Promise = q.Promise;

module.exports = {
    connect: connect,
    disconnect: disconnect
};

function connect() {
    var db = mongoose.connection;
    db.on('connected', function () {
        logger.debug('Mongoose default connection open to ' + config.db.url);
    });
    db.on('error',function (err) {
        logger.error('Mongoose default connection error: ' + err);
    });
    db.on('disconnected', function () {
        logger.debug('Mongoose default connection disconnected');
    });
    process.on('SIGINT', function() {
        db.close(function () {
            logger.debug('Mongoose default connection disconnected through app termination');
            process.exit(0);
        });
    });

    mongoose.connect(config.db.url);
}

function disconnect() {
    mongoose.disconnect();
}