/**
 * Created by מרדכי on 28 אוקטובר 2016.
 */

var config = require('../config');
var S3FS = require('s3fs');

var s3fsImplementation = new S3FS('vbmaudio', {
    accessKeyId: config.uploadToAmazon.accessKeyId,
    secretAccessKey: config.uploadToAmazon.secretAccessKey,
    region: config.uploadToAmazon.region
});

module.exports = s3fsImplementation;