'use strict';

var express = require('express');
var router = express.Router();
var dbUtils = require('../utils/db-utils');
var validate = require('../lib/validate');


/* GET home page. */
router.get('/', function(req, res) {
  var data = { session : req.session };
  data.title = 'Ný færsla';
  res.render('newentry', data);
});


router.post('/', function(req, res) {
 
  var date = new Date(); 
  var data = {session : req.session};
  var results = [];
  var valid = true;
  

  function insertTitle () {
    var queryStr = 'INSERT INTO titletable ' + 
    ' (title, username, create_date) ' +
    'VALUES ($1, $2, $3)';
    var parameters = [req.body.title, req.session.user.username,date];
    dbUtils.queryDb(queryStr, parameters, function(err) {
      if(err) {
        return console.error('error fetching client from pool', err);
      }
      getIdTitle();
    });
    
  }

  function getIdTitle () {
    var queryStr = 
    'SELECT titleid FROM titletable WHERE username = $1 AND create_date = $2';
    var parameters = [req.session.user.username,date];
    dbUtils.queryDb(queryStr, parameters, function(err,result) {
      if(err) {
        return console.error('error fetching client from pool', err);
      }
      var id = {titil:'færsla'};
      id.results = result.rows;
      insertEntries(id.results[0].titleid);
    });
    
  }

  function insertEntries (id) {
  var queryStr = 'INSERT INTO entries' + 
  ' (entry_text, username, create_date,titleid) ' +
  'VALUES ($1, $2, $3, $4)';
  var parameters = [req.body.entry,req.session.user.username,date,id]; 
  dbUtils.queryDb(queryStr, parameters, function(err) {
    if(err) {
      return console.error('error fetching client from pool', err);
    }
    res.redirect('/wall');
  });   
    
  }

  var check1 = {
    name: 'Þú þarft að fylla út upplýsingar um titil',
    result: validate.required(req.body.title)  
  };
  results.push(check1);
  valid = valid && check1.result;

  var check2 = {
    name: 'Þú þarft að fylla út upplýsingar um færslu',
    result: validate.required(req.body.entry)  
  };
  results.push(check2);
  valid = valid && check2.result;

  data.results = results;
  data.valid = valid;
  data.title = req.body.title;
  data.entry = req.body.entry;

  if(valid === true){
    insertTitle();
  }
  else{
    res.render('newentry', data);
  }
  

});

module.exports = router;