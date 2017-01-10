/**
 * Created by מרדכי on 10 אוגוסט 2016.
 */

var amazonUploader = require('./amazonUploader');
var config = require('../../config');
var fileRemover = require('./../fileRemover');
var filePathRedirector = require('./filePathRedirector');
var formidable = require('formidable');
var metadataHandler = require('./metadataHandler');
var q = require('q');

function buildForm(deferred) {
    var form = new formidable.IncomingForm();

    form.multiples = false;
    form.uploadDir = config.uploadsFolder;
    form.on('file', function (field, file) {
        q.fcall(filePathRedirector.redirectFilePath, file)
            .then(function (redirectedPath) {
                return metadataHandler.addMetadataToFile(file, redirectedPath);
            })
            .then(amazonUploader.upload)
            .then(fileRemover.removeFile)
            .then(deferred.resolve)
            .fail(deferred.reject);
    });
    form.on('error', function (err) {
        deferred.reject(err);
    });

    return form;
}

module.exports.buildForm = buildForm;
