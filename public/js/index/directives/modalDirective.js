/**
 * Created by מרדכי on 28 אוגוסט 2016.
 */

app.directive('modal', function () {
    return {
        restrict: 'E',
        templateUrl: 'js/index/directives/modalPartial.html',
        scope: false,
        controller: ['$scope', 'config', function ($scope, config) {
            $("#uploadingModal").on("hidden.bs.modal", function () {
                if($scope.uploadingModalText === config.strings.uploadingSuccessText) {
                    location.reload();
                }
            });
        }]
    };
});