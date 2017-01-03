const meetup = require('meetup-api')({ key: process.env.MEETUP_API_KEY, });
const _ = require('underscore');
const hkx = require('../hkx-config.js');

exports.getEvents = function(){
	return new Promise((fulfill,reject)=>{

		let params = {
			lat:hkx.lat,
			lon:hkx.lon,
			radius:1,
			page:20,
			status:'upcoming',
			fields:'category, topics',
			order:'time'
		}; 
		
		let artsParams = _.clone(params);
			artsParams.category=1;

		let techParams = _.clone(params);
			techParams.category = 34;

		let writingParams = _.clone(params);
			writingParams.category=36;

		Promise.all([
			getEventsInCategory(artsParams),
			getEventsInCategory(techParams),
			getEventsInCategory(writingParams)	
		]).then((data)=>{
			let [ arts, tech, writing ] = data;
			fulfill({ arts, tech, writing });
		});

		function getEventsInCategory(in_params){
			return new Promise((fulfill,reject)=>{
				meetup.getOpenEvents(in_params, (err, reponse)=>{
					if(err) return console.log('Meetup Error ', err);
				    fulfill(reponse)
				});
			});
		}

	});
}
