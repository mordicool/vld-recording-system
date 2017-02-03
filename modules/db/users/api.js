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
    return sharedDbQueries.editDocumentByName(schema, userName, 'password', newPassword);
}