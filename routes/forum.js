'use strict';

var express = require('express');
var router = express.Router();
var dbUtils = require('../utils/db-utils');

var idhelp = 0;

router.get('/', function(req, res) {
	var titleid = req.query.id;
	idhelp = titleid;
	var queryStr2 = 'SELECT * FROM entries WHERE titleid = $1';
	var parameters = [titleid];
	dbUtils.queryDb(queryStr2, parameters, function(err, result) {
	if(err) {
	  return console.error('error fetching client from pool', err);
	}
	var data = {session : req.session};
	data.results = result.rows;
	data.title = 'Spjall';
	for(var i=0; i<data.results.length; i++){

		var s = data.results[i].create_date+'';
		s = s.substring(0, s.length - 14);
		data.results[i].create_date = s;
	}
	res.render('faersla', data);
	});
});

router.post('/blog', function(req, res) {
  var commentid = idhelp;
  var queryStr = 'INSERT INTO entries' + 
  ' (entry_text, username, create_date, titleid) ' +
  'VALUES ($1, $2, now(), $3)';
  var parameters = [req.body.entry,req.session.user.username,commentid]; 
  dbUtils.queryDb(queryStr, parameters, function(err) {
    if(err) {
      return console.error('error fetching client from pool', err);
    }
    res.redirect('/forum?id='+commentid);
  });   
    
});

module.exports = router;
