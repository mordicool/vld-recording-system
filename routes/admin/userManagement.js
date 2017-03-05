/**
 * Created by מרדכי on 27 פברואר 2017.
 */

const api = require('../../modules/db/users/api');
const config = require('../../config');
const adminCookie = config.authentication.ADMIN.cookieValue;
const logger = require('../../modules/logger');
const passwordValidator = require('../../modules/passwordValidator');
const router = require('express').Router();

router.get('/', getAllUserNames);
router.get('/changePassword', changePassword);
router.get('/createUser', createUser);
router.get('/deleteUser', deleteUser);

module.exports = router;

/********************************************************************************************/

function getAllUserNames(req, res) {
    const cookie = req.cookies.password;
    if (cookie == adminCookie) {
        api.getAllUsers()
            .then((documents) => {
                logger.debug('Served all users names.');
                res.status(200).json(documents.map(doc => doc.name));
            }).fail((error) => {
            logger.error('Error while serving all user names. Error: ' + JSON.stringify(error));
            res.sendStatus(500);
        });
    } else {
        logger.warn('Invalid cookie sent. cookie: ' + cookie);
        res.sendStatus(400);
    }
}

function changePassword(req, res) {
    const cookie = req.cookies.password,
        {username, newPassword} = req.query;
    if (cookie == adminCookie) {
        if (!passwordValidator(newPassword)) {
            logger.warn('Invalid password. Username: ' + username + '; New password: ' + newPassword);
            res.sendStatus(400);
            return;
        }
        api.changePassword(username, newPassword)
            .then(() => {
                logger.info('Password changed. Username: ' + username + '; New password: ' + newPassword);
                res.sendStatus(200);
            }).fail((error) => {
            logger.error('Error while changing user\'s password. ' +
                'Username: ' + username +
                '; New password: ' + newPassword +
                '; Error: ' + JSON.stringify(error));
            res.sendStatus(500);
        });
    } else {
        logger.warn('Invalid cookie sent. cookie: ' + cookie);
        res.sendStatus(400);
    }
}

function createUser(req, res) {
    const cookie = req.cookies.password;
    let {username, password, type} = req.query;
    if (type !== 'UPLOAD' || type !== 'ADMIN')
        type = 'DOWNLOAD';
    if (cookie == adminCookie) {
        if (!passwordValidator(password)) {
            logger.warn('Invalid password. Username: ' + username + '; New password: ' + password + '; Type: ' + type);
            res.sendStatus(400);
            return;
        }
        api.createNewUser(username, password, type)
            .then(() => {
                logger.info('New user created. Username: ' + username + '; Password: ' + password + '; Type: ' + type);
                res.sendStatus(200);
            }).fail((error) => {
            logger.error('Error while creating a new user. ' +
                'Username: ' + username +
                '; Password: ' + newPassword +
                '; Type: ' + type +
                '; Error: ' + JSON.stringify(error));
            res.sendStatus(500);
        });
    } else {
        logger.warn('Invalid cookie sent. cookie: ' + cookie);
        res.sendStatus(400);
    }
}

function deleteUser(req, res) {
    const cookie = req.cookies.password,
        {username} = req.query;
    if (cookie == adminCookie) {
        api.deleteUser(username)
            .then(() => {
                logger.info('User deleted. Username: ' + username);
                res.sendStatus(200);
            }).fail((error) => {
            logger.error('Error while deleting a user. Username: ' + username + '; Error: ' + JSON.stringify(error));
            res.sendStatus(500);
        });
    } else {
        logger.warn('Invalid cookie sent. cookie: ' + cookie);
        res.sendStatus(400);
    }
}