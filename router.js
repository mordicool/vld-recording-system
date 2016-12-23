/**
 * Created by מרדכי on 09 אוגוסט 2016.
 */

var express = require('express');
var fileHandler = require('./modules/fileHandler');
var logger = require('./modules/logger');
var q = require('q');
var router = express.Router();

router.get('/', serveIndexPage);
router.post('/api/uploadFile', uploadFile);

module.exports = router;

/********************************************************************************************/

function serveIndexPage(req, res) {
    res.redirect('/index.html');
}

function uploadFile(req, res) {
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