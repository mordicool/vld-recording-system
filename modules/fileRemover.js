/**
 * Created by מרדכי on 23 דצמבר 2016.
 */

var config = require('../config');
var fs = require('fs');
var logger = require('./logger');

function removeFile(filePath) {
    if (config.removeFile.applyModule == false) {
        logger.debug('File did not remove from local storage, do to false configuration.');
    } else {
        fs.unlinkSync(filePath);
        logger.debug('File was removed from the local storage; File path: ' + filePath);
    }

    return filePath;
}

module.exports.removeFile = removeFile;