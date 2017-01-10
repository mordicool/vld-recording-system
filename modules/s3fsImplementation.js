/**
 * Created by מרדכי on 28 אוקטובר 2016.
 */

var config = require('../config');
var S3FS = require('s3fs');

var s3fsImplementation = new S3FS(config.amazonModule.bucketName, {
    accessKeyId: config.amazonModule.accessKeyId,
    secretAccessKey: config.amazonModule.secretAccessKey,
    region: config.amazonModule.region
});

module.exports = s3fsImplementation;