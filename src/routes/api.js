const router = require('express').Router(); // http://stackoverflow.com/questions/25260818/rest-with-express-js-nested-router

// app.get('/api',(req,res)=>{
// 	Promise.all([
// 		db.getCollection('IntentDemographicsAge'),
// 		db.getCollection('IntentGeography'),
// 	]).then((data)=>{
// 		let [ IntentDemographicsAge, IntentGeography ] = data;
// 		res.send({ IntentDemographicsAge, IntentGeography });
// 	});		
// });







// News --
// router.use('/news',(req,res)=>{
// 	let googleNews = require('../data/google-news.js');
// 		// googleNews.get('Havas').then((d)=>{ res.send(d); });
// 		// googleNews.get('Kings Cross').then((d)=>{ res.send(d); });
// });


// Google Trends --
// router.use('/googleTrends',(req,res)=>{
// 	let googleTrends = require('google-trends-api');
// 		googleTrends.trendData(['Havas','Publicis','Omnicom','WPP']).then((d)=>{ res.send(d); });
// });


// Rail --
// router.use('/rail',(req,res)=>{ 
// 	res.send('Rail Data'); 
// });


// Underground --
// router.use('/tube',(req,res)=>{ 
// 	res.send('Tube Data'); 
// });


// Uber --
// router.use('/uber',(req,res)=>{ 
// 	res.send('Uber Data'); 
// });



router.use('/twitter',(req,res)=>{
	let twitter = require('../data/twitter.js');
		twitter.getHKXAgencies().then((d)=>{ res.send(d); });
});

module.exports = router;