/**
 * Created by מרדכי on 06 יולי 2016.
 */

app.directive('fileModel', ['$parse', function ($parse) {
    return {
        restrict: 'A',
        link: function (scope, element, attrs) {
            var model = $parse(attrs.fileModel);

            element.bind('change', function () {
                model.assign(scope, element[0].files[0]);
                $("#fileText").val(element[0].files[0].name);
                scope.$apply();
            });
        }
    };
}]);