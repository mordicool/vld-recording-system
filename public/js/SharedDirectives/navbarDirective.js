/**
 * Created by מרדכי on 02 ינואר 2017.
 */

app.directive('vldNavbar', function () {
    return {
        restrict: 'E',
        templateUrl: 'js/sharedDirectives/navbarPartial.html',
        scope: {
            isLogout: '@'
        }
    };
});