$.fn.addCommas = function(){ return this[0].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","); }

App.Helper.rangeToPercent = function(number, min, max){ 
	return ((number - min)/(max - min))*100; 
};
App.Helper.isOdd = function(num) { 
	return num % 2;
};


