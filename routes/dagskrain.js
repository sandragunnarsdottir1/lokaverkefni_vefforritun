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

  var ch = ['ruv','ruvithrottir','stod2','stod2sport','stod2sport2','stod2gull','stod2bio','stod3','skjar1'];

  for (var x = 0; x < ch.length; x++) {
    getApisdata(ch[x])
  }

  function getApisdata (channel) {

    request('http://apis.is/tv/'+channel+'', function(error, response, body) {
    var data = JSON.parse(body);
    var ch = channel;
    //console.log('channel er ' + channel);
    setApisdata(data,ch);  

    });
  }; 


  function setApisdata (data,ch) {

    for (var i = 0; i < data.results.length; i++) {
   //console.log('ch er ' + ch);
    var channel = ch;
    var title = data.results[i].title;
    var originalTitle = data.results[i].originalTitle;
    var duration = data.results[i].duration;
    var descriptione = data.results[i].description;
    var shortDescription = data.results[i].shortDescription;
    var startTime = data.results[i].startTime;
    var episode = data.results[i].series.episode;
    var series = data.results[i].series.series;

    var queryStr = 'INSERT INTO channel ' + 
    ' (channel,title,originalTitle,duration,description,shortDescription,startTime,episode,series) ' +
    'VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9)';
    var parameters = [channel,title,originalTitle,duration,descriptione,shortDescription,startTime,episode,series];
        dbUtils.queryDb(queryStr, parameters, function(err) {
      if(err) {
        console.log('ekki tókst');
      return console.error('error fetching client from pool', err);
      }
       console.log('tókst');

      });

    };

  };

 

    /*var queryStr = 'SELECT ruv FROM ruv';
	dbUtils.queryDb(queryStr, null, function(err, result) {
	if(err) {
	 return console.error('error fetching client from pool', err);
	}
	data.results = result.rows;
	res.send(data.results.[0]);
	console.log('tókst að ná í');
	});*/



 	  
});






module.exports = router;
