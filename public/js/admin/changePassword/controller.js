/**
 * Created by מרדכי on 03 ינואר 2017.
 */

app.controller('changePassword', ['$scope', '$http', function ($scope, $http) {
    $scope.userTypes = [];
    $http.get('data/userTypes.json').then(function (response) {
        $scope.userTypes = response.data;
    });

    $scope.usernames = [];
    $http.get('/admin/userManagement').then((response) => {
        if (response.status == 200) {
            $scope.usernames = response.data;
        }
    })
}]);