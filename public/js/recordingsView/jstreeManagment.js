/**
 * Created by מרדכי on 03 יולי 2016.
 */

$(function () { $('#jstree').jstree({
    "plugins" : [
        "sort",
        "wholerow",
        "state",
        "contextmenu",
        "types"
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
            'url': '/recordingsView/getTree',
            'dataType': 'json'
        }
    },
    "types": {
        "leaf": {
            "icon": 'glyphicon glyphicon-music'
        }
    },
    "contextmenu": {
        "items": function ($node) {
            return {
                "Create": {
                    "separator_before": false,
                    "separator_after": false,
                    "label": "הורד",
                    "action": function (obj) {
                        var tree = $("#jstree").jstree(true);
                        var path = tree.get_path($node, "/");

                        var areYouSure = confirm('האם אתה בטוח שאתה רוצה להוריד את הקובץ?\nקובץ להורדה: ' + path);
                        if (areYouSure) {
                            window.open('/recordingsView/downloadFile?path=' + path);
                            alert('ההורדה בעיצומה!\nאנא המתן עד לסיום ההורדה..');
                        }
                    },
                    "_disabled": function (obj) {
                        var tree = $("#jstree").jstree(true);
                        return !tree.is_leaf($node);
                    }
                }
            };
        }
    }
})});