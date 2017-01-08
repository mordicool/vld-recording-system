/**
 * Created by מרדכי on 07 ינואר 2017.
 */

var config = require('../config');
var express = require('express');
var logger = require('../modules/logger');
var path = require('path');
var recordingsTreeGenerator = require('../modules/recordingsTreeGenerator');
var router = express.Router();
var S3FS = require('../modules/s3fsImplementation');

router.get('/getTree', getRecordingsTree);
router.get('/', serveRecordingsViewPage);

module.exports = router;

/********************************************************************************************/

function getRecordingsTree(req, res) {
    if (req.cookies.password !== config.authentication.regularUser.cookieValue) {
        logger.warn('Did not send recordings tree, do to non authenticated user. redirected to login page.');
        res.sendStatus(400);
    } else {
        S3FS.readdirp(config.uploadToAmazon.prefix)
        .then(function (files) {
            var recordingsTree = recordingsTreeGenerator.generateRecordingsTree(files);
            res.json(recordingsTree);
        });
    }
}

function serveRecordingsViewPage(req, res) {
    if (req.cookies.password !== config.authentication.regularUser.cookieValue) {
        logger.warn('Did not serve recordings view page, do to non authenticated user. redirected to login page.');
        res.redirect('/');
    } else {
        res.sendFile('public/pages/recordingsView.html', {root: path.join(__dirname, '../')});
    }
}