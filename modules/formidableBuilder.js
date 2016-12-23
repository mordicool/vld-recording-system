/**
 * Created by מרדכי on 10 אוגוסט 2016.
 */

var amazonUploader = require('./amazonUploader');
var config = require('../config');
var formidable = require('formidable');
var filePathRedirector = require('./filePathRedirector');
var metadataHandler = require('./metadataHandler');
var q = require('q');

function buildForm(deferred) {
    var form = new formidable.IncomingForm();

    form.uploadDir = config.uploadsFolder;
    form.on('file', function (field, file) {
        q.fcall(filePathRedirector.redirectFilePath, file)
            .then(function (redirectedPath) {
                return metadataHandler.addMetadataToFile(file, redirectedPath)
                    .then(function (filePathContainingMetadata) {
                        return filePathContainingMetadata;
                    });
            })
            .then(function (filePath) {
                return amazonUploader.upload(filePath)
                    .then(function () {
                        return filePath;
                    });
            })
            .then(deferred.resolve)
            .fail(deferred.reject);
    });
    form.on('error', function (err) {
        deferred.reject(err);
    });

    return form;
}

module.exports.buildForm = buildForm;
