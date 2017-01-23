/**
 * Created by מרדכי on 23 ינואר 2017.
 */

app.directive('logsView', function () {
    return {
        restrict: 'E',
        templateUrl: 'js/admin/logsView/partial.html',
        controller: 'logsViewController'
    };
});