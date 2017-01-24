/**
 * Created by מרדכי on 23 ינואר 2017.
 */

app.directive('singleLogView', function () {
    return {
        restrict: 'E',
        templateUrl: 'js/admin/logsView/singleLogView/partial.html',
        controller: 'singleLogViewController',
        scope: {
            log: '='
        }
    };
});