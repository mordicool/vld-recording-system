/**
 * Created by מרדכי on 14 אוגוסט 2016.
 */

var config = require('../config');
var fs = require('fs');
var ffmetadata = require('ffmetadata');
var q = require('q');
var s3fsImplementation = require('./s3fsImplementation');

function getNextTrackNumberInFolder(folderName, filename) {
    var deferred = q.defer();

    s3fsImplementation.readdir(folderName, function (error, files) {
        var maxTrackNumber = config.metadata.minimumTrackNumber;
        if (!files || files.length === 0) {
            deferred.resolve(formatTrackNumber(maxTrackNumber));
        } else {
            for (var i = 0; i < files.length; i++) {
                if (files[i] == filename) continue;
                var currentTrackNumber = Number.parseInt(files[i].split('.')[0]);
                if (currentTrackNumber > maxTrackNumber) {
                    maxTrackNumber = currentTrackNumber;
                }
            }
            deferred.resolve(formatTrackNumber(maxTrackNumber + 1));
        }
    });

    return deferred.promise;
}

function formatTrackNumber(trackNumber) {
    if(trackNumber.toString().length == 1) {
        return '0' + trackNumber;
    } else {
        return trackNumber;
    }
}

module.exports = {
    getNextTrackNumberInFolder: getNextTrackNumberInFolder
};