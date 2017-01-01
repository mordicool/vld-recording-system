/**
 * Created by מרדכי on 09 אוגוסט 2016.
 */

var config = require('./config');
var express = require('express');
var fileHandler = require('./modules/fileHandler');
var logger = require('./modules/logger');
var q = require('q');
var router = express.Router();

router.get('/', serveIndexPage);
router.get('/api/login', tryLogin);
router.post('/api/uploadFile', uploadFile);

module.exports = router;

/********************************************************************************************/

function serveIndexPage(req, res) {
    if (req.cookies.password !== config.authentication.cookieValue) {
        res.sendFile(__dirname + '/public/pages/login.html');
    } else {
        res.sendFile(__dirname + '/public/pages/index.html');
    }
}

function tryLogin(req, res) {
    var password = req.query.password;
    if (password == config.authentication.password && !req.cookies.password) {
        res.cookie('password', config.authentication.cookieValue, {maxAge: config.authentication.cookieMaxAge})
            .sendStatus(200);
    } else {
        res.sendStatus(400);
    }
}

function uploadFile(req, res) {
    if (req.cookies.password !== config.authentication.cookieValue) {
        logger.warn('Did not upload the file do to non authenticated user. redirected to login page.');
        res.sendFile(__dirname + '/public/pages/login.html');
    } else {
        q.fcall(fileHandler.handleFile, req)
            .then(function (filePath) {
                logger.info('New record arrived. File name: ' + filePath);
                res.sendStatus(200);
            })
            .fail(function (error) {
                logger.error('Error while receiving a record. Error message: ' + error.message);
                res.sendStatus(500);
            })
            .done();
    }
}