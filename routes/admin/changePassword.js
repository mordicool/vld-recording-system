/**
 * Created by מרדכי on 03 ינואר 2017.
 */

var api = require('../../modules/db/users/api');
var config = require('../../config');
var logger = require('../../modules/logger');
var router = require('express').Router();

router.get('/uploadDownload', changeUserUploadDownloadPassword);
router.get('/download', changeUserDownloadPassword);
router.get('/admin', changeAdminPassword);

module.exports = router;

/********************************************************************************************/

function changeUserUploadDownloadPassword(req, res) {
    changePasswordByUserType(req, res, 'general');
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
            api.changePassword(userType, newPassword)
                .then(function () {
                    logger.info('Changed ' + userName + ' password successfully; New password: ' + newPassword);
                    res.sendStatus(200);
                })
                .fail(function (error) {
                    res.sendStatus(500);
                });
        }
    }
}