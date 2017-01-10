/**
 * Created by מרדכי on 10 ינואר 2017.
 */

var config = require('../../config');
var fs = require('fs');
var logger = require('../logger');
var path = require('path');

function saveFile(file, name) {
    var destinationPath = path.join(config.downloadsFolder, name);
    fs.writeFileSync(destinationPath, file);
    logger.debug('File written to local storage. File name: ' + destinationPath);
    return destinationPath;
}

module.exports = {
    saveFile: saveFile
};