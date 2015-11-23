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

router.get('/stod', function(req, res) {
	var idCh = req.query.idChannel;
	//console.log('query er ' + idCh);
	getTvList(idCh,res); 	  
});






function getTvList (ch,res) {
 	var data = {};
    var queryStr = 'SELECT * FROM channel where channel = $1 ORDER BY starttime' ;
    var parameters = [ch];
	dbUtils.queryDb(queryStr, parameters, function(err, result) {
	if(err) {
	 return console.error('error fetching client from pool', err);
	}
	data.results = result.rows;
	//res.render('dagskrain',data);
	res.send(data);
	//return data;
	console.log('tókst að ná í  getTvList');
	});
}



module.exports = router;
