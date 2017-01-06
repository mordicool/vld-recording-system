/**
 * Created by מרדכי on 03 ינואר 2017.
 */

app.controller('jsTree', ['$scope', '$http', function ($scope, $http) {

    $scope.updateChanges = function() {
        var newTree = {
            'data': $('#jstree').jstree().get_json()
        };
        $http.post('admin/jstree/updateTree', newTree).then(function (response) {
            if (response.status == 200) {
                alert('עץ התקיות שונה בהצלחה.');
                location.reload();
            }
        }, function (response) {
            if (response.status == 400) {
                alert('שגיאה! עץ התקיות לא שונה.');
                location.reload();
            }
        });
    }

}]);