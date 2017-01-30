/**
 * Created by מרדכי on 09 אוגוסט 2016.
 */

var adminRoute = require('./admin');
var config = require('../config');
var logger = require('../modules/logger');
var path = require('path');
var router = require('express').Router();
var recordingsViewRoute = require('./recordingsView');
var uploadRoute = require('./upload');
var usersRoute = require('./users');

router.get('/', serveIndexPage);
router.use('/admin', adminRoute);
router.use('/recordingsView', recordingsViewRoute);
router.use('/upload', uploadRoute);
router.use('/users', usersRoute);

module.exports = router;

/********************************************************************************************/

function serveIndexPage(req, res) {
    var password = req.cookies.password;
    if (password == config.authentication.adminUser.cookieValue) {
        logger.debug('User entered admin page.');
        res.sendFile('public/pages/admin.html', {root: path.join(__dirname, '../')});
    } else if(password == config.authentication.regularUser.cookieValue) {
        logger.debug('User entered index page.');
        res.sendFile('public/pages/index.html', {root: path.join(__dirname, '../')});
    } else {
        logger.debug('User entered login page.');
        res.clearCookie('password')
            .sendFile('public/pages/login.html', {root: path.join(__dirname, '../')});
    }
}