// Twitter
const Twitter = require('twitter'),
	  _ = require('underscore'),
	  async = require('async');

const hkx = require('../hkx-config.js'),
	  alchemy = require('./alchemy/alchemy');

const client = new Twitter({
  consumer_key: process.env.TWITTER_CONSUMER_KEY,
  consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
  access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
  access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
});

exports.getHKXAgencies = function(){
	return new Promise((fulfill,reject)=>{
		let handles = _.map( hkx.twitter, (item)=>{ return item.handle; }).join(',');
		let params = { screen_name : handles };
		
		client.get('/users/lookup', params,(err, data, response)=>{
			
			if(err) return console.log(error);
			
			let prep = {
				time: new Date(),
				total_agency_accounts:data.length,
				total_followers_count:0,
				total_statuses_count:0,
				agencies:[]
			};
			
			_.each(data,(d,i)=>{
				prep.total_followers_count += d.followers_count;
				prep.total_statuses_count += d.favourites_count;
				prep.agencies.push({
					id: d.id,
					name: d.name,
					screen_name: d.screen_name,
					description: d.description,
					followers_count: d.followers_count,
					favourites_count: d.favourites_count,
					statuses_count: d.statuses_count,
					status: d.status
				});
			});

			fulfill(prep);
		});
	});
};


exports.getKingsCross = function(){
	return new Promise((fulfill,reject)=>{
		let params = {
			geocode: hkx.lat+','+hkx.lon+',1km',
			lang:'en',
			result_type:'recent',
			count:30
		};
		client.get('search/tweets', params,(err, data, response)=>{
			if(err) return console.log(error);
			data.tweetsConcat = _.map(data.statuses, (d,i)=>{ return d.text; }).join('. ');

			async.eachSeries(data.statuses.slice(0,1), function loop(item, callback) {

				// Get sentiment for each tweet -
			    alchemy.get(item.text,'doc-sentiment').then((response)=>{
					item.alchemy = response;
					callback(data);
				});
			}, function done(){
				// Get Sentiment and emotions for all tweets
			    alchemy.get(data.tweetsConcat,'doc-sentiment,doc-emotion').then((response)=>{
					data.alchemy = response;
					fulfill(data);
				});
			});
		});
	});
}





