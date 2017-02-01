/**
 * Created by מרדכי on 06 ינואר 2017.
 */

var api = require('../../modules/db/publicStoredValues/api');
var config = require('../../config');
var fs = require('fs');
var logger = require('../../modules/logger');
var path = require('path');
var router = require('express').Router();

router.post('/updateTree', updateTree);

module.exports = router;

/********************************************************************************************/

function updateTree(req, res) {
    if (req.cookies.password !== config.authentication.adminUser.cookieValue) {
        logger.warn('Did not change tree, do to non authenticated user. redirected to login page.');
        res.sendStatus(400);
    } else {
        var newTree = JSON.stringify(req.body.data);
        
        api.changeTree(newTree)
            .then(function () {
                res.sendStatus(200);
            })
            .fail(function () {
                res.sendStatus(500);
            })
    }
}