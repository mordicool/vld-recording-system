/**
 * Created by מרדכי on 02 ינואר 2017.
 */

var config = require('../../config');
var express = require('express');
var fs = require('fs');
var logger = require('../../modules/logger');
var path = require('path');
var router = express.Router();

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
        var lecturers = require('../../public/data/lecturers.json').lecturers;
        var indexOfLecturer = lecturers.indexOf(newLecturer);
        if (indexOfLecturer !== -1) {
            logger.warn('Lecturer not added. Name exists already.. Lecturer name: ' + newLecturer);
            res.sendStatus(400);
        } else {
            lecturers.push(newLecturer);
            var stringData = JSON.stringify({"lecturers": lecturers});
            fs.writeFileSync(path.join(__dirname, '../../public/data/lecturers.json'), stringData);

            logger.info('New lecturer added successfully; Lecturer name: ' + newLecturer);
            res.sendStatus(200);
        }
    }
}

function removeLecturer(req, res) {
    if (req.cookies.password !== config.authentication.adminUser.cookieValue) {
        logger.warn('Did not remove a lecturer do to non authenticated user. redirected to login page.');
        res.sendStatus(400);
    } else {
        var newLecturer = req.query.newLecturer;
        var lecturers = require('../../public/data/lecturers.json').lecturers;
        var indexOfLecturer = lecturers.indexOf(newLecturer);
        if (indexOfLecturer == -1) {
            logger.warn('Lecturer not removed. Wrong name.. Lecturer name: ' + newLecturer);
            res.sendStatus(400);
        } else {
            lecturers.splice(indexOfLecturer, 1);
            var stringData = JSON.stringify({"lecturers": lecturers});
            fs.writeFileSync(path.join(__dirname, '../../public/data/lecturers.json'), stringData);

            logger.info('Lecturer removed successfully; Lecturer name: ' + newLecturer);
            res.sendStatus(200);
        }
    }
}