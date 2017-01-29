/**
 * Created by מרדכי on 29 ינואר 2017.
 */

var mongoose = require('mongoose');

var logsSchema = mongoose.Schema({
    log: String
});

var logsModel = mongoose.model('logs', logsSchema);

module.exports = logsModel;