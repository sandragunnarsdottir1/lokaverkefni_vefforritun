'use strict';
var express = require('express');
var router = express.Router();

var validate = require('../lib/validate');

/* GET /form */
router.get('/', function(req, res) {

  res.render('samband', { title: 'Hafðu samband',session : req.session});
});

/* POST /form */
router.post('/', function(req, res) {
	var data = {session : req.session};
	data.title = 'Hafðu samband';
	var results = [];
	var valid = true;

	var check1 = {
		name: 'Nafn þarf að vera lengra en 2 stafir',
		result: validate.length(req.body.name, 3)
	};
	results.push(check1);
	valid = valid && check1.result;
	data.name = req.body.name;


	var check2 = {
		name: 'Þú þarft að fylla út upplýsingar um nafn',
		result: validate.required(req.body.name)  
	};
	results.push(check2);
	valid = valid && check2.result;

	var check3 = {
		name: 'Þú þarft að fylla út upplýsingar um netfang',
		result: validate.required(req.body.email)
	};
	results.push(check3);
	valid = valid && check3.result;

	var check4 = {
		name: 'Netfang þarf að innihalda bæði . og @',
		result: validate.isEmail(req.body.email)
	};
	results.push(check4);
	valid = valid && check4.result;

	var check5 = {
		name: 'Þú þarft að gefa upp Efni fyrirspurnar',
		result: validate.required(req.body.efni)
	};
	results.push(check5);
	valid = valid && check5.result;

	var check6 = {
		name: 'Þú þarft að gefa upp Fyrirspurn',
		result: validate.required(req.body.query)
	};
	results.push(check6);
	valid = valid && check6.result;	



	data.results = results;
	data.valid = valid;
	data.email = req.body.email;
	data.efni = req.body.efni;
	data.query = req.body.query;

	if(valid === true){
		res.render('form', data);
	}
	else{
		res.render('samband', data);
	}
});

module.exports = router;