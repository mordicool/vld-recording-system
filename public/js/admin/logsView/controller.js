/**
 * Created by מרדכי on 23 ינואר 2017.
 */

app.controller('logsViewController', ['$scope', '$http', '$timeout', 'logAnalysisService', function ($scope, $http, $timeout, logAnalysisService) {
    $scope.logs = [];
    $scope.logTypes = [];

    $http.get('admin/logs').then(function (response) {
        if (response.status == 200) {
            logAnalysisService.analyzeAll(response.data.logs).then(function (analyzedLogs) {
                $scope.logs = analyzedLogs;
                $scope.$apply();
            });
        }
    });
    logAnalysisService.logTypesPromise.then(function (logTypes) {
        $timeout(function () {
            $scope.logTypes = logTypes
                .filter(function (logType) {
                    return logType.name !== 'other';
                }).map(addDataOfLogTypes);
        }, 1000);
    });

    $scope.logsFilter = function (log) {
        for (var i = 0; i < $scope.logTypes.length; i++) {
            if ($scope.logTypes[i].name == log.type.name && $scope.logTypes[i].isChecked) {
                return true;
            }
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
    
    function addDataOfLogTypes(logType, index, logTypes) {
        var logsCount = 0;
        for (var i = 0; i < $scope.logs.length; i++) {
            if ($scope.logs[i].type.name == logType.name) {
                logsCount++;
            }
        }
        logType.numberOfLogs = logsCount;
        logType.isChecked = true;

        return logType;
    }
}]);