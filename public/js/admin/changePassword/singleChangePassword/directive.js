/**
 * Created by מרדכי on 20 ינואר 2017.
 */

app.directive('singleChangePassword', function () {
    return {
        restrict: 'E',
        templateUrl: 'js/admin/changePassword/singleChangePassword/partial.html',
        scope: {
            userType: '=',
            isError: '=',
            errorMessage: '='
        },
        controller: 'singleChangePasswordController'
    };
});