/**
 * Created by מרדכי on 01 ספטמבר 2016.
 */

var config = require('../config');
var fs = require('fs');
var logger = require('./logger');
var q = require('q');
var randomNumberGenerator = require('../modules/randomNumberGenerator');

function redirectFilePath(file) {
    var deferred = q.defer();

    q.fcall(getRedirectedFilePath, file)
        .then(function (redirectedPath) {
            fs.renameSync(file.path, redirectedPath);
            logger.debug('File path redirected successfully. file: ' + redirectedPath);
            deferred.resolve(redirectedPath);
        })
        .fail(function (error) {
            logger.debug('File path is not redirected, do not now why..');
            deferred.reject(error);
        });

    return deferred.promise;
}

function getRedirectedFilePath(file) {
    var deferred = q.defer();

    var RecordingInfo = JSON.parse(file.name);
    var filePath = config.uploadsFolder + RecordingInfo.path.split('/').join('-') + '-' + RecordingInfo.subject;
    fs.stat(filePath + RecordingInfo.fileExtension, function (err, stat) {
        if (err == null) { // File exists already! Adding a random number to the file name to avoid conflict.
            filePath += randomNumberGenerator.generateRandomNumber();
            logger.debug('Adding a random number to the file name to avoid conflict between duplicate file names.');
        } else if (err.code == 'ENOENT') { // File does not exist
        } else {
            deferred.reject(err);
        }
        deferred.resolve(filePath + RecordingInfo.fileExtension);
    });

    return deferred.promise;
}

module.exports.redirectFilePath = redirectFilePath;
