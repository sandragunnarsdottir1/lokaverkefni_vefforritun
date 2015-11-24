var express = require('express');
var router = express.Router();

var validate = require('../lib/validate');

/* GET /form */
router.get('/', function(req, res, next) {
  res.render('samband', { title: 'Hafðu samband' });
});

/* POST /form */
router.post('/bar', function(req, res, next) {

	var data = { title: 'Hafðu samband' };
	var results = [];
	var valid = true;
	var formData = [];

	var check1 = {
		name: 'Nafn þarf að vera lengra en 2 stafir',
		result: validate.length(req.body.name, 3)
	}
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

	/*var check6 = {
		name: 'Heimilisfang á að innihalda götuheiti og tölu',
		result: validate.address(req.body.address)
	};
	results.push(check6);
	valid = valid && check6.result;*/
	
	/*if(req.body.phone && req.body.phone !== '') {
	
	var check7 = {
			name: 'Númerið þarf að byrja á 4-8 og vera sjö stafir að lengd',
			result: validate.phonenumber(req.body.phone)
		};
		results.push(check7);
		valid = valid && check7.result;
	}

	var check8 = {
		name: 'Veldu tegund húsnæðis',
		result: validate.oneOf(req.body.home, ['Einbýli', 'Tvíbýli', 'Fjölbýli'])
	};
	results.push(check8);
	valid = valid && check8.result;*/

	data.results = results;
	data.valid = valid;
	data.formData = formData;

	if(valid === true){
		res.render('form', data);
	}
	else{
		res.render('samband', data);
	}
});

module.exports = router;