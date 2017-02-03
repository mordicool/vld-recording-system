/**
 * Created by מרדכי on 02 ינואר 2017.
 */

app.controller('lecturers', ['$scope', '$http', function ($scope, $http) {
    $scope.newLecturer = '';
    $http.get('/getLecturers').then(function (response) {
        $scope.lecturers = response.data;
        $scope.recordingLecturer = 'אחר';
    });
    $scope.isError = false;
    $scope.errorMessage = '';

    $scope.$watch('newLecturer', function (newValue, oldValue) {
        var valid = /^((?![\\/:?\"<>\|]).)*$/i; // Doesn't contain the characters: \/:?"<>|
        if(!valid.test(newValue)) {
            $scope.newLecturer = oldValue;
        }
    });

    $scope.addNewLecturer = function () {
        var newLecturer = $scope.newLecturer;
        if (newLecturer == '') {
            $scope.isError = true;
            $scope.errorMessage = 'שם מעביר השיעור ריק';
        } else if ($scope.lecturers.indexOf(newLecturer) !== -1) {
            $scope.isError = true;
            $scope.errorMessage = 'שם מעביר השיעור כבר קיים';
        } else {
            $http.get('admin/lecturers/add?newLecturer=' + newLecturer).then(function (response) {
                if (response.status == 200) {
                    alert('מעביר השיעור נוסף בהצלחה');
                    location.reload();
                }
            }, function (response) {
                if (response.status == 400) {
                    alert('שגיאה! מעביר השיעור לא נוסף.');
                    location.reload();
                }
            });
        }
    };
    $scope.removeLecturer = function () {
        var newLecturer = $scope.newLecturer;
        if (newLecturer == '') {
            $scope.isError = true;
            $scope.errorMessage = 'שם מעביר השיעור ריק';
        } else if ($scope.lecturers.indexOf(newLecturer) == -1) {
            $scope.isError = true;
            $scope.errorMessage = 'שם מעביר השיעור לא קיים';
        } else {
            $http.get('admin/lecturers/remove?newLecturer=' + newLecturer).then(function (response) {
                if (response.status == 200) {
                    alert('מעביר השיעור הוסר בהצלחה');
                    location.reload();
                }
            }, function (response) {
                if (response.status == 400) {
                    alert('שגיאה! מעביר השיעור לא הוסר.');
                    location.reload();
                }
            });
        }
    };
}]);