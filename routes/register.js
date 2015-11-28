'use strict';

var express = require('express');
var router = express.Router();
var dbUtils = require('../utils/db-utils');
var passwordHash = require('password-hash');
var validate = require('../lib/validate');

/* GET home page. */
router.get('/', function(req, res) {
  var data = { session : req.session };
  data.title = 'Nýskrá';
  res.render('register', data);
});

/* GET home page. */
router.post('/', function(req, res) {
  
  var data = { title: 'Nýskrá' };
  var results = [];
  var valid = true;
  var formData = [];

  var checkZero = {
    name: 'Nafn þarf að vera lengra en 2 stafir',
    result: validate.length(req.body.name, 3)
  };
  results.push(checkZero);
  valid = valid && checkZero.result;
  
  var checkEitt = {
    name: 'Hér þarft þú að fylla út upplýsingar um nafn',
    result: validate.required(req.body.name)  
  };
  results.push(checkEitt);
  valid = valid && checkEitt.result;

  var checkTvo = {
    name: 'Hér þarft þú að fylla út upplýsingar um netfang',
    result: validate.required(req.body.email)
  };
  results.push(checkTvo);
  valid = valid && checkTvo.result;

  var checkThrju = {
    name: 'Netfang þarf að innihalda bæði . og @',
    result: validate.isEmail(req.body.email)
  };
  results.push(checkThrju);
  valid = valid && checkThrju.result;

  var checkFjogur = {
    name: 'Notendanafn þarf að vera lengra en 5 stafir',
    result: validate.length(req.body.username, 6)
  };
  results.push(checkFjogur);
  valid = valid && checkFjogur.result;

  var checkFimm = {
    name: 'Lykilorðin voru ekki eins. Reyndu aftur!',
    result: validate.checkPassword(req.body.password, req.body.password2)
  };
  results.push(checkFimm);
  valid = valid && checkFimm.result;

  var checkSex = {
    name: 'Lykilorð þarf að vera lengra en 5 stafir',
    result: validate.length(req.body.password, 6)
  };
  results.push(checkSex);
  valid = valid && checkSex.result;




  data.results = results;
  data.valid = valid;
  data.formData = formData;
  data.email = req.body.email;
  data.name = req.body.name;
  data.username = req.body.username;

  if(valid === true){
    var hashedPassword = passwordHash.generate(req.body.password);
    var queryStr = 'INSERT INTO users '+
    '(name, username, password, email, dateusers) '+
    'VALUES ($1, $2, $3, $4, now())';
    var parameters = [req.body.name, req.body.username, 
                      hashedPassword, req.body.email];
    dbUtils.queryDb(queryStr, parameters, function(err) {
      if(err) {
        res.render('register');
        return console.error('error fetching client from pool', err);
      }
      res.render('register', {msg: 'Takk fyrir skráninguna!', title: 'Nýskrá'});
    });
  }
  else{
    res.render('register', data);
  }















});


module.exports = router;
