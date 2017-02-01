/**
 * Created by מרדכי on 20 ינואר 2017.
 */

app.controller('singleChangePasswordController', ['$scope', '$http', '$timeout', function ($scope, $http, $timeout) {
    $scope.newPassword = '';
    $scope.newPasswordConfirm = '';
    $scope.isError = false;
    $scope.errorMessage = '';

    $scope.changePassword = function () {
        if (validatePassword()) {
            $http.get('/admin/changePassword/' + $scope.userType.name + '?newPassword=' + $scope.newPassword).then(function (response) {
                if (response.status == 200) {
                    alert('הסיסמא שונתה ל - ' + $scope.newPassword);
                    location.reload();
                }
            }, function (response) {
                if (response.status == 400) {
                    alert('שגיאה! הסיסמא לא שונתה.');
                    location.reload();
                }
            });
        }
    };

    function validatePassword() {
        var newPassword = $scope.newPassword;
        var specialCharacters = /^((?![\\/:?\"<>\|`~!@%&$^*\(\)\{\}\[\]\-_+=;'.,]).)*$/i; // Doesn't contain any special characters
        var capitalLetters = /^((?![A-Z]).)*$/i; // Doesn't contain any special characters

        if (newPassword !== $scope.newPasswordConfirm) {
            setError('הסיסמא לא אומתה בהצלחה');
        } else if (newPassword.length < 8) {
            setError('על הסיסמא להכיל לפחות 8 תווים');
        } else if (specialCharacters.test(newPassword)) {
            setError('על הסיסמא להכיל תו מיוחד');
        } else if (capitalLetters.test(newPassword)) {
            setError('על הסיסמא להכיל אות גדולה');
        } else if (newPassword.indexOf('#') !== -1) {
            setError('אסור לסיסמא להכיל את התו "#"');
        } else {
            $scope.isError = false;
        }

        return !$scope.isError;
    }

    function setError(message) {
        $scope.isError = true;
        $scope.errorMessage = message;

        $timeout(function () {
            $scope.isError = false;
            $scope.errorMessage = '';
        }, 3000);
    }

}]);