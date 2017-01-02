/**
 * Created by מרדכי on 02 ינואר 2017.
 */

app.controller('loginController', ['$scope', '$http', function ($scope, $http) {
    $scope.password = '';
    $scope.isError = false;

    $scope.Login = function () {
        var password = $scope.password;
        if (password == '') return;

        $http.get('users/login?password=' + password)
            .then(function (response) {
                if (response.status == 200) {
                    location.reload();
                }
            }, function (response) {
                if (response.status == 400) {
                    $scope.isError = true;
                    $scope.password = '';
                }
            });
    };
}]);