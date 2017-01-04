/**
 * Created by מרדכי on 03 ינואר 2017.
 */

app.directive('jsTree', function () {
    return {
        restrict: 'E',
        scope: {},
        templateUrl: 'js/admin/jsTree/jsTreePartial.html',
        controller: 'jsTree'
    };
});