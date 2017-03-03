/**
 * Created by מרדכי on 30 ינואר 2017.
 */

const logger = require('../../logger');
const q = require('q');
const schema = require('./schema');
const sharedDbQueries = require('../sharedDbQueries');

module.exports = {
    getAllUsers,
    authenticateUser,
    logUsernameEntry,
    changePassword,
    createNewUser,
    deleteUser
};

function logUsernameEntry(name) {
    schema.findOne({name}, function (error, document) {
        if (error) {
            logger.error('Error while finding username for logging entry to db. Username: $s. Error: %s', name, JSON.stringify(error));
        } else {
            document.numberOfEntries = document.numberOfEntries + 1;
            document.save();
        }
    });
}

function authenticateUser(name, password) {
    return authenticateUserLogic(name, password)
        .then((document) => {
            if (document) {
                return document.type;
            } else {
                return false;
            }
        });
}

function getAllUsers() {
    return sharedDbQueries.getAllDocumentsBySchema(schema);
}

function changePassword(username, newPassword) {
    return sharedDbQueries.editDocumentByName(schema, username, 'password', newPassword);
}

function createNewUser(name, password, type) {
    var deferred = q.defer();
    const numberOfEntries = 0;
    schema.insertMany([{name, password, type, numberOfEntries}], function (error) {
        if (error) {
            logger.error('Error while inserting a new user into db. Username: $s ; Password: %s ; Type: %s. Error: %s', name, password, type, JSON.stringify(error));
            deferred.reject(error);
        } else {
            deferred.resolve();
        }
    });
    return deferred.promise;
}

function deleteUser(name) {
    var deferred = q.defer();
    schema.findOneAndRemove({name}, function (error) {
        if (error) {
            logger.error('Error while removing a user from db. Username: $s. Error: %s', name, JSON.stringify(error));
            deferred.reject(error);
        } else {
            deferred.resolve();
        }
    });
    return deferred.promise;
}

// ********************** HELP FUNCTIONS ********************* //

function authenticateUserLogic(name, password) {
    var deferred = q.defer();
    schema.findOne({name, password}, function (error, document) {
        if (error) {
            logger.error('Error while authenticate user from db. Username: $s ; Password: %s. Error: %s', name, password, JSON.stringify(error));
            deferred.reject(error);
        } else {
            deferred.resolve(document);
        }
    });
    return deferred.promise;
}