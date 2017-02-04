/**
 * Created by מרדכי on 02 ינואר 2017.
 */

app.controller('loginController', ['$scope', '$http', '$timeout', function ($scope, $http, $timeout) {
    $scope.password = '';
    $scope.isError = false;

    $scope.Login = function () {
        var password = $scope.password;
        if (password == '') return;

        $http.get('users/login?password=' + password)
            .then(function (response) {
                if (response.status == 200) {
                    location.reload();
                } else if (response.status == 205) {
                    location.href = '/recordingsView';
                }
            }, function (response) {
                if (response.status == 400) {
                    $scope.isError = true;
                    $scope.password = '';

                    $timeout(function () {
                        $scope.isError = false;
                    }, 3000);
                }
            });
    };
}]);