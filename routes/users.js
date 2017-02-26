/**
 * Created by מרדכי on 02 ינואר 2017.
 */

var config = require('../config');
var logger = require('../modules/logger');
var api = require('../modules/db/users/api');
var q = require('q');
var router = require('express').Router();

router.get('/login', login);
router.get('/logout', logout);

module.exports = router;

/********************************************************************************************/

function login(req, res) {
    var username = req.query.username;
    var password = req.query.password;

    api.authenticateUser(username, password).then(function (userType) {
        if (!userType) {
            logger.warn('User entered wrong username or password. Username: ' + username + ', Password: ' + password);
            res.sendStatus(400);
        } else {
            let userConfig, status;
            switch (userType) {
                case "ADMIN":
                    userConfig = config.authentication.ADMIN;
                    status = 200;
                    break;
                case "UPLOAD":
                    userConfig = config.authentication.UPLOAD;
                    status = 200;
                    break;
                default:
                case "DOWNLOAD":
                    userConfig = config.authentication.DOWNLOAD;
                    status = 205;
                    break;
            }
            res.cookie('password', userConfig.cookieValue, {maxAge: userConfig.cookieMaxAge}).sendStatus(status);
        }
    });
}

function logout(req, res) {
    logger.debug('User logged out.');
    res.clearCookie('password')
        .redirect('/');
}