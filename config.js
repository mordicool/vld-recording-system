/**
 * Created by מרדכי on 30 יוני 2016.
 */

var configuration = {
    server: {
        port: 8000
    },
    authentication: {
        generalUser: {
            cookieValue: 'U7+LUL@?{zeW"e=n',
            cookieMaxAge: 10 * 60 * 1000 // 10 minutes
        },
        inspectorUser: {
            cookieValue: '=A3ragUpe*Ej',
            cookieMaxAge: 10 * 60 * 1000 // 10 minutes
        },
        adminUser: {
            cookieValue: '2]Q%u_r<8DpbE]Fb',
            cookieMaxAge: 20 * 60 * 1000 // 20 minutes
        }
    },
    db: {
        user: 'aacc45e82c9385cbeb60aeb83be1f9a8',
        password: 'wEinbi0m',
        host: '32-1a.mongo.evennode.com',
        port: 27017,
        dbName: 'aacc45e82c9385cbeb60aeb83be1f9a8'
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