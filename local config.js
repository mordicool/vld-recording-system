/**
 * Created by מרדכי on 30 יוני 2016.
 */

var config = {
    server: {
        port: 8000
    },
    authentication: {
        UPLOAD: {
            cookieValue: 'U7+LUL@?{zeW"e=n',
            cookieMaxAge: 100000 * 60 * 1000 // 100000 minutes
        },
        DOWNLOAD: {
            cookieValue: '=A3ragUpe*Ej',
            cookieMaxAge: 100000 * 60 * 1000 // 100000 minutes
        },
        ADMIN: {
            cookieValue: '2]Q%u_r<8DpbE]Fb',
            cookieMaxAge: 100000 * 60 * 1000 // 100000 minutes
        }
    },
    db: {
        host: 'localhost:27017',
        dbName: 'local'
    },
    uploadsFolder: 'uploads/',
    downloadsFolder: 'downloads/',
    temporaryCharJoin: '~!@#',
    // logger: {
    //     debugLogFileName: 'logs/debugLog.log',
    //     infoLogFileName: 'logs/infoLog.log',
    //     warnLogFileName: 'logs/warnLog.log'
    // },
    metadata: {
        applyModule: true,
        minimumTrackNumber: 1,
        currentYear: '5777'
    },
    amazonModule: {
        applyModule: true,
        bucketName: 'vld-test',
        accessKeyId: 'AKIAJ4E7K3T5QBMAAPBQ',
        secretAccessKey: '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',
        region: 'eu-central-1',
        prefix: '5777/'
    },
    removeFile: {
        applyModule: true
    }
};

config.db.url = 'mongodb://' + config.db.host + '/' + config.db.dbName;

module.exports = config;