const twitter = require('./data/twitter.js'),
	  googleNews = require('./data/google-news.js'),
	  meetup = require('./data/meetup.js'),
	  dataNews = require('./data/alchemy/dataNews.js');

const db = require('./db');

exports.run = function(){
	// Intervals go here --
	// loadTwitter();
	// loadHavasInTheMedia();
	// loadHavasDataNews();
	// loadMeetupData();
}



function loadTwitter(){
	Promise.all([
		twitter.getHKXAgencies(),
		twitter.getKingsCross()	
	]).then((data)=>{
		let [ TwitterHKXAgencies, TwitterKingsCross ] = data;
		let prep = { date : new Date(), TwitterHKXAgencies, TwitterKingsCross};
		db.saveItem('twitter',prep).then((item)=>{
			console.log('saved twitter');
		});
	});
}



function loadHavasInTheMedia(){
	googleNews.get('Havas').then((HavasInTheMedia)=>{
		let prep = { date : new Date(), HavasInTheMedia};
		db.saveItem('havasInTheMedia',prep).then((item)=>{
			console.log('saved twitter');
		});
	});
}

function loadHavasDataNews(){
	dataNews.getNews().then((DataNews)=>{ 
		let prep = { date : new Date(), DataNews };
		db.saveItem('havasDataNews',prep).then((item)=>{
			console.log('saved data news');
		});
	});
}


function loadMeetupData(){
	meetup.getEvents().then((MeetupEvents)=>{ 
		let prep = { date : new Date(), MeetupEvents};
		db.saveItem('meetupEvents',prep).then((item)=>{
			console.log('saved meetup events');
		});
	});
}



