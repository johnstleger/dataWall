const router = require('express').Router(); 
const db = require('../db');

router.use('/twitter',(req,res)=>{
	db.getCollection('twitter').then((data)=>{
		res.send(data);
	});
});

router.use('/havasInTheMedia',(req,res)=>{
	db.getCollection('havasInTheMedia').then((data)=>{
		res.send(data);
	});
});

router.use('/meetupEvents',(req,res)=>{
	db.getCollection('meetupEvents').then((data)=>{
		res.send(data);
	});
});


// Incomplete --
router.use('/transport',(req,res)=>{
	db.getCollection('havasInTheMedia').then((data)=>{
		res.send(data);
	});
});

module.exports = router;
