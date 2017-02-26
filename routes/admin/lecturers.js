/**
 * Created by מרדכי on 02 ינואר 2017.
 */

var api = require('../../modules/db/publicStoredValues/api');
var config = require('../../config');
var logger = require('../../modules/logger');
var router = require('express').Router();

router.get('/add', addNewLecturer);
router.get('/remove', removeLecturer);

module.exports = router;

/********************************************************************************************/

function addNewLecturer(req, res) {
    if (req.cookies.password !== config.authentication.adminUser.cookieValue) {
        logger.warn('Did not add a new lecturer, do to non authenticated user. redirected to login page.');
        res.sendStatus(400);
    } else {
        var newLecturer = req.query.newLecturer;
        api.getLecturers().then(function (lecturers) {
            lecturers = lecturers.value;
            var indexOfLecturer = lecturers.indexOf(newLecturer);
            if (indexOfLecturer !== -1) {
                logger.warn('Lecturer not added. Name exists already.. Lecturer name: ' + newLecturer);
                res.sendStatus(400);
            } else {
                lecturers.push(newLecturer);
                api.changeLecturers(lecturers).then(function () {
                    logger.info('New lecturer added successfully; Lecturer name: ' + newLecturer);
                    res.sendStatus(200);
                })
            }
        });
    }
}
function removeLecturer(req, res) {
    if (req.cookies.password !== config.authentication.ADMIN.cookieValue) {
        logger.warn('Did not remove a lecturer do to non authenticated user. redirected to login page.');
        res.sendStatus(400);
    } else {
        var newLecturer = req.query.newLecturer;
        api.getLecturers().then(function (lecturers) {
            lecturers = lecturers.value;
            var indexOfLecturer = lecturers.indexOf(newLecturer);
            if (indexOfLecturer == -1) {
                logger.warn('Lecturer not removed. Wrong name.. Lecturer name: ' + newLecturer);
                res.sendStatus(400);
            } else {
                lecturers.splice(indexOfLecturer, 1);
                api.changeLecturers(lecturers).then(function () {
                    logger.info('Lecturer removed successfully; Lecturer name: ' + newLecturer);
                    res.sendStatus(200);
                })
            }
        });
    }
}