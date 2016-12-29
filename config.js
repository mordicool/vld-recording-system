/**
 * Created by מרדכי on 30 יוני 2016.
 */

var configuration = {
    server: {
        port: 8000
    },
    uploadsFolder: "5777",
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
        accessKeyId: '***',
        secretAccessKey: '***',
        region: 'eu-central-1',
        prefix: '5777/'
    },
    removeFile: {
        applyModule: false
    }
};

module.exports = configuration;