(function(){
	var self;
	App.View.TwitterSentimentView = Backbone.View.extend({
		id:'TwitterSentimentView',
		className:'view',
	    initialize:function(){
	    	self = this;
	    	self.playhead = 0;
			self.template = _.template($("#twitter-sentiment-template").html());
			self.data = {};
			self.render();
	    },
	    render:function(){


	    	self.$el.html(self.template(self.data));

    		// Init GSAP ---
    		var base = self.$el;
    		var animated_bar = self.$el.find(".bar span");
    		var animated_bar_negative = self.$el.find(".bar.negative span");
    		var animated_bar_positive = self.$el.find(".bar.positive span");
    	
    		self.timeline = new TimelineMax({ paused:true });		
			self.timeline
				.set(base, { scaleX:1.1, scaleY:1.1, opacity:0, immediateRender:true })
				.set(animated_bar_negative, { opacity:0, x:300, immediateRender:true })
				.set(animated_bar_positive, { opacity:0, x:-300, immediateRender:true })

				.addPause(0.3)
				.to(base, 0.5, { scaleX:1, scaleY:1, opacity:1 })
				.staggerTo(animated_bar, 1, { opacity:1, x:0 }, 0.1, '-=0.1')
				.addLabel('scene1');

			self.labels = self.timeline.getLabelsArray();

			App.$el.append(self.$el);
			self.timeline.tweenTo( self.labels[self.playhead].name );


	    },
	    destroy:function(callback){
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