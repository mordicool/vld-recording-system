/**
 * Created by מרדכי on 09 ינואר 2017.
 */

$('#jstree').bind('dblclick', function (event) {
    var node = $(event.target).closest("li");
    var data = node.data("jstree");
    alert('Node: ' + JSON.stringify(data));
});