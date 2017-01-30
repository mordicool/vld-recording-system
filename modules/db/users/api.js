/**
 * Created by מרדכי on 30 ינואר 2017.
 */

var dbConnection = require('../dbConnection');
var logger = require('../../logger');
var q = require('q');
var schema = require('./schema');

module.exports = {
    getPasswords: getPasswords,
    changePassword: changePassword
};

function getPasswords() {
    var deferred = q.defer();
    dbConnection.connect().then(function () {
        schema.find(function (error, passwords) {
            if (error) {
                logger.error('Error while receiving passwords from db. Error: ' + error);
                deferred.reject(error);
            } else {
                deferred.resolve(passwords);
            }
            dbConnection.disconnect();
        });
    });
    return deferred.promise;
}

function changePassword(userName, newPassword) {
    var deferred = q.defer();
    dbConnection.connect().then(function () {
        schema.findOne({name: userName}, function (err, user) {
            user.password = newPassword;
            user.save(function (error) {
                if (error) {
                    logger.error('Error while changing password of user %s.', userName);
                    deferred.reject(error);
                } else {
                    logger.info('Changed ' + userName + ' password successfully; New password: ' + newPassword);
                    deferred.resolve();
                }
                dbConnection.disconnect();
            });
        });
    });
    return deferred.promise;
}