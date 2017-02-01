/**
 * Created by מרדכי on 30 ינואר 2017.
 */

var dbConnection = require('../dbConnection');
var logger = require('../../logger');
var q = require('q');
var schema = require('./schema');
var sharedDbQueries = require('../sharedDbQueries');

module.exports = {
    getPasswords: getPasswords,
    changePassword: changePassword
};

function getPasswords() {
    return sharedDbQueries.getAllDocumentsBySchema(schema);
}

function changePassword(userName, newPassword) {
    var deferred = q.defer();
    dbConnection.connect().then(function (db) {
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
                dbConnection.disconnect(db);
            });
        });
    });
    return deferred.promise;
}