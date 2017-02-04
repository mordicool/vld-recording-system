/**
 * Created by מרדכי on 29 ינואר 2017.
 */

var mongoose = require('mongoose');

var publicStoredValuesSchema = mongoose.Schema({
    name: String,
    value: Object
}, { collection: 'publicStoredValues' });

var publicStoredValuesModel = mongoose.model('publicStoredValues', publicStoredValuesSchema);

module.exports = publicStoredValuesModel;