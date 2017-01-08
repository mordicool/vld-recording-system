/**
 * Created by מרדכי on 05 ינואר 2017.
 */

$(function () {
    setTimeout(function () {
        $('#jstree').jstree({
            "plugins": [
                "sort",
                "state",
                "wholerow",
                "contextmenu",
                "dnd"
            ],
            "state": {
                "key": "selectedNode"
            },
            "core": {
                'check_callback' : true,
                'multiple': false,
                'themes': {
                    'stripes': true,
                    'variant': "large"
                },
                'data': {
                    'url': '/data/jsTree.json',
                    'dataType': 'json'
                }
            },
            "contextmenu": {
                "items": function ($node) {
                    var tree = $("#jstree").jstree(true);
                    return {
                        "Create": {
                            "separator_before": false,
                            "separator_after": false,
                            "label": "צור",
                            "action": function (obj) {
                                $node = tree.create_node($node);
                                tree.select_node($node);
                                tree.edit($node);
                            }
                        },
                        "Remove": {
                            "separator_before": false,
                            "separator_after": false,
                            "label": "מחק",
                            "action": function (obj) {
                                tree.delete_node($node);
                            }
                        },
                        "Rename": {
                            "separator_before": true,
                            "separator_after": false,
                            "label": "שנה שם",
                            "action": function (obj) {
                                tree.edit($node);
                            }
                        }
                    };
                }
            }
        });
    }, 200);
});