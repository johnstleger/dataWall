require('dotenv').config();

const express = require('express'),
	  app = express(),
      cfenv = require('cfenv'),
	  appEnv = cfenv.getAppEnv(),
	  cors = require('cors');

const db = require('./db'),
	  loop = require('./loop');

app.use(cors());
app.use('/', express.static('./client'));
app.use('/api', require('./routes/api'));

db.connect((err)=>{
	if(err) return console.log( 'No Mongo Connection ', err );
	app.listen( appEnv.port, '0.0.0.0', ()=>{ 
		console.log('Running ',appEnv.url); 
		// loop.run();
	});
});