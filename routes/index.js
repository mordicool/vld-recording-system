/**
 * Created by מרדכי on 09 אוגוסט 2016.
 */

var config = require('../config');
var express = require('express');
var path = require('path');
var router = express.Router();
var uploadRoute = require('./upload');
var usersRoute = require('./users');
var adminRoute = require('./admin');

router.get('/', serveIndexPage);
router.use('/upload', uploadRoute);
router.use('/users', usersRoute);
router.use('/admin', adminRoute);

module.exports = router;

/********************************************************************************************/

function serveIndexPage(req, res) {
    var password = req.cookies.password;
    if (password == config.authentication.adminUser.cookieValue) {
        res.sendFile('public/pages/admin.html', {root: path.join(__dirname, '../')});
    } else if(password == config.authentication.regularUser.cookieValue) {
        res.sendFile('public/pages/index.html', {root: path.join(__dirname, '../')});
    } else {
        res.sendFile('public/pages/login.html', {root: path.join(__dirname, '../')});
    }
}