/**
 * Created by מרדכי on 15 יולי 2016.
 */

var config = require('../config');
var log4js = require('log4js');

log4js.configure({
    appenders: [
        { type: 'console' },
        {
            type: 'log4js-node-mongodb',
            connectionString: config.db.url
        },
        // {
        //     type: 'logLevelFilter',
        //     level: 'INFO',
        //     appender: {
        //         type: 'file',
        //         filename: config.logger.infoLogFileName,
        //         category: 'recordingSystem'
        //     }
        // },
        // {
        //     type: 'logLevelFilter',
        //     level: 'DEBUG',
        //     appender: {
        //         type: 'file',
        //         filename: config.logger.debugLogFileName,
        //         category: 'recordingSystem'
        //     }
        // },
        // {
        //     type: 'logLevelFilter',
        //     level: 'WARN',
        //     appender: {
        //         type: 'file',
        //         filename: config.logger.warnLogFileName,
        //         category: 'recordingSystem'
        //     }
        // }
    ]
});

var logger = log4js.getLogger('recordingSystem');
module.exports = logger;
