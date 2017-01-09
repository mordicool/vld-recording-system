/**
 * Created by מרדכי on 29 יוני 2016.
 */

app.controller('recordingSystemController', [
    '$scope',
    '$http',
    'uploadFileService',
    'recordingPackageBuilderService',
    'config',
    function ($scope, $http, uploadFileService, recordingPackageBuilderService, config) {
    $http.get('data/lecturers.json').then(function (response) {
        $scope.lecturers = response.data.lecturers.sort();
        $scope.recordingLecturer = 'אחר';
    });
    $scope.chooseFolderText = config.strings.chooseFolderText;
    $scope.uploadingModalProgress = '0%';

    var valid = /^((?![\\/:?\"<>\|]).)*$/i; // Doesn't contain the characters: \/:?"<>|
    $scope.$watch('recordingSubject', function (newValue, oldValue) {
        if(!valid.test(newValue)) {
            $scope.recordingSubject = oldValue;
        }
    });

    $scope.uploadRecording = function () {
        if(!validateRecording()) return;

        var recordingPackage = recordingPackageBuilderService.buildRecordingPackage($scope);
        uploadFileService.uploadFile(config.serverApi.uploadFile, recordingPackage, onProgressCallBack);
    };

    function validateRecording() {
        if(!$scope.recording || !$scope.recordingSubject) {
            $scope.uploadingModalText = config.strings.badRecordInfoText;
        } else if(!$scope.pathResult || $scope.pathResult == 'לא נבחרה תקייה') {
            $scope.uploadingModalText = config.strings.noPathEntered;
        } else {
            return true;
        }
        return false;
    }

    function onProgressCallBack(evt) {
        if (evt.loaded === evt.total) {
            $scope.uploadingModalProgress = '100%';
            $scope.uploadingModalText = config.strings.uploadingSuccessText;
        }
        else {
            $scope.uploadingModalText = config.strings.uploadingInProcessText;
            $scope.uploadingModalProgress = Math.round(evt.loaded / evt.total * 100) + '%';
        }
        $scope.$apply();
    }
}]);