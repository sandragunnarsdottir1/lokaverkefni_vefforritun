'use strict';

var dbUtils = require('../utils/db-utils');
var request = require('request');

exports.tvLisit = function () {
  // Hreinsar töflun channel og kalla á getDifferntChannel
  function clearTable () {
    var queryStr = 'TRUNCATE channel';
    dbUtils.queryDb(queryStr, null, function(err) {
      if(err) {
   
        return console.error('error fetching client from pool', err);
      }
      getDifferentChannel();
    });
  }
    
   function getDifferentChannel () {
    var ch = ['ruv','stod2','stod2sport','stod2sport2',
              'stod2gull','stod2bio','stod3','skjar1'];
    for (var x = 0; x < ch.length; x++) {
      getApisdata(ch[x]);
    }
  }

  function getApisdata (channel) {
    request('http://apis.is/tv/'+channel+'', function(error, response, body) {
    var data = JSON.parse(body);
    var ch = channel;
    setChannelApisdata(data,ch);  
    });
  }


  function setChannelApisdata (data,ch) {
    for (var i = 0; i < data.results.length; i++) {
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
      ' (channel,title,originaltitle,duration,description,shortdescription'+
      ',live,premier,starttime,aspectratio,episode,series) ' +
      'VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12)';
      var parameters = [channel,title,originalTitle,duration,descriptione,
      shortDescription,live,premier,startTime,aspectRatio,episode,series];
      dbUtils.queryDb(queryStr, parameters, function(err) {
        if(err) {
          return console.error('error fetching client from pool', err);
        }
      });
    }
  }
  clearTable ();
 
};

