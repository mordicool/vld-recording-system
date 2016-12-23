/**
 * Created by מרדכי on 28 אוקטובר 2016.
 */

var config = require('../config');
var fs = require('fs');
var q = require('q');
var logger = require('./logger');
var path = require('path');
var s3fsImplementation = require('./s3fsImplementation');

function upload(filePath) {
    var deferred = q.defer();

    if (config.uploadToAmazon.applyModule == false) {
        logger.debug('Uploading to amazon did not occur, do to false configuration.');
        deferred.resolve(filePath);
    } else {
        var fileStream = fs.createReadStream(filePath);
        var fileDirectory = filePath.slice(filePath.indexOf(config.uploadsFolder) + config.uploadsFolder.length);
        var uploadUrl = config.uploadToAmazon.prefix + fileDirectory;

        s3fsImplementation.writeFile(uploadUrl, fileStream)
            .then(function () {
                logger.debug('Uploading to amazon finished successfully. upload url: ' + uploadUrl);
                deferred.resolve(filePath);
            });
    }

    return deferred.promise;
}

module.exports.upload = upload;