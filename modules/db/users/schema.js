/**
 * Created by מרדכי on 29 ינואר 2017.
 */

var mongoose = require('mongoose');

var usersSchema = mongoose.Schema({
    name: String,
    password: String
}, { collection: 'users' });

var usersModel = mongoose.model('users', usersSchema);

module.exports = usersModel;