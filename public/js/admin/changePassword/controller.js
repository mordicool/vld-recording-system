/**
 * Created by מרדכי on 03 ינואר 2017.
 */

app.controller('changePassword', ['$scope', '$http', function ($scope, $http) {
    $scope.newUsername = '';
    $scope.newUserPassword = '';
    $scope.newUserType = 'DOWNLOAD';
    $scope.userTypes = ['DOWNLOAD', 'UPLOAD', 'ADMIN'];
    $scope.users = [];
    $scope.createNewUser = createNewUser;
    $scope.editPassword = editPassword;
    $scope.removeUser = removeUser;

    $http.get('/admin/userManagement').then(function(response) {
        if (response.status == 200) {
            $scope.users = response.data;
        }
    });

    function createNewUser() {
        var name = $scope.newUsername,
            password = $scope.newUserPassword,
            type = $scope.newUserType;
        if ($scope.userTypes.indexOf(type) == -1) {
            alert('אנא בחר סוג משתמש רצוי.');
            return;
        }
        var isExists = $scope.users.map(user => user.name).indexOf(name) !== -1;
        if (!isExists && passwordValidator(password)) {
            $http.get('/admin/userManagement/createUser?username=' + name + '&password=' + password + '&type=' + type).then(function(response) {
                if (response.status == 200) {
                    alert('המשתמש נוצר בהצלחה!');
                    location.reload();
                }
            }, function (error) {
                alert('ארעה שגיאה ביצירת המשתמש.');
            });
        } else {
            alert('פרטי המשתמש בהוזנו אינם מספקים.\nאין ליצור משתמש עם שם הקיים כבר.\nעל הסיסמא להיות באורך 8 תווים לפחות, ולהכיל תו מיוחד.');
        }
    }

    function removeUser(username) {
        var isConfirm = confirm('האם אתה בטוח שברצונך למחוק את המשתמש?');
        if (isConfirm) {
            $http.get('admin/userManagement/deleteUser?username=' + username).then(function(response) {
                if (response.status == 200) {
                    alert('המשתמש נמחק בהצלחה!');
                    $scope.users = $scope.users.filter(user => user.name !== username);
                }
            }, function(error) {
                alert('ארעה שגיאה, והמשתמש לא נמחק.');
            });
        }
    }

    function editPassword(username) {
        var newPasswordElement = document.getElementById('newPassword' + username),
            newPassword = newPasswordElement.value;
        if (passwordValidator(newPassword)) {
            var isConfirm = confirm('האם אתה בטוח שברצונך לשנות סיסמא?');
            if (isConfirm) {
                $http.get('admin/userManagement/changePassword?username=' + username + '&newPassword=' + newPassword).then(function(response) {
                    if (response.status == 200) {
                        alert('הסיסמא שונתה בהצלחה!');
                        newPasswordElement.value = '';
                    }
                }, function(error) {
                    alert('ארעה שגיאה, והסיסמא לא שונתה.');
                    newPasswordElement.value = '';
                });
            }
        } else {
            alert('על הסיסמא להיות באורך 8 תווים לפחות, ולהכיל תו מיוחד.');
            newPasswordElement.value = '';
        }
    }

    function passwordValidator(password) {
        var specialCharacters = /^((?![\\/:?\"<>\|`~!@%&$^*\(\)\{\}\[\]\-_+=;'.,]).)*$/i; // Doesn't contain any special characters
        var capitalLetters = /^((?![A-Z]).)*$/i; // Doesn't contain any special characters
        return password.length >= 8 &&
            !specialCharacters.test(password) &&
            !capitalLetters.test(password) &&
            password.indexOf('#') == -1;
    }
}]);