/**
 * Created by מרדכי on 03 ינואר 2017.
 */

app.directive('lecturers', function () {
    return {
        restrict: 'E',
        scope: {},
        templateUrl: 'js/admin/lecturers/lecturersPartial.html',
        controller: 'lecturers'
    };
});