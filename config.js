/**
 * Created by מרדכי on 30 יוני 2016.
 */

var configuration = {
    server: {
        port: 8000
    },
    authentication: {
        password: 'aaa',
        cookieValue: 'qwe123qwe',
        cookieMaxAge: 5 * 60 * 1000 // 5 minutes
    },
    uploadsFolder: "5777",
    logger: {
        infoLogFileName: 'logs/infoLog.log',
        debugLogFileName: 'logs/debugLog.log'
    },
    metadata: {
        applyModule: true,
        minimumTrackNumber: 1,
        currentYear: '5777'
    },
    uploadToAmazon: {
        applyModule: true,
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