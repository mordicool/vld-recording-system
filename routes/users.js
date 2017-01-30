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
    var password = req.query.password;

    api.getPasswords().then(function (passwords) {
        if (password == passwords[2].password) {
            res.cookie('password', config.authentication.adminUser.cookieValue, {maxAge: config.authentication.adminUser.cookieMaxAge})
                .sendStatus(200);
        } else if(password == passwords[1].password) {
            res.cookie('password', config.authentication.inspectorUser.cookieValue, {maxAge: config.authentication.inspectorUser.cookieMaxAge})
                .sendStatus(205);
        } else if(password == passwords[0].password) {
            res.cookie('password', config.authentication.regularUser.cookieValue, {maxAge: config.authentication.regularUser.cookieMaxAge})
                .sendStatus(200);
        } else {
            logger.warn('User entered wrong password. password entered: ' + password);
            res.sendStatus(400);
        }
    });
}

function logout(req, res) {
    logger.debug('User logged out.');
    res.clearCookie('password')
        .redirect('/');
}