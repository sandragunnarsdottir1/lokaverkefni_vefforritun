//'use strict';

var validate = { };

validate.isEmail = function(email) {
  return email.indexOf('.') >= 0 && email.indexOf('@') >= 0;
};

validate.required = function(s) {
	return s && s !== '';
};          

validate.length = function(s, n) {
  return s.length >= n;
}

validate.address = function(s) {
	var x = (s.match(/^[A-Öa-ö]+ [0-9]+$/));
  if(x === null) {
    return false;
  }
  else{
    return true;
  } 
};

validate.oneOf = function(s, array) {
  return array.indexOf(s) >= 0;
}

validate.phonenumber = function(s) {
  return s.match(/^[4-8]/) !== null && s.replace(/[- ]/, '').length === 7 
    && !isNaN(s.replace(/[- ]/, ''));
}


validate.phoneForm = function (v) {
      return (v.match(/^[4-8]/) && v.replace(/[- ]/, '').split('').length == 7  );
    };


module.exports = validate;