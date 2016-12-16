(function(){

	App.View.TransportView = Backbone.View.extend({
		id:'TransportView',
		className:'',
	    initialize:function(){
	    	var self = this;
	    	self.Vent = _.extend({},Backbone.Events);
			self.template = _.template($("#transport-template").html());
			getData(function(data){
				self.data=data;
				self.render();
			});	
	    },
	    events:{
	    	click:'dataUpdate'
	    },
	    dataUpdate:function(){
	    	var self = this;
	    	App.LoadingTransition.tweenTo('active'); 
	    	setTimeout(function(){
	    		self.render();
	    		App.LoadingTransition.tweenTo('complete'); 
	    	},500);

	    },
	    initAnimation:function(){

	    	var self = this;

	    	// Looping Animations
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



	    	// Main Animations'
    		var tl = new TimelineMax({ onComplete:function(){ this.restart(); } });		
    		// Scene1
			var s1 = {};
    			s1.base = self.$('.scene1');
    			s1.blocks = self.$('.ani-block');

				TweenMax.set( s1.base, { opacity:0 });
				TweenMax.set( s1.blocks, { y:100, opacity:0 });

				tl.to(s1.base, 0.5, { opacity:1 })
				  .staggerTo( s1.blocks, 0.5, { y:0, opacity:1 },0.1, '+=0.5')
				  .set({}, {}, "+=1.5")
				  .staggerTo( s1.blocks, 0.5, { y:-100, opacity:0 },0.1, '+=0.5')
				  .addLabel('scene1');

			return tl;

	    },
	    render:function(){

	    	var self = this;

	    	self.$el.html(self.template(self.data));

	    	self.Animation = self.initAnimation();
			App.$el.append(self.$el);
			if('Animation' in self){ self.Animation.play(); }
			
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




























	function getData(callback){
		callback({
			tfl:{
	    		lastUpdated:new Date(),
	    		tweets:[
	    			{
		    			text:'Alteration to the 09:20 London Liverpool Street to Shenfield due 10:03 due to a late running train.',
		    			handle:'@tfl',
		    			date:new Date()
		    		},
		    		{
		    			text:'Alteration to the 09:20 London Liverpool Street to Shenfield due 10:03 due to a late running train.',
		    			handle:'@tfl',
		    			date:new Date()
		    		}
	    		]
	    	},
	    	bike:{
	    		lastUpdated:new Date(),
	    		bikesCount:20,
	    		spacesCount:40,
	    		stations:[
	    			{
	    				name:'street 1',
	    				geo:{ lat:0,lon:0 },
	    				bikesCount:20,
	    				spacesCount:40
	    			},
	    			{
	    				name:'street 1',
	    				geo:{ lat:0,lon:0 },
	    				bikesCount:20,
	    				spacesCount:40
	    			}
	    		]
	    	},
	    	uber:{
	    		lastUpdated:new Date(),
	    		approx:'10mins'
	    	}
		});
	}

})();