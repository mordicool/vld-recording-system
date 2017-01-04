/**
 * Created by מרדכי on 02 ינואר 2017.
 */

var express = require('express');
var lecturersRoute = require('./lecturers');
var changePasswordRoute = require('./changePassword');
var router = express.Router();

router.use('/lecturers', lecturersRoute);
router.use('/changePassword', changePasswordRoute);

module.exports = router;

/********************************************************************************************/
