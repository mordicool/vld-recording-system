/**
 * Created by מרדכי on 10 ינואר 2017.
 */

var amazonFileDownloader = require('./amazonFileDownloader');
var config = require('../../config');
var downloadedFileSaver = require('./downloadedFileSaver');
var fileRemover = require('../fileRemover');
var logger = require('../logger');
var path = require('path');
var q = require('q');

function handelDownload(res, filePath) {
    var fullPath = path.join(config.amazonModule.prefix, filePath);
    var fileName = filePath.split('/').pop();

    q.fcall(amazonFileDownloader.downloadFile, fullPath)
        .then(function (file) {
            return downloadedFileSaver.saveFile(file, fileName);
        })
        .then(function (destinationPath) {
            var deferred = q.defer();
            res.download(destinationPath, fileName, function (err) {
                if (err) {
                    logger.error('Error when downloading a file. File name: ' + fullPath);
                    deferred.reject(err);
                } else {
                    logger.info('Download file finished successfully. File name: ' + fullPath);
                    deferred.resolve(destinationPath);
                }
            });
            return deferred.promise;
        })
        .then(fileRemover.removeFile)
        .fail(function (err) {
            logger.error('Error when receiving file to download. File name: ' + fullPath + '; Error: ' + JSON.stringify(err));
        });
}

module.exports = {
    handelDownload: handelDownload
};