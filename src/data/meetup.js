const meetup = require('meetup-api')({ key: process.env.MEETUP_API_KEY, });

const hkx = require('../hkx-config.js');

// Number of meetup members in each city --
// exports.getCities = function(){
// 	return new Promise((fulfill,reject)=>{
// 		let parameters = {
// 			country: 'GB',
// 			lat: hkx.lat,
// 			lon: hkx.lon
// 		};
// 		meetup.getCities(parameters, (err, reponse)=>{
// 			if(err) return console.log('Meetup Error ', err);
// 		    fulfill(reponse)
// 		});
// 	});
// }


// exports.getTopics = function(){
// 	return new Promise((fulfill,reject)=>{
// 		let parameters = {
// 			lat: hkx.lat,
// 			lon: hkx.lon
// 		};
// 		meetup.getTopicCategories(parameters, (err, reponse)=>{
			//if(err) return console.log('Meetup Error ', err);
// 		    fulfill(reponse)
// 		});
// 	});
// }


var	count = 1;
exports.getTopics = function(){
	let parameters = {
		country:'GB',
		city:'london'
	};
	return new Promise((fulfill,reject)=>{

		meetup.getStreamOpenEvents(parameters).on('data',(obj)=>{
			
				console.log(obj);

		}).on('end', function () {
			console.log('Done!');
		});

	});
}



