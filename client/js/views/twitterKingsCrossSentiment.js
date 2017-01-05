(function(){

	App.View.TwitterKingsCrossSentiment = Backbone.View.extend({
		id:'TwitterKingsCrossSentiment',
		className:'',
	    initialize:function(){
	    	var self = this;
	    	self.playhead = 0;
			self.template = _.template($("#twitter-sentiment-template").html());
			self.dataUpdate();	
			setInterval(function(){
				self.dataUpdate();	
			},30000);	
	    },
	    events:{
	    	click:'dataUpdate'
	    },
	    dataUpdate:function(){
	    	var self = this;
	    	App.LoadingTransition.tweenTo('active'); 
	    	$.getJSON('./api2/twitter', function( data ) {
				self.data = data;
				self.render();
	    		App.LoadingTransition.tweenTo('complete'); 
			});	
	    },
	    initAnimation:function(){

	    	var self = this;
    		var tl = new TimelineMax({ onComplete:function(){ this.restart(); }});		
				
    		// Scene1
			var s1 = {};
    			s1.base = self.$('.scene1');
    			s1.animated_bar_container = s1.base.find(".sentiment-emotions-chart li");
    			s1.animated_bar = s1.base.find(".bar span");
    			s1.animated_bar_negative = s1.base.find(".bar.negative span");
    			s1.animated_bar_positive = s1.base.find(".bar.positive span");

				TweenMax.set(s1.base, { opacity:0 });
				TweenMax.set(s1.animated_bar_negative, { opacity:0, x:300 });
				TweenMax.set(s1.animated_bar_positive, { opacity:0, x:-300 });

				tl.to(s1.base, 0.5, { opacity:1 }, '+=0.5')
				  .staggerTo(s1.animated_bar, 1, { opacity:1, x:0 }, 0.1, '-=1')
				  .staggerTo(s1.animated_bar_container, 0.7, { opacity:0, y:-250 }, 0.1, '+=4')
				  .to(s1.base, 0.5, { opacity:0 }, '-=0.5')
				  .addLabel('scene1');

			// Scene2
			var s2 = {};
				s2.base = self.$('.scene2');
				s2.tweets = s2.base.find('.twitter-loop-block li');
				s2.tweets_bar = s2.tweets.find('.bar span');

				TweenMax.set(s2.base, { opacity:0 });
				TweenMax.set(s2.tweets,{ y: 100, opacity: 0 });
				TweenMax.set(s2.tweets_bar,{ opacity:0, x:-300 });

				tl.to(s2.base, 0.5, { y:0, opacity:1 }, '+=0');
				tl.set({}, {}, "+=0.5");
				_.each(s2.tweets, function($s2_tweet,i){
					var $tweetBar = $($s2_tweet).find('.bar span');
					tl.to($s2_tweet, 0.8, { y: 0, opacity: 1 }, '-=0.3')
					  .to($tweetBar, 0.8, { opacity:1, x:0}, '-=0.8')
				      .to($s2_tweet, 0.8, { y: -100, opacity: 0 }, '+=3.5')
				      .set({}, {}, "+=0.5");
				});
				tl.addLabel('scene2');

			return tl;
	    },
	    render:function(){

	    	var self = this;

	    	self.$el.html(self.template({	
		    	emotion:[
		    		{label:'Anger',positive:'20',negative:'0'},
		    		{label:'Disgust',positive:'0',negative:'30'},
		    		{label:'Fear',positive:'0',negative:'40'},
		    		{label:'Joy',positive:'70',negative:'0'},
		    		{label:'Saddness',positive:'0',negative:'30'}
		    	],
		    	tweets:self.data.TwitterKingsCross.statuses.slice(0,5)
		    }));

	    	self.Animation = self.initAnimation();
			App.$el.append(self.$el);
			self.Animation.play();
	
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