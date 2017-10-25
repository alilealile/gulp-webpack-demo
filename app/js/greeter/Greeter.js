//var config = require('../json/config.json');

import config from '../../json/config.json';

module.exports = function(){
	var greet =document.createElement('div');
	greet.textContent = config.greetText;
	return greet;
};