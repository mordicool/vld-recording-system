/**
 * Created by מרדכי on 02 ינואר 2017.
 */

var config = require('../config');
var express = require('express');
var q = require('q');
var router = express.Router();

router.get('/login', login);
router.get('/logout', logout);

module.exports = router;

/********************************************************************************************/

function login(req, res) {
    var password = req.query.password;
    if (password == config.authentication.adminUser.password && !req.cookies.password) {
        res.cookie('password', config.authentication.adminUser.cookieValue, {maxAge: config.authentication.adminUser.cookieMaxAge})
            .sendStatus(200);
    } else if(password == config.authentication.regularUser.password && !req.cookies.password) {
        res.cookie('password', config.authentication.regularUser.cookieValue, {maxAge: config.authentication.regularUser.cookieMaxAge})
            .sendStatus(200);
    } else {
        res.sendStatus(400);
    }
}

function logout(req, res) {
    res.clearCookie('password')
        .redirect('/');
}