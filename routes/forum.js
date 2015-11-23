'use strict';

var express = require('express');
var router = express.Router();
var dbUtils = require('../utils/db-utils');

var idhelp = 0;

router.get('/', function(req, res) {
	console.log('fyrirspurn: ' + req.query.id);
	var titleid = req.query.id;
	idhelp = titleid;
	var queryStr2 = 'SELECT * FROM entries WHERE titleid = $1'
	var parameters = [titleid];
	dbUtils.queryDb(queryStr2, parameters, function(err, result) {
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



router.post('/blog', function(req, res) {
  var commentid = idhelp;
  console.log('commentid er: ' + commentid);
  var queryStr = 'INSERT INTO entries' + 
  ' (entry_text, username, create_date, titleid) ' +
  'VALUES ($1, $2, now(), $3)';
  var parameters = [req.body.entry,req.session.user.username,commentid]; 
  dbUtils.queryDb(queryStr, parameters, function(err) {
    if(err) {
      console.log('tókst ekki að gera færslu')
      return console.error('error fetching client from pool', err);
    }
    console.log('tókst að gera færlsuna');
    res.redirect('/forum?id='+commentid);
  });   
    
});

module.exports = router;


