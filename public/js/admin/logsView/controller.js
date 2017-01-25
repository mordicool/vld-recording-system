/**
 * Created by מרדכי on 23 ינואר 2017.
 */

app.controller('logsViewController', ['$scope', '$http', 'logAnalysisService', function ($scope, $http, logAnalysisService) {

    $scope.logs = [];
    $http.get('admin/logs').then(function (response) {
        if (response.status == 200) {
            logAnalysisService.analyzeAll(response.data.logs).then(function (analyzedLogs) {
                $scope.logs = analyzedLogs;
                $scope.$apply();
            });
        }
    });

    $scope.logsFilter = function (log) {
        return true;
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

    $scope.getMessageData = function (regex, message) {
        return RegExp(regex).exec(message).splice(1).join(',');
    }

}]);