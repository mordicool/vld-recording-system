/**
 * Created by מרדכי on 29 יוני 2016.
 */

var config = require('./config');
var logger = require('./modules/logger');
var router = require('./router');
var express = require('express');

module.exports.execute = function () {

    var app = express();
    app.use(express.static('public'));
    app.use(router);

    app.listen(config.server.port, function () {
        logger.info('Server is listening on port ' + config.server.port);
    });

};