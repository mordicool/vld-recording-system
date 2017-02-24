/**
 * Created by מרדכי on 23 ינואר 2017.
 */

app.controller('logsViewController', [
        '$scope',
        '$http',
        'logAnalysisService',
        'logInBetweenDatesValidator',
        'dateFormatter',
        function ($scope, $http, logAnalysisService, logInBetweenDatesValidator, dateFormatter) {
    $scope.originallogs = [];
    $scope.logs = [];
    $scope.viewedLogs = function() {
        return $scope.logs.filter($scope.logsFilter);
    };
    $scope.logTypes = [];
    $scope.formattedDate = dateFormatter.format;
    var that = this;

    this.logsPromise = new Promise(function (resolve, reject) {
        $http.get('admin/logs').then(function (response) {
            if (response.status == 200) {
                logAnalysisService.analyzeAll(response.data).then(function (analyzedLogs) {
                    $scope.originalLogs = analyzedLogs;
                    $scope.logs = $scope.originalLogs;
                    resolve(analyzedLogs);
                });
            }
        });
    });
    logAnalysisService.logTypesPromise.then(function (logTypes) {
        that.logsPromise.then(function (logs) {
            $scope.logTypes = logTypes
                .filter(function (logType) {
                    return logType.name !== 'other';
                }).map(function (logType) {
                    logType = addNumberOfEachLogType(logType, logs);
                    logType.isChecked = true;
                    return logType;
                });
            $scope.$apply();
        });
    });
    $scope.logsFilter = function (log) {
        for (var i = 0; i < $scope.logTypes.length; i++) {
            if ($scope.logTypes[i].name == log.type.name && $scope.logTypes[i].isChecked) {
                return true;
            }
        }
    };
    $scope.searchByDate = function() {
        if (!$scope.logViewStartDate || !$scope.logViewEndDate) return;
        $scope.logs = $scope.originalLogs.filter(function(log) {
            return logInBetweenDatesValidator.validate(log.time, $scope.logViewStartDate, $scope.logViewEndDate);
        });
        $scope.logTypes = $scope.logTypes.map(function (logType) {
                return addNumberOfEachLogType(logType, $scope.logs);
            });
    };
    $scope.chooseAll = function () {
        for (var i = 0; i < $scope.logTypes.length; i++) {
            $scope.logTypes[i].isChecked = true;
        }
    };
    $scope.unchooseAll = function () {
        for (var i = 0; i < $scope.logTypes.length; i++) {
            $scope.logTypes[i].isChecked = false;
        }
    };
    $scope.transformLogType = function (level) {
        switch(level) {
            case 'INFO':
                return 'success';
            case 'DEBUG':
                return 'info';
            case 'WARN':
                return 'warning';
            case 'ERROR':
                return 'danger';
            default:
                return '';
        }
    };
    function addNumberOfEachLogType(logType, logs) {
        var logsCount = 0;
        for (var i = 0; i < logs.length; i++) {
            if (logs[i].type.name == logType.name) {
                logsCount++;
            }
        }
        logType.numberOfLogs = logsCount;
        return logType;
    }
}]);