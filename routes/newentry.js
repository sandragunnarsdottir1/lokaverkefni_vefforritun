'use strict';

var express = require('express');
var router = express.Router();
var dbUtils = require('../utils/db-utils');


/* GET home page. */
router.get('/', function(req, res) {
  res.render('newentry', {session : req.session});
});


router.post('/', function(req, res) {
 
  var date = new Date(); 
  

  function insertTitle () {
    //console.log(req.session);
    var queryStr = 'INSERT INTO titletable ' + 
    ' (title, username, create_date) ' +
    'VALUES ($1, $2, $3)';
    var parameters = [req.body.title, req.session.user.username,date];
    dbUtils.queryDb(queryStr, parameters, function(err) {
      if(err) {
        console.log('tókst ekki að gera insertTitle')
        return console.error('error fetching client from pool', err);
      }
      console.log('tókst að gera insertTitle')
      getIdTitle();
    });
    
  }

  function getIdTitle () {
    var queryStr = 'SELECT titleid FROM titletable WHERE username = $1 AND create_date = $2'
    var parameters = [req.session.user.username,date];
    dbUtils.queryDb(queryStr, parameters, function(err,result) {
      if(err) {
         console.log('tókst ekki að gera getIdTitle')
        return console.error('error fetching client from pool', err);
      }
       console.log('tókst að gera getIdTitle')

      var id = {titil:'færsla'};
      id.results = result.rows;
      console.log('id er: '+ id.results[0].titleid);
      //res.send(id);
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
      console.log('tókst ekki að gera insertEntries')
      return console.error('error fetching client from pool', err);
    }
    console.log('tókst að gera insertEntries')
    res.redirect('/wall');
  });   
    
  }

  insertTitle();


  /*console.log(req.session);
  var queryStr = 'INSERT INTO titletable ' + 
  ' (title, user, create_date) ' +
  'VALUES ($1, $2, now())';
  var parameters = [req.body.title, req.session.user.username];

  dbUtils.queryDb(queryStr, parameters, function(err) {
    if(err) {
      return console.error('error fetching client from pool', err);
    }
    res.redirect('/wall');
  });*/



});

module.exports = router;