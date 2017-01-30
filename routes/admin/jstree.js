/**
 * Created by מרדכי on 06 ינואר 2017.
 */

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
        var stringData = JSON.stringify(req.body.data);
        fs.writeFileSync(path.join(__dirname, '../../public/data/jsTree.json'), stringData);

        logger.info('Tree changed successfully.');
        res.sendStatus(200);
    }
}