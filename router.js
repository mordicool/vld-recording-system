/**
 * Created by מרדכי on 09 אוגוסט 2016.
 */

var logger = require('./modules/logger');
var fileHandler = require('./modules/fileHandler');
var express = require('express');
var router = express.Router();
var q = require('q');

router.get('/', function (req, res) {
    res.redirect('/index.html');
});

router.post('/api/uploadFile', function (req, res) {
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
});

module.exports = router;