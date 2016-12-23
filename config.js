/**
 * Created by מרדכי on 30 יוני 2016.
 */

var configuration = {
    server: {
        port: 8000
    },
    uploadsFolder: '\\..\\5777',
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
        accessKeyId: '***',
        secretAccessKey: '***',
        region: 'eu-central-1',
        prefix: '5777/'
    }
};

module.exports = configuration;