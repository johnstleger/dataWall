const router = require('express').Router(); 

const db = require('../db');

router.use('/twitter',(req,res)=>{
	db.getCollection('twitter').then((data)=>{
		res.send(data);
	});
});


module.exports = router;
