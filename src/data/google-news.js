// Google News

const parseString = require('xml2js').parseString,
	  request = require('request'),
	  _ = require('underscore'),
	  encoder = require('node-html-encoder').Encoder,
	  cheerio = require('cheerio'),
	  async = require('async');

const helper = require('../helpers');

const Encoder = new encoder('entity');

exports.get = function get(term){
	return new Promise((fulfill,reject)=>{

		request('https://news.google.com/news/section?cf=all&pz=1&ned=uk&q='+term+'&output=rss', (error, response, body)=>{
			
			if(error){ console.log(error); return; }
			parseString(body, (err, result)=>{
				
				let feed = result.rss.channel[0].item; //feed = feed.splice(1,1);
				async.each(feed, function(item, next) {

					delete item['guid'];
					let title_split = item.title[0].split(" - ");
					let title = title_split[0];
					let encodedDescription = Encoder.htmlDecode(item.description[0]);
					let $description = cheerio.load(item.description[0]);
					let date = new Date(item.pubDate[0]);
					item.title = title.replace(':',':<br/>').trim()+".";
					item.compressedTitle = item.title.replace(/[&\/\\#,+( )$~%.$£'":*?<>{}]/g, '');
					item.img = "https:" + $description('img').attr('src');
					item.link = item.link[0];
					item.directLink = item.link.split('&url=')[1];
					item.source = title_split[title_split.length-1].trim();
					item.fullDescription = $description("td.j div.lh").html();
					item.description = ( item.title +" "+ $description("td.j div.lh>font:nth-child(5)").text() ).replace("<br/>"," ");
					item.pubTime = helper.padNumber(date.getHours()) +":"+ helper.padNumber(date.getMinutes());
					item.pubDate = date.getDate()+"/"+( date.getMonth()+1 )+"/"+date.getFullYear();
					item.fullPubDate = date;

					setTimeout(()=>{ next(); },200);
				    
				}, function(err) {
				    if( err ) return console.log('error',err);
				    console.log('news feed ', feed.length );
				    fulfill(feed);
				});

			});
		});
	});
}
