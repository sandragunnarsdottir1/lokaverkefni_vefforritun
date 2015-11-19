'use strict';

var express = require('express');
var router = express.Router();
var dbUtils = require('../utils/db-utils');

router.get('/', function(req, res) {
	console.log(req.query.id);
	var titleid = req.query.id;
	var queryStr2 = 'SELECT * FROM entries WHERE title = title'
	dbUtils.queryDb(queryStr2, null, function(err, result) {
	if(err) {
	  return console.error('error fetching client from pool', err);
	}
	var data = {session : req.session};
	data.results = result.rows;
	res.render('faersla', data);
	});
	/*var queryStr = 'SELECT * FROM entries ORDER BY create_date DESC LIMIT 30';
	dbUtils.queryDb(queryStr, null, function(err, result) {
	if(err) {
	  return console.error('error fetching client from pool', err);
	}
	var data = {session : req.session};
	data.results = result.rows;
	res.render('wall', data);
	});*/
});

module.exports = router;