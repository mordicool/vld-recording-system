/**
 * Created by מרדכי on 23 ינואר 2017.
 */

app.service('logAnalysisService', ['$http', function ($http) {

    this.analyizeAll = function (logs) {
        var promises = [];
        for (var i = 0; i < logs.length; i++) {
            promises.push(this.analyize(logs[i]));
        }

        return Promise.all(promises);
    };

    this.analyize = function (log) {
        var logPattern = /^\[(.*)\] \[(.*)\] recordingSystem - (.*)$/;
        var logBrokenPattern = logPattern.exec(log);

        if (log == '' || !logBrokenPattern) return {};

        var time = logBrokenPattern[1];
        var level = logBrokenPattern[2];
        var message = logBrokenPattern[3];

        return new Promise(function (resolve, reject) {
            getLogType(level, message).then(function (logType) {
                resolve({
                    time: time,
                    level: level,
                    message: message,
                    type: logType
                });
            });
        });
    };

    function getLogType(level, message) {
        return new Promise(function(resolve, reject) {
            $http.get('data/logTypes.json').then(function (response) {
                var logTypes = response.data;

                for (var i = 0; i < logTypes.length; i++) {
                    var logType = logTypes[i];
                    if (logType.level == level && RegExp(logType.regex).test(message)) {
                        resolve(logType);
                    }
                }
                resolve(logTypes[logTypes.length - 1]);
            });
        });
    }

}]);