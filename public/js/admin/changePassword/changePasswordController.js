/**
 * Created by מרדכי on 03 ינואר 2017.
 */

app.controller('changePassword', ['$scope', '$http', function ($scope, $http) {
    $scope.newUserPassword = '';
    $scope.newAdminPassword = '';
    $scope.newUserPasswordConfirm = '';
    $scope.newAdminPasswordConfirm = '';
    $scope.isError = false;
    $scope.errorMessage = '';

    $scope.changePassword = function (userType) {
        var newPassword = getPassword(userType);
        var specialCharacters = /^((?![\\/:?\"<>\|`~!@#%&$^*\(\)\{\}\[\]\-_+=;'.,]).)*$/i; // Doesn't contain any special characters
        var capitalLetters = /^((?![A-Z]).)*$/i; // Doesn't contain any special characters

        if (getPasswordConform(userType) !== newPassword) {
            $scope.isError = true;
            $scope.errorMessage = 'הסיסמא לא אומתה בהצלחה';
        } else if (newPassword.length < 8) {
            $scope.isError = true;
            $scope.errorMessage = 'על הסיסמא להכיל לפחות 8 תווים';
        } else if (specialCharacters.test(newPassword)) {
            $scope.isError = true;
            $scope.errorMessage = 'על הסיסמא להכיל תו מיוחד';
        } else if (capitalLetters.test(newPassword)) {
            $scope.isError = true;
            $scope.errorMessage = 'על הסיסמא להכיל אות גדולה';
        } else {
            $http.get('/admin/changePassword/' + userType + '?newPassword=' + newPassword).then(function (response) {
                if (response.status == 200) {
                    alert('הסיסמא שונתה ל - ' + newPassword);
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

    function getPassword(userType) {
        if (userType == 'user') {
            return $scope.newUserPassword;
        } else {
            return $scope.newAdminPassword;
        }
    }
    function getPasswordConform(userType) {
        if (userType == 'user') {
            return $scope.newUserPasswordConfirm;
        } else {
            return $scope.newAdminPasswordConfirm;
        }
    }
}]);