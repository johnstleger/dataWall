'use strict';

const AlchemyLanguageV1 = require('watson-developer-cloud/alchemy-language/v1');
const alchemy_language = new AlchemyLanguageV1({
  api_key: process.env.WATSON_ALCHEMY_KEY
});

exports.get = function(A_text,extract){
	return new Promise((fulfill,reject)=>{
		let text = A_text.replace(/<(?:.|\n)*?>/gm, '');
		let parameters = {
		  extract: extract, // authors concepts dates doc-emotion entities feeds keywords pub-date relations typed-rels doc-sentiment taxonomy title
		  sentiment: 1,
		  maxRetrieve: 5,
		  text
		};
		alchemy_language.combined(parameters,(err, response)=>{
			if(err){
				// Does not reject so other data is saved
				console.log('Alchemy Error ', err);
				return fulfill({});
			}
			fulfill(response);
		});
	});
}

