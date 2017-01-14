/**
 * Created by מרדכי on 30 יוני 2016.
 */

var configuration = {
    server: {
        port: 8000
    },
    authentication: {
        regularUser: {
            cookieValue: 'U7+LUL@?{zeW"e=n',
            cookieMaxAge: 10 * 60 * 1000 // 10 minutes
        },
        adminUser: {
            cookieValue: '2]Q%u_r<8DpbE]Fb',
            cookieMaxAge: 30 * 60 * 1000 // 30 minutes
        }
    },
    uploadsFolder: 'uploads/',
    downloadsFolder: 'downloads/',
    logger: {
        debugLogFileName: 'logs/debugLog.log',
        infoLogFileName: 'logs/infoLog.log',
        warnLogFileName: 'logs/warnLog.log'
    },
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

module.exports = configuration;