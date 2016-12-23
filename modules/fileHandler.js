/**
 * Created by מרדכי on 10 אוגוסט 2016.
 */

var formidableBuilder = require('./formidableBuilder');
var q = require('q');

function handleFile(request) {
    var deferred = q.defer();

    var form = formidableBuilder.buildForm(deferred);
    form.parse(request);

    return deferred.promise;
}

module.exports.handleFile = handleFile;