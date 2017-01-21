/**
 * Created by מרדכי on 03 ינואר 2017.
 */

var config = require('../../config');
var express = require('express');
var fs = require('fs');
var logger = require('../../modules/logger');
var path = require('path');
var router = express.Router();

router.get('/uploadDownload', changeUserUploadDownloadPassword);
router.get('/download', changeUserDownloadPassword);
router.get('/admin', changeAdminPassword);

module.exports = router;

/********************************************************************************************/

function changeUserUploadDownloadPassword(req, res) {
    changePasswordByUserType(req, res, 'user');
}
function changeUserDownloadPassword(req, res) {
    changePasswordByUserType(req, res, 'inspector');
}
function changeAdminPassword(req, res) {
    changePasswordByUserType(req, res, 'admin');
}

function changePasswordByUserType(req, res, userType) {
    if (req.cookies.password !== config.authentication.adminUser.cookieValue) {
        logger.warn('Did not change ' + userType + ' password, do to non authenticated user. redirected to login page.');
        res.sendStatus(400);
    } else {
        var newPassword = req.query.newPassword;
        var specialCharacters = /^((?![\\/:?\"<>\|`~!@#%&$^*\(\)\{\}\[\]\-_+=;'.,]).)*$/i; // Doesn't contain any special characters
        var capitalLetters = /^((?![A-Z]).)*$/i; // Doesn't contain any special characters

        if (newPassword.length < 8 || specialCharacters.test(newPassword) || capitalLetters.test(newPassword)) {
            res.sendStatus(400);
        } else {
            var passwords = require('../../data/passwords.json');
            changePassword(passwords, newPassword, userType);
            var stringData = JSON.stringify(passwords);
            fs.writeFileSync(path.join(__dirname, '../../data/passwords.json'), stringData);

            logger.info('Changed ' + userType + ' password successfully; New password: ' + newPassword);
            res.sendStatus(200);
        }
    }
}

function changePassword(passwords, newPassword, userType) {
    if (userType == 'user') {
        passwords.userPassword = newPassword;
    } else if (userType == 'inspector') {
        passwords.inspectorPassword = newPassword;
    } else if (userType == 'admin') {
        passwords.adminPassword = newPassword;
    }
}