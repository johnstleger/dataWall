// Twitter
const Twitter = require('twitter'),
	  _ = require('underscore');

const client = new Twitter({
  consumer_key: process.env.TWITTER_CONSUMER_KEY,
  consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
  access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
  access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
});

const hkx_twitter = [
	{name:'Havas Media Group',handle:'havas_mguk'},
	{name:'havas Media',handle:'HavasMediaUK'},
	{name:'Arena Media',handle:'ArenaMediaUK'},
	{name:'Forward',handle:'Havas_MGUK'},
	{name:'Ecselis',handle:'Ecselis'},
	{name:'DBi',handle:'havasluxhub'},
	{name:'Lux Hub',handle:'havasluxhub'},
	{name:'Havas Media Global', 'handle':'HavasMedia'},
	{name:'Affiperf',handle:'affiperf'},
	{name:'WebNarrative',handle:'webnarrative'},
	{name:'SCB partners',handle:'scbpartners'},
	{name:'Socalyse',handle:'Socialyse'},
	{name:'Mobext',handle:'mobext'},
	{name:'Field Day',handle:'WeAreFieldDay'},
	{name:'Havas SE & Cake',handle:'Havas_SE'},
	{name:'Havas Recruitment',handle:'HMGRecruitment'},
	{name:'Havas London',handle:'havaswwldn'},
	{name:'Havas Helia',handle:'havaslondon'},
	{name:'ARM',handle:'AllResponse'},
	{name:'Havas People',handle:'havaspeople'},
	{name:'Conran',handle:'conrandesign'},
	{name:'Maitland',handle:'havasprww'},
	{name:'PR North',handle:'theprblog'}
];

exports.getHKXAgencies = function get(term){
	return new Promise((fulfill,reject)=>{
		let handles = _.map(hkx_twitter,(item)=>{ return item.handle; });
		let params = { screen_name : handles.join(',') };
		client.get('/users/lookup', params,(err, tweets, response)=>{
			if(err) return console.log(error);
			fulfill(tweets);
		});
	});
};