/**
 * Created by מרדכי on 15 יולי 2016.
 */

var log4js = require('log4js');
var config = require('../config');

log4js.configure({
    appenders: [
        { type: 'console' },
        {
            type: 'logLevelFilter',
            level: 'INFO',
            appender: {
                type: 'file',
                filename: config.logger.infoLogFileName,
                category: 'recordingSystem'
            }
        },
        {
            type: 'logLevelFilter',
            level: 'DEBUG',
            appender: {
                type: 'file',
                filename: config.logger.debugLogFileName,
                category: 'recordingSystem'
            }
        }
    ]
});

var logger = log4js.getLogger('recordingSystem');
module.exports = logger;
