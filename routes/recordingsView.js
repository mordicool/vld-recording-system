/**
 * Created by מרדכי on 07 ינואר 2017.
 */

var config = require('../config');
var downloaderHandler = require('../modules/downloadFile/downloaderHandler');
var logger = require('../modules/logger');
var path = require('path');
var recordingsTreeGenerator = require('../modules/downloadFile/recordingsTreeGenerator');
var router = require('express').Router();
var S3FS = require('../modules/s3fsImplementation');

router.get('/', serveRecordingsViewPage);
router.get('/getTree', getRecordingsTree);
router.get('/downloadFile', downloadFile);

module.exports = router;

/********************************************************************************************/

function serveRecordingsViewPage(req, res) {
    var validPasswords = [];
    validPasswords.push(config.authentication.generalUser.cookieValue);
    validPasswords.push(config.authentication.inspectorUser.cookieValue);
    if (validPasswords.indexOf(req.cookies.password) == -1) {
        logger.warn('Did not serve recordings view page, do to non authenticated user. redirected to login page.');
        res.redirect('/');
    } else {
        logger.debug('User entered recordings view page.');
        res.sendFile('public/pages/recordingsView.html', {root: path.join(__dirname, '../')});
    }
}

function getRecordingsTree(req, res) {
    var validPasswords = [];
    validPasswords.push(config.authentication.generalUser.cookieValue);
    validPasswords.push(config.authentication.inspectorUser.cookieValue);
    if (validPasswords.indexOf(req.cookies.password) == -1) {
        logger.warn('Did not serve recordings view page, do to non authenticated user. redirected to login page.');
        res.redirect('/');
    } else {
        S3FS.readdirp(config.amazonModule.prefix)
        .then(function (files) {
            var recordingsTree = recordingsTreeGenerator.generateRecordingsTree(files);
            res.json(recordingsTree);
        });
    }
}

function downloadFile(req, res) {
    var validPasswords = [];
    validPasswords.push(config.authentication.generalUser.cookieValue);
    validPasswords.push(config.authentication.inspectorUser.cookieValue);
    if (validPasswords.indexOf(req.cookies.password) == -1) {
        logger.warn('Did not serve recordings view page, do to non authenticated user. redirected to login page.');
        res.redirect('/');
    } else {
        var path = req.query.path;
        if (!config.amazonModule.applyModule) {
            logger.debug('Downloading from amazon did not occur, do to false configuration.');
            res.sendStatus(400);
        } else {
            downloaderHandler.handelDownload(res, path);
        }
    }
}