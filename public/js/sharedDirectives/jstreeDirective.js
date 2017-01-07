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
            $scope.pathResult = 'לא נבחרה תקייה';
            var $tree = $('#jstree');
            setTimeout(restoreTreePath, 1000);

            $tree.on('changed.jstree', function (e, data) {
                var $tree = $('#jstree');
                $scope.pathResult = $tree.jstree().get_path(data.node, "/");
                localStorage.setItem('selectedNodeId', data.node.id);
                disableNonLeaf();
                $scope.$apply();
            });
            $tree.on('ready.jstree', function (e, data) {
                disableNonLeaf();
            });

            function disableNonLeaf() {
                var $tree = $('#jstree');
                var tree = $tree.jstree();
                $(tree.get_json($tree, {
                    flat: true
                })).each(function(index, value) {
                    var node = tree.get_node(this.id);
                    node.state.disabled = !tree.is_leaf(node);
                });
            }
            function restoreTreePath() {
                var $tree = $('#jstree');
                var selectedNodeId = localStorage.getItem('selectedNodeId');
                if (selectedNodeId === null) return;
                var tree = $tree.jstree();

                if (!tree) return;
                tree.select_node(selectedNodeId, true, false);
                var oldPath = tree.get_path(selectedNodeId, "/");
                if (!oldPath) return;
                $scope.pathResult = tree.get_path(selectedNodeId, "/");

                $scope.$apply();
            }
        }]
    };
});