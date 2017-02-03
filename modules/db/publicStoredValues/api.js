/**
 * Created by מרדכי on 31 ינואר 2017.
 */

var schema = require('./schema');
var sharedDbQueries = require('../sharedDbQueries');

module.exports = {
    changeTree: changeTree,
    changeLecturers: changeLecturers,
    getTree: getTree,
    getLecturers: getLecturers
};

function changeLecturers(newLecturers) {
    return sharedDbQueries.editDocumentByName(schema, 'lecturers', 'value', newLecturers);
}
function changeTree(newTree) {
    return sharedDbQueries.editDocumentByName(schema, 'jstree', 'value', newTree);
}
function getTree() {
    return sharedDbQueries.getDocumentByName(schema, 'jstree');
}
function getLecturers() {
    return sharedDbQueries.getDocumentByName(schema, 'lecturers');
}