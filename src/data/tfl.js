const request = require('request'),
	  _ = require('underscore');

const hkx = require('../hkx-config.js');


exports.getTubeStatus = function(){
	return new Promise((fulfill,reject)=>{
		TFL_API('/Line/Mode/tube/Status?detail=true',(data)=>{
			fulfill(data);
		});
	});
}

exports.getBarclaysBike = function(){
	return new Promise((fulfill,reject)=>{
		
		TFL_API('/BikePoint?lat='+hkx.lat+'&lon='+hkx.lon+'&radius=500' ,(data)=>{
			
			let prep = {
				time: new Date(),
				total_stations:data.places.length,
				total_docks:0,
				total_bikes:0,
				stations:[]
			}

			_.each(data.places,(dock,i)=>{

				// Find object in array and convert [value] to number
				dock.bikes_count = Number( _.findWhere(dock.additionalProperties,{key:"NbBikes"}).value );
				dock.total_docks_count = Number( _.findWhere(dock.additionalProperties,{key:"NbDocks"}).value );
				
				// Add Totals
				prep.total_bikes += dock.bikes_count;
				prep.total_docks += dock.total_docks_count;

				delete dock.additionalProperties // Simplifies JSON Output

				prep.stations.push(dock);

			});

			fulfill(prep);
		});
	});
}




// Adds Api Key --
function TFL_API(url,callback){

	let _url = 'https://api.tfl.gov.uk'+url+'&app_id='+process.env.TFL_APP_ID+'&app_key='+process.env.TFL_KEY;
	request(_url,(err, response, body)=>{
		if(err) return  console.log('TFL ', error);
		callback( JSON.parse(body) );
	});
	
}




