/**
 * Created by מרדכי on 03 יולי 2016.
 */

$(function () { $('#jstree').jstree({
    "plugins" : [
        "sort",
        "wholerow"
    ],
    'core': {
        'check_callback': true,
        'multiple': false,
        'themes': {
            'stripes': true,
            'variant': "large"
        },
        'data': {
            'url': '/data/jsTree.json',
            'dataType': 'json'
        }
    }
})});