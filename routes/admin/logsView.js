/**
 * Created by מרדכי on 23 ינואר 2017.
 */

var api = require('../../modules/db/logs/api');
var config = require('../../config');
var logger = require('../../modules/logger');
var router = require('express').Router();

router.get('/', serveLogsFromDb);

module.exports = router;

/********************************************************************************************/

function serveLogsFromDb(req, res) {
    if (req.cookies.password !== config.authentication.adminUser.cookieValue) {
        logger.warn('Did not serve logs, do to non authenticated user. redirected to login page.');
        res.sendStatus(400);
    } else {
        api.getAllLogs()
            .then(function (logs) {
                for (var i=0; i<logs.length; i++) {
                    logs[i]._doc.level = logs[i].level.levelStr;
                }

                logger.debug('Served logs to admin page.');
                res.status(200).json(logs);
            })
            .fail(function () {
                res.sendStatus(500);
            });
    }
}