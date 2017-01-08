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
            $tree.on('changed.jstree', function (e, data) {
                disableNonLeaf();
                $scope.pathResult = data.instance.get_path(data.selected, "/");
                $scope.$apply();
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
        }]
    };
});