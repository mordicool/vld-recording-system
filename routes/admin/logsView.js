/**
 * Created by מרדכי on 23 ינואר 2017.
 */

var config = require('../../config');
var express = require('express');
var fs = require('fs');
var logger = require('../../modules/logger');
var path = require('path');
var router = express.Router();

router.get('/', serveLogs);

module.exports = router;

/********************************************************************************************/

function serveLogs(req, res) {
    if (req.cookies.password !== config.authentication.adminUser.cookieValue) {
        logger.warn('Did not change tree, do to non authenticated user. redirected to login page.');
        res.sendStatus(400);
    } else {
        var logsPath = path.join(__dirname, '../../', config.logger.debugLogFileName);
        var logs = fs.readFileSync(logsPath, 'utf8');

        var logsObject = {
            logs: logs.split(/\r?\n/)
        };

        logger.debug('Served logs to admin page.');
        res.json(logsObject);
    }
}