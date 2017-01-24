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
    }, function (response) {
        if (response.status == 400) {
            location.reload();
        }
    });

}]);