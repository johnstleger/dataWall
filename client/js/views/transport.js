(function(){

	App.View.TransportView = Backbone.View.extend({
		id:'TransportView',
		className:'',
	    initialize:function(){
	    	var self = this;
	    	self.playhead = 0;
			self.template = _.template($("#transport-template").html());
			
			// $.getJSON('./api2/twitter', function( data ) {
			// 	console.log(data);
			// 	self.dataPrep(data)
				self.render();
			// });			
	    },
	    dataPrep:function(data){
	    	var self = this;
	    		self.data = data;	
	    },
	    initAnimation:function(){

	    	// GSAP - MASTER TIMELINE
	    	var self = this;
    		var tl = new TimelineMax({ onComplete:function(){ this.restart(); }});		
				
    		// SCENE 1 ----
			var s1 = {};
    			s1.wipe = self.$('.transition-wipe');
    			s1.base = self.$('.scene1');
    			s1.animated_bar_container = s1.base.find(".sentiment-emotions-chart li");
    			s1.animated_bar = s1.base.find(".bar span");
    			s1.animated_bar_negative = s1.base.find(".bar.negative span");
    			s1.animated_bar_positive = s1.base.find(".bar.positive span");

    			TweenMax.set(s1.wipe, { x:-App.Stage.Width });
				TweenMax.set(s1.base, { opacity:0 });
				TweenMax.set(s1.animated_bar_negative, { opacity:0, x:300 });
				TweenMax.set(s1.animated_bar_positive, { opacity:0, x:-300 });

				tl.to(s1.wipe, 1, { x:0 })
				  .to(s1.wipe, 1, { x: App.Stage.Width })
				  .to(s1.base, 0.5, { opacity:1 }, '-=0.5')
				  .staggerTo(s1.animated_bar, 1, { opacity:1, x:0 }, 0.1, '-=1')
				  .staggerTo(s1.animated_bar_container, 1, { opacity:0, y:250 }, 0.05, '+=4')
				  .to(s1.base, 0.5, { opacity:0 }, '-=1')
				  .addLabel('scene1');


			// SCENE 2 ----
			var s2 = {};
				s2.base = self.$('.scene2');
				s2.tweets = s2.base.find('.kings-cross-tweets li');

				TweenMax.set(s2.base, { opacity:0 });
				TweenMax.set(s2.tweets,{ y: 300, opacity: 0 });

				tl.to(s2.base, 0.5, { y:0, opacity:1 }, '+=1');
				tl.set({}, {}, "+=1")

				_.each(s2.tweets, function($s2_tweet,i){
					tl.to($s2_tweet, 0.8, { y: 0, opacity: 1,ease: Power1.easeIn }, '-=0.5')
				      .to($s2_tweet, 0.8, { y: -300, opacity: 0,ease: Power1.easeOut }, '+=0.5');
				});

				tl.addLabel('scene2');


			self.Animation = tl;
	    },
	    render:function(){

	    	var self = this;

	    	self.$el.html(self.template({	
		    	// emotion:[
		    	// 	{label:'Anger',positive:'20',negative:'0'},
		    	// 	{label:'Disgust',positive:'0',negative:'30'},
		    	// 	{label:'Fear',positive:'0',negative:'40'},
		    	// 	{label:'Joy',positive:'70',negative:'0'},
		    	// 	{label:'Saddness',positive:'0',negative:'30'}
		    	// ],
		    	// tweets:self.data.TwitterKingsCross.statuses.slice(0,4)
		    }));

	    	// self.initAnimation();
			App.$el.append(self.$el);
			// if('Animation' in self){ self.Animation.play(); }
			
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