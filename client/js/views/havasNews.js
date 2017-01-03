(function(){

	App.View.HavasNewsView = Backbone.View.extend({
		id:'HavasNewsView',
		className:'',
	    initialize:function(){
	    	var self = this;
	    	self.playhead = 0;
			self.template = _.template($("#havas-news-template").html());
			self.dataUpdate();
	    },
	    events:{
	    	// click:'dataUpdate'
	    },
	    dataUpdate:function(){
	    	var self = this;
	    	App.LoadingTransition.tweenTo('active'); 
	    	$.get("/api2/havasInTheMedia", function(data) {
	    		self.data = data;
				self.render();
				App.LoadingTransition.tweenTo('complete'); 
			});
	    },
	    initAnimation:function(){
	    	var tweetsLoop = {};
				tweetsLoop.$tweets = self.$(".twitter-loop-block li");
	   			tweetsLoop.Tl = new TimelineMax({onComplete:function() { this.restart(); }});
	   			TweenMax.set(tweetsLoop.$tweets, { y: 100, opacity: 0 });
				_.each(tweetsLoop.$tweets, function($tweetsLoop_tweet,i){
					tweetsLoop.Tl
					  .to($tweetsLoop_tweet, 0.5, { y: 0, opacity: 1 }, '-=0.3')	
				      .to($tweetsLoop_tweet, 0.5, { y: -100, opacity: 0 }, '+=3.5')
				});
				tweetsLoop.Tl.play();
	    },
	    render:function(){

	    	var self = this;
	    	console.log(self.data);
	    	self.$el.html(self.template(self.data));
	    	
			App.$el.append(self.$el);
			self.Animation = self.initAnimation();

	    },
	    destroy:function(callback){
	    	var self = this;
	    	self.$el.fadeOut(200, function(){
	    		self.stopListening();
			    self.undelegateEvents();
			    self.$el.removeData().unbind(); 
			    self.remove();  
			    Backbone.View.prototype.remove.call(self);
			    callback();
			});
		}
	});
})();