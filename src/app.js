require('dotenv').config();

const express = require('express'),
	  app = express(),
      cfenv = require('cfenv'),
	  appEnv = cfenv.getAppEnv(),
	  db = require('./db'),
	  dataLoop = require('./data-loop');

app.use('/', express.static('./public') );
app.use('/api', require('./routes/api'));

db.connect((err)=>{
	if(err) return console.log( 'No Mongo Connection ', err );
	app.listen( appEnv.port, '0.0.0.0', ()=>{ 
		console.log('Running ',appEnv.url); 
		dataLoop.run();
	});
});