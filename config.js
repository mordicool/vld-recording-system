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
            cookieMaxAge: 5 * 60 * 1000 // 5 minutes
        },
        adminUser: {
            cookieValue: '19{:}$2&:{ Ft4n',
            cookieMaxAge: 10 * 60 * 1000 // 10 minutes
        }
    },
    uploadsFolder: "uploads/",
    logger: {
        infoLogFileName: 'logs/infoLog.log',
        debugLogFileName: 'logs/debugLog.log'
    },
    metadata: {
        applyModule: false,
        minimumTrackNumber: 1,
        currentYear: '5777'
    },
    uploadToAmazon: {
        applyModule: false,
        bucketName: 'vbmaudio',
        accessKeyId: 'AKIAJZF3ILQX7BDJTBOQ',
        secretAccessKey: '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',
        region: 'eu-central-1',
        prefix: '5777/'
    },
    removeFile: {
        applyModule: true
    }
};

module.exports = configuration;