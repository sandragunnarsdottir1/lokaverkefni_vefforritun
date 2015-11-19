'use strict';
var dbUtils = require('../utils/db-utils');
var request = require("request");
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
	var data ="";
    res.render('dagskrain', data);


});

router.get('/ruv', function(req, res) {

	var data = {titil : 'dagskrá'};
    var queryStr = 'SELECT * FROM channel where channel = $1';
    var parameters = ['ruv'];
	dbUtils.queryDb(queryStr, parameters, function(err, result) {
	if(err) {
	 return console.error('error fetching client from pool', err);
	}
	data.results = result.rows;
	res.send(data);
	console.log('tókst að ná í');
	});


 	  
});






module.exports = router;
