/**
 * Created by מרדכי on 10 ינואר 2017.
 */

var config = require('../../config');
var logger = require('../logger');
var q = require('q');
var S3FS = require('../s3fsImplementation');

function downloadFile(filePath) {
    var deferred = q.defer();

    S3FS.readFile(filePath, function (err, data) {
        if (err) {
            deferred.reject('No data back from amazon. May be bad path.');
        } else {
            logger.debug('Read file from amazon. File name: ' + filePath);
            deferred.resolve(data);
        }
    });
    return deferred.promise;
}

module.exports = {
    downloadFile: downloadFile
};