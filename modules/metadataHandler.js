/**
 * Created by מרדכי on 12 אוגוסט 2016.
 */

var nextTrackNumberProvider = require('./nextTrackNumberProvider');
var config = require('../config');
var ffmetadata = require('ffmetadata');
var fs = require('fs');
var logger = require('./logger');
var path = require('path');
var q = require('q');

function addMetadataToFile(file, filePath) {
    var deferred = q.defer();

	if(config.metadata.applyModule == false) {
        logger.debug('Metadata is not written, do to false configuration.');
		deferred.resolve(filePath);
	} else {
        var recordingInfo = JSON.parse(file.name);
        var extensionName = path.extname(filePath).toLowerCase();

        var fileDirectory = filePath.slice(filePath.indexOf(config.uploadsFolder) + config.uploadsFolder.length);
        var realFilePath = fileDirectory.split('-').join('/');

        nextTrackNumberProvider.getNextTrackNumberInFolder(path.dirname(realFilePath), path.basename(realFilePath))
            .then(function (trackNumber) {
                var newFilePath = path.dirname(filePath) + '/' + path.dirname(realFilePath).split('/').join('-') + '-' + trackNumber + '. ' + path.basename(realFilePath);
                fs.renameSync(filePath, newFilePath);
                filePath = newFilePath;

                return trackNumber;
            })
            .then(function (trackNumber) {
                if (extensionName !== '.mp3' && extensionName !== '.mp4') {
                    logger.debug('Metadata is not written, do to non .mp3 or .mp4 file extension.');
                    deferred.resolve(filePath);
                } else {
                    var metadata = {
                        artist: recordingInfo.lecturer,
                        track: trackNumber,
                        date: config.metadata.currentYear,
                        album: path.dirname(realFilePath).split('/').pop()
                    };
                    var options = {
                        "id3v2.3": true
                    };
                    ffmetadata.write(filePath, metadata, options, function (error) {
                        if (error) {
                            throw error;
                        } else {
                            logger.debug('Metadata written successfully. file path: ' + filePath + '; metadata: ' + JSON.stringify(metadata));
                            deferred.resolve(filePath);
                        }
                    });
                }
            });
    }

    return deferred.promise;
}

module.exports.addMetadataToFile = addMetadataToFile;
