/**
 * Created by מרדכי on 30 אוגוסט 2016.
 */

app.service('recordingPackageBuilderService', function () {
    this.buildRecordingPackage = function(scope) {
        var fileExtension = '.' + getFileExtension(scope.recording.name);
        var RecordingInfo = {
            subject: scope.recordingSubject,
            lecturer: scope.recordingLecturer,
            path: scope.pathResult,
            fileExtension: fileExtension
        };
        var formData = new FormData();
        formData.append('file', scope.recording, JSON.stringify(RecordingInfo));

        return formData;
    };

    function getFileExtension(fileName) {
        return fileName.split('.').pop();
    }
});