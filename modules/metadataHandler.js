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

	if(path.extname(filePath).toLowerCase() !== '.mp3' || config.metadata.applyModule == false) {
        logger.debug('Metadata is not written, do to wrong file extension OR do to false configuration.');
		deferred.resolve(filePath);
	} else {
        var recordingInfo = JSON.parse(file.name);

        nextTrackNumberProvider.getNextTrackNumberInFolder(path.dirname(filePath), path.basename(filePath))
            .then(function (trackNumber) {
                var newFilePath = path.dirname(filePath) + '/' + trackNumber + '. ' + path.basename(filePath);
                fs.renameSync(filePath, newFilePath);
                filePath = newFilePath;

                return trackNumber;
            })
            .then(function (trackNumber) {
                var metadata = {
                    artist: recordingInfo.lecturer,
                    track: trackNumber,
                    date: config.metadata.currentYear,
                    album: path.dirname(filePath).split('/').pop()
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
            });
    }

    return deferred.promise;
}

module.exports.addMetadataToFile = addMetadataToFile;
