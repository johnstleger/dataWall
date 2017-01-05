"use strict"
const AlchemyDataNewsV1 = require('watson-developer-cloud/alchemy-data-news/v1'),
	  _ = require('underscore');

const alchemy_data_news = new AlchemyDataNewsV1({ 
	api_key: process.env.WATSON_ALCHEMY_KEY 
});



exports.getNews = function(){
	return new Promise((fulfill,reject)=>{
		let params = {
			start: 'now-3M',end: 'now',rank:'high',count: 100,dedup:true,
			return:'enriched.url.title,enriched.url.url,enriched.url.enrichedTitle.docSentiment',
			'q.enriched.url.enrichedTitle.entities.entity':'|text=havas,type=company|'
		};
		alchemy_data_news.getNews(params, function (err, news) {
			if(err) return console.log('error:', err);
			fulfill(news);
		});
	});
}
