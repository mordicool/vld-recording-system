/**
 * Created by מרדכי on 30 יוני 2016.
 */

var configuration = {
    server: {
        port: 8000
    },
    authentication: {
        regularUser: {
            cookieValue: '8]E/1c{j)>4,c7N',
            cookieMaxAge: 10 * 60 * 1000 // 10 minutes
        },
        adminUser: {
            cookieValue: '19{:}$2&:{ Ft4n',
            cookieMaxAge: 30 * 60 * 1000 // 30 minutes
        }
    },
    uploadsFolder: 'uploads/',
    downloadsFolder: 'downloads/',
    logger: {
        infoLogFileName: 'logs/infoLog.log',
        debugLogFileName: 'logs/debugLog.log'
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