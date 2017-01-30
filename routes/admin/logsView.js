/**
 * Created by מרדכי on 23 ינואר 2017.
 */

var api = require('../../modules/db/logs/api');
var config = require('../../config');
var express = require('express');
var fs = require('fs');
var logger = require('../../modules/logger');
var path = require('path');
var router = express.Router();

// router.get('/', serveLogs);
router.get('/', serveLogsFromDb);

module.exports = router;

/********************************************************************************************/

// function serveLogs(req, res) {
//     if (req.cookies.password !== config.authentication.adminUser.cookieValue) {
//         logger.warn('Did not serve logs, do to non authenticated user. redirected to login page.');
//         res.sendStatus(400);
//     } else {
//         var logsPath = path.join(__dirname, '../../', config.logger.debugLogFileName);
//         var logs = fs.readFileSync(logsPath, 'utf8');
//
//         var logsObject = {
//             logs: logs.split(/\r?\n/)
//         };
//
//         logger.debug('Served logs to admin page.');
//         res.json(logsObject);
//     }
// }

function serveLogsFromDb(req, res) {
    if (req.cookies.password !== config.authentication.adminUser.cookieValue) {
        logger.warn('Did not serve logs, do to non authenticated user. redirected to login page.');
        res.sendStatus(400);
    } else {
        api.getAllLogs()
            .then(function (logs) {
                logger.debug('Served logs to admin page.');
                res.status(200).json(logs);
            })
            .fail(function () {
                res.sendStatus(500);
            });
    }
}