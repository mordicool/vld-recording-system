/**
 * Created by מרדכי on 03 יולי 2016.
 */

$(function () { $('#jstree').jstree({
    "plugins" : [
        "sort",
        "wholerow",
        "state"
    ],
    "state": {
        "key": "selectedNode"
    },
    "core": {
        'multiple': false,
        'themes': {
            'stripes': true,
            'variant': "large"
        },
        'data': {
            'url': '/recordingsView/getTree',
            'dataType': 'json'
        }
    }
})});