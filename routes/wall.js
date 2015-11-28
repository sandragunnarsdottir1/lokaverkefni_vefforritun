'use strict';

var express = require('express');
var router = express.Router();
var dbUtils = require('../utils/db-utils');


/* GET home page. */
router.get('/', function(req, res) {
	
	var queryStr = 
	'SELECT * FROM titletable where title is not null'+
	' ORDER BY create_date DESC LIMIT 30';
	dbUtils.queryDb(queryStr, null, function(err, result) {
	if(err) {
	  return console.error('error fetching client from pool', err);
	}
	var data = {session : req.session};
	data.results = result.rows;
	data.title = 'Umræða';
	for(var i=0; i<data.results.length; i++){

		var s = data.results[i].create_date+'';
		s = s.substring(0, s.length - 14);
		data.results[i].create_date = s;
	}
	res.render('wall', data);
	});
});



module.exports = router;




