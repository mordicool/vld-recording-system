/**
 * Created by מרדכי on 28 אוגוסט 2016.
 */

app.directive('jstree', function () {
    return {
        restrict: 'E',
        template:   '<h3 ng-cloak>' +
                        'תקיית יעד: {{pathResult}} ' +
                    '</h3>' +
                    '<div id="jstree"></div>',
        scope: false,
        controller: ['$scope', function ($scope) {
            function restoreTreePath() {
                var selectedNodeId = localStorage.getItem('selectedNodeId');
                if (selectedNodeId === null) return;

                var tree = $('#jstree').jstree(true);
                tree.select_node(selectedNodeId, true, false);
                $scope.pathResult = "/" + tree.get_path(selectedNodeId, "/");

                $scope.$apply();
            }
            setTimeout(restoreTreePath, 1000);

            $('#jstree').on('changed.jstree', function (e, data) {
                $scope.pathResult = "/" + $('#jstree').jstree(true).get_path(data.node, "/");
                localStorage.setItem('selectedNodeId', data.node.id);

                $scope.$apply();
            });
        }]
    };
});