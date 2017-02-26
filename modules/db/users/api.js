/**
 * Created by מרדכי on 30 ינואר 2017.
 */

var schema = require('./schema');
var sharedDbQueries = require('../sharedDbQueries');

module.exports = {
    authenticateUser,
    changePassword
};

function authenticateUser(username, password) {
    return sharedDbQueries.authenticateUser(schema, username, password)
        .then((document) => {
            if (document) {
                return document.type;
            } else {
                return false;
            }
        });
}
function changePassword(userName, newPassword) {
    return sharedDbQueries.editDocumentByName(schema, userName, 'password', newPassword);
}