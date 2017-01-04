const meetup = require('meetup-api')({ key: process.env.MEETUP_API_KEY, });
const _ = require('underscore');
const hkx = require('../hkx-config.js');

exports.getEvents = function(){
	return new Promise((fulfill,reject)=>{

		let params = {
			lat:hkx.lat,
			lon:hkx.lon,
			radius:3,
			page:20,
			status:'upcoming',
			fields:'category, topics',
			order:'distance'
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

			arts.colorRGB = [0,204,204];
			arts.category = 'arts';

			tech.colorRGB = [255,39,91];
			tech.category = 'tech';

			writing.colorRGB = [21,152,209];
			writing.category = 'writing';

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
