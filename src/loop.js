const min = 1,
	  interval = min*60*1000;

const twitter = require('./data/twitter.js'),
	  db = require('./db');

exports.run = function(){
	loadTwitter();
}

function loadTwitter(){
	console.log("loading twitter")
	Promise.all([
		twitter.getHKXAgencies(),
		twitter.getKingsCross()	
	]).then((data)=>{
		let [ TwitterHKXAgencies, TwitterKingsCross ] = data;
		let prep = { date : new Date(), TwitterHKXAgencies, TwitterKingsCross};
		db.saveItem('twitter',prep).then((item)=>{
			console.log('saved twitter');
		});
	})

}









// setInterval(()=>{ loadTwitter(); },interval);