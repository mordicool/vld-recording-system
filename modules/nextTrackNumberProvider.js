/**
 * Created by מרדכי on 14 אוגוסט 2016.
 */

var config = require('../config');
var fs = require('fs');
var q = require('q');
var ffmetadata = require('ffmetadata');

function getNextTrackNumberInFolder(folderName, filename) {
    var deferred = q.defer();

    var files = fs.readdirSync(folderName);
    var maxTrackNumber = config.metadata.minimumTrackNumber;
    if (files.length === 0) {
        deferred.resolve(formatTrackNumber(maxTrackNumber));
    }
    var index = 0;
    for (var i = 0; i < files.length; i++) {
        (function (file) {
            ffmetadata.read(folderName + '/' + file, function (error, data) {
                if (error) {
                    deferred.reject(error);
                } else {
                    var currentTrackNumber = parseInt(data.track);
                    if (maxTrackNumber <= currentTrackNumber && file !== filename) {
                        maxTrackNumber = currentTrackNumber + 1;
                    }

                    if (index++ === files.length - 1) {
                        deferred.resolve(formatTrackNumber(maxTrackNumber));
                    }
                }
            });
        }) (files[i]);
    }

    return deferred.promise;
}

function formatTrackNumber(trackNumber) {
    if(trackNumber.toString().length == 1) {
        return '0' + trackNumber;
    } else {
        return trackNumber;
    }
}

module.exports.getNextTrackNumberInFolder = getNextTrackNumberInFolder;