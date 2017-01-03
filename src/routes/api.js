// stackoverflow.com/questions/25260818/rest-with-express-js-nested-router
const router = require('express').Router(); 



let tfl = require('../data/tfl.js');
router.use('/tube',(req,res)=>{ 
	tfl.getTubeStatus().then((d)=>{ res.send(d); });
});
router.use('/trains',(req,res)=>{ 
	tfl.getTrainsInOut().then((d)=>{ res.send(d); });
});
router.use('/bike',(req,res)=>{ 
	tfl.getBarclaysBike().then((d)=>{ res.send(d); });
});




let uber = require('../data/uber.js');
router.use('/uber',(req,res)=>{ 
	uber.getEstimate().then((d)=>{ res.send(d); });
});




let twitter = require('../data/twitter.js');
router.use('/twitter_kingscross',(req,res)=>{
	twitter.getKingsCross().then((d)=>{ res.send(d); });
});
router.use('/twitter_agencies',(req,res)=>{
	twitter.getHKXAgencies().then((d)=>{ res.send(d); });
});




let meetup = require('../data/meetup.js');
router.use('/meetup',(req,res)=>{
	//meetup.getTopics().then((d)=>{ res.send(d); });
	meetup.getEvents().then((d)=>{ res.send(d); });
});




// let googleTrends = require('google-trends-api');
// router.use('/googleTrends',(req,res)=>{
// 	// Havas,Publicis,Omnicom,WPP
// 	googleTrends.trendData(['Havas']).then((d)=>{ res.send(d); });
// });



// News --
router.use('/news',(req,res)=>{
	let googleNews = require('../data/google-news.js');
		googleNews.get('Havas').then((d)=>{ res.send(d); });
		// googleNews.get('Kings Cross').then((d)=>{ res.send(d); });
});



module.exports = router;







