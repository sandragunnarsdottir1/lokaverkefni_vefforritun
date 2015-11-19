
var dbUtils = require('../utils/db-utils');
var request = require("request");

exports.tvLisit = function () {

  //var myVar = setInterval(function(){ myTimer() }, 60000);

  function myTimer() {
    
    var today = new Date();
    var h = today.getHours();
    if (h == 6) {
      console.log('myTimer');
    };
  };



  function clearTable () {

    var queryStr = 'TRUNCATE channel' 
    dbUtils.queryDb(queryStr, null, function(err) {
      if(err) {
   
        return console.error('error fetching client from pool', err);
      }

      getDifferentChannel();
    });

  };

   function getDifferentChannel () {
    var ch = ['ruv','ruvithrottir','stod2','stod2sport','stod2sport2','stod2gull','stod2bio','stod3','skjar1'];

    for (var x = 0; x < ch.length; x++) {
      getApisdata(ch[x]);
    };
     
  }; 



  function getApisdata (channel) {

    request('http://apis.is/tv/'+channel+'', function(error, response, body) {
    var data = JSON.parse(body);
    var ch = channel;
    console.log('channel er ' + channel);
    setChannelApisdata(data,ch);  

    });
  }; 


  function setChannelApisdata (data,ch) {

    for (var i = 0; i < data.results.length; i++) {
   //console.log('ch er ' + ch);
    var channel = ch;
    var title = data.results[i].title;
    var originalTitle = data.results[i].originalTitle;
    var duration = data.results[i].duration;
    var descriptione = data.results[i].description;
    var shortDescription = data.results[i].shortDescription;
    var live = data.results[i].live;
    var premier = data.results[i].premier;
    var startTime = data.results[i].startTime;
    var aspectRatio = data.results[i].aspectRatio;
    var episode = data.results[i].series.episode;
    var series = data.results[i].series.series;

    var queryStr = 'INSERT INTO channel ' + 
    ' (channel,title,originaltitle,duration,description,shortdescription,live,premier,starttime,aspectratio,episode,series) ' +
    'VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12)';
    var parameters = [channel,title,originalTitle,duration,descriptione,shortDescription,live,premier,startTime,aspectRatio,episode,series];
        dbUtils.queryDb(queryStr, parameters, function(err) {
      if(err) {
        //console.log('ekki tókst');
      return console.error('error fetching client from pool', err);
      }

       //console.log('tókst');

      });

    };

  };


  clearTable ();

 	  
};







