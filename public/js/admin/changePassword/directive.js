/**
 * Created by מרדכי on 03 ינואר 2017.
 */

app.directive('changePassword', function () {
    return {
        restrict: 'E',
        scope: {},
        templateUrl: 'js/admin/changePassword/partial.html',
        controller: 'changePassword'
    };
});