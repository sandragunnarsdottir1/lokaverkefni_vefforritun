'use strict';

var validate = { };

validate.isEmail = function(email) {
  return email.indexOf('.') >= 0 && email.indexOf('@') >= 0;
};

validate.required = function(s) {
	return s && s !== '';
};          

validate.length = function(s, n) {
  return s.length >= n;
};


validate.checkPassword = function(a, b) {
    if (a === b){
      return true;
    }
    else{
      return false;
    }
};




module.exports = validate;