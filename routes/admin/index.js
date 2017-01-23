/**
 * Created by מרדכי on 02 ינואר 2017.
 */

var express = require('express');
var lecturersRoute = require('./lecturers');
var changePasswordRoute = require('./changePassword');
var jstreeRoute = require('./jstree');
var logsViewRoute = require('./logsView');
var router = express.Router();

router.use('/lecturers', lecturersRoute);
router.use('/changePassword', changePasswordRoute);
router.use('/jstree', jstreeRoute);
router.use('/logs', logsViewRoute);

module.exports = router;

/********************************************************************************************/
