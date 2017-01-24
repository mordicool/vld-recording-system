/**
 * Created by מרדכי on 24 ינואר 2017.
 */

app.controller('singleLogViewController', ['$scope', function ($scope) {
    $scope.transformLogType = function () {
        switch($scope.log.level) {
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
    }
}]);