const min = 1,
	  interval = min*60*1000;

exports.run=()=>{
	setInterval(()=>{ console.log('Interval:',new Date().getTime()); },interval);
}
