/**
 * Created by מרדכי on 02 ינואר 2017.
 */

var config = require('../config');
var express = require('express');
var logger = require('../modules/logger');
var passwords = require('../data/passwords.json');
var q = require('q');
var router = express.Router();

router.get('/login', login);
router.get('/logout', logout);

module.exports = router;

/********************************************************************************************/

function login(req, res) {
    var password = req.query.password;
    if (password == passwords.adminPassword && !req.cookies.password) {
        res.cookie('password', config.authentication.adminUser.cookieValue, {maxAge: config.authentication.adminUser.cookieMaxAge})
            .sendStatus(200);
    } else if(password == passwords.inspectorPassword && !req.cookies.password) {
        res.cookie('password', config.authentication.inspectorUser.cookieValue, {maxAge: config.authentication.inspectorUser.cookieMaxAge})
            .sendStatus(205);
    } else if(password == passwords.userPassword && !req.cookies.password) {
        res.cookie('password', config.authentication.regularUser.cookieValue, {maxAge: config.authentication.regularUser.cookieMaxAge})
            .sendStatus(200);
    } else {
        logger.warn('User entered wrong password. password entered: ' + password);
        res.sendStatus(400);
    }
}

function logout(req, res) {
    res.clearCookie('password')
        .redirect('/');
}