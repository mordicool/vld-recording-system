/**
 * Created by מרדכי on 30 ינואר 2017.
 */

var logger = require('../logger');
var schema = require('./schema');
var sharedDbQueries = require('../sharedDbQueries');

module.exports = {
    authenticateUser,
    logUsernameEntry,
    changePassword,
    createNewUser,
    deleteUser
};

function logUsernameEntry(username) {
    schema.findOne({username}, function (error, document) {
        if (error) {
            logger.error('Error while finding username for logging entry to db. Username: $s. Error: %s', username, JSON.stringify(error));
            deferred.reject(error);
        } else {
            document.numberOfEntries = document.numberOfEntries + 1;
            document.save();
        }
    });
}

function authenticateUser(username, password) {
    return authenticateUserLogic(username, password)
        .then((document) => {
            if (document) {
                return document.type;
            } else {
                return false;
            }
        });
}

function changePassword(username, newPassword) {
    return sharedDbQueries.editDocumentByName(schema, username, 'password', newPassword);
}

function createNewUser(username, password, type) {
    var deferred = q.defer();
    const numberOfEntries = 0;
    schema.insert({username, password, type, numberOfEntries}, function (error) {
        if (error) {
            logger.error('Error while inserting a new user into db. Username: $s ; Password: %s ; Type: %s. Error: %s', username, password, type, JSON.stringify(error));
            deferred.reject(error);
        } else {
            deferred.resolve();
        }
    });
    return deferred.promise;
}

function deleteUser(username) {
    var deferred = q.defer();
    schema.findOneAndRemove({username}, function (error) {
        if (error) {
            logger.error('Error while removing a user from db. Username: $s. Error: %s', username, JSON.stringify(error));
            deferred.reject(error);
        } else {
            deferred.resolve();
        }
    });
    return deferred.promise;
}

// ********************** HELP FUNCTIONS ********************* //

function authenticateUserLogic(username, password) {
    var deferred = q.defer();
    schema.findOne({username, password}, function (error, document) {
        if (error) {
            logger.error('Error while authenticate user from db. Username: $s ; Password: %s. Error: %s', username, password, JSON.stringify(error));
            deferred.reject(error);
        } else {
            deferred.resolve(document);
        }
    });
    return deferred.promise;
}