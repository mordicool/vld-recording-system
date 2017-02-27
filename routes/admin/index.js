/**
 * Created by מרדכי on 02 ינואר 2017.
 */

var lecturersRoute = require('./lecturers');
var userManagement = require('./userManagement');
var jstreeRoute = require('./jstree');
var logsViewRoute = require('./logsView');
var router = require('express').Router();

router.use('/lecturers', lecturersRoute);
router.use('/userManagement', userManagement);
router.use('/jstree', jstreeRoute);
router.use('/logs', logsViewRoute);

module.exports = router;

/********************************************************************************************/
