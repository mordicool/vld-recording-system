/**
 * Created by מרדכי on 02 ינואר 2017.
 */

var config = require('../config');
var fileHandler = require('../modules/uploadFile/fileHandler');
var logger = require('../modules/logger');
var q = require('q');
var router = require('express').Router();

router.post('/', uploadFile);

module.exports = router;

/********************************************************************************************/

function uploadFile(req, res) {
    if (req.cookies.password !== config.authentication.generalUser.cookieValue) {
        logger.warn('Did not upload the file, do to non authenticated user. redirected to login page.');
        res.sendStatus(400);
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