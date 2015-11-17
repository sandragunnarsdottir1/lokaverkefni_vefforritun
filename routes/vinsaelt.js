'use strict';

var express = require('express');
var router = express.Router();
var dbUtils = require('../utils/db-utils');


/* GET home page. */
router.get('/', function(req, res) {

	var data = "";
	res.render('vinsaelt', data);

});

module.exports = router;