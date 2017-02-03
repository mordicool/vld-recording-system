/**
 * Created by מרדכי on 09 אוגוסט 2016.
 */

var api = require('../modules/db/publicStoredValues/api');
var adminRoute = require('./admin');
var config = require('../config');
var logger = require('../modules/logger');
var path = require('path');
var router = require('express').Router();
var recordingsViewRoute = require('./recordingsView');
var uploadRoute = require('./upload');
var usersRoute = require('./users');

router.get('/', serveIndexPage);
router.get('/getTree', serveTree);
router.get('/getLecturers', serveLecturers);
router.use('/admin', adminRoute);
router.use('/recordingsView', recordingsViewRoute);
router.use('/upload', uploadRoute);
router.use('/users', usersRoute);

module.exports = router;

/********************************************************************************************/

function serveIndexPage(req, res) {
    var password = req.cookies.password;
    if (password == config.authentication.adminUser.cookieValue) {
        logger.debug('User entered admin page.');
        res.sendFile('public/pages/admin.html', {root: path.join(__dirname, '../')});
    } else if(password == config.authentication.generalUser.cookieValue) {
        logger.debug('User entered index page.');
        res.sendFile('public/pages/index.html', {root: path.join(__dirname, '../')});
    } else {
        logger.debug('User entered login page.');
        res.clearCookie('password')
            .sendFile('public/pages/login.html', {root: path.join(__dirname, '../')});
    }
}

function serveTree(req, res) {
    var validPasswords = [];
    validPasswords.push(config.authentication.generalUser.cookieValue);
    validPasswords.push(config.authentication.adminUser.cookieValue);
    if (validPasswords.indexOf(req.cookies.password) == -1) {
        logger.warn('Did not serve tree, do to non authenticated user. redirected to login page.');
        res.sendStatus(400);
    } else {
        api.getTree()
            .then(function (treeDocument) {
                res.status(200).json(treeDocument.value);
            })
            .fail(function () {
                res.sendStatus(500);
            })
    }
}

function serveLecturers(req, res) {
    var validPasswords = [];
    validPasswords.push(config.authentication.generalUser.cookieValue);
    validPasswords.push(config.authentication.adminUser.cookieValue);
    if (validPasswords.indexOf(req.cookies.password) == -1) {
        logger.warn('Did not serve lecturers, do to non authenticated user. redirected to login page.');
        res.sendStatus(400);
    } else {
        api.getLecturers()
            .then(function (lecturersDocument) {
                res.status(200).json(lecturersDocument.value.sort());
            })
            .fail(function () {
                res.sendStatus(500);
            })
    }
}