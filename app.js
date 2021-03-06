/**
 * Created by מרדכי on 29 יוני 2016.
 */

var bodyParser = require('body-parser');
var config = require('./config');
var cookieParser = require('cookie-parser');
var dbConnection = require('./modules/db/dbConnection');
var logger = require('./modules/logger');
var router = require('./routes');
var express = require('express');

var app = express();
app.use(cookieParser('mordicool'));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/public'));
app.use('/', router);

var port = process.env.PORT || config.server.port;
app.listen(port, '0.0.0.0', function () {
    logger.info('Server is listening on port ' + port);
});

dbConnection.connect();