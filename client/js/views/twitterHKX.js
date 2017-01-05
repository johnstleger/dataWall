(function(){

	App.View.TwitterHKX = Backbone.View.extend({
		id:'TwitterHKX',
		className:'',
	    initialize:function(){
	    	var self = this;
			self.template = _.template($("#twitter-hkx-template").html());
			self.dataUpdate();	
	    },
	    events:{
	    	click:'dataUpdate'
	    },
	    dataUpdate:function(){
	    	var self = this;
	    	App.LoadingTransition.tweenTo('active'); 
	    	$.get("/api2/twitter", function(data) {
	    		self.data = data.TwitterHKXAgencies;
				self.render();
				App.LoadingTransition.tweenTo('complete'); 
			});
	    },
	    render:function(){

	    	var self = this;


	    	// DATA PREP _

    		self.data.total_agency_accounts_txt = $(self.data.total_agency_accounts).addCommas();
    		self.data.total_followers_count_txt = $(self.data.total_followers_count).addCommas();
    		self.data.total_statuses_count_txt = $(self.data.total_statuses_count).addCommas();

    		// Assign score and order by
	    	_.map(self.data.agencies,function(a){ a.score = (a.statuses_count + a.followers_count); });
			self.data.agencies = _.sortBy(self.data.agencies,'score').reverse();

			// Calc bar percentages --
			var max_statuses_count = _.max(self.data.agencies, function(d){ return d.statuses_count; }).statuses_count,
				max_followers_count = _.max(self.data.agencies, function(d){ return d.followers_count; }).followers_count;
			_.map(self.data.agencies,function(a){ 
				a.statuses_count_percent =  App.Helper.rangeToPercent(a.statuses_count, 0, max_statuses_count)/2;
				a.followers_count_percent =  App.Helper.rangeToPercent(a.followers_count, 0, max_followers_count)/2;
			});
	    	self.$el.html( self.template(self.data) );


	    	self.Animation = self.initAnimation();
			App.$el.append(self.$el);
			self.Animation.play();

	
	    },
	    initAnimation:function(){

	    	var self = this;
    		var tl = new TimelineMax({ onComplete:function(){ this.restart(); }});		
				
    		// Scene1
			var s1 = {};
    			s1.base = self.$('.scene1');
    			s1.statBlocks = self.$('.stat-block');
    			s1.barChart = self.$('.horizontal-bar-stacked');
    			s1.bar = s1.barChart.find('span');

				TweenMax.set(s1.base, { opacity:0 });
				TweenMax.set(s1.statBlocks, { opacity:0, y:100 });
				TweenMax.set(s1.barChart, { opacity:0, y:100 });
				TweenMax.set(s1.bar, { opacity:0, x:-500 });

				tl.to(s1.base, 0.5, { opacity:1 }, '+=0.5')
				  .staggerTo(s1.statBlocks, 0.5, { opacity:1, y:0 }, 0.1 )
				  .staggerTo(s1.barChart, 0.5, { opacity:1, y:0 }, 0.1 ,"-=0.4")
				  .staggerTo(s1.bar, 0.2, { opacity:1, x:0 }, 0.1 ,"-=0.4")
				  .set({},{},"+=4")

				  .staggerTo(s1.barChart, 0.5, { opacity:0, y:-100 }, 0.1 )
				  .staggerTo(s1.statBlocks, 0.5, { opacity:0, y:-100 }, 0.1,"-=0.4")
				  .staggerTo(s1.bar, 0.2, { opacity:0, x:500 }, 0.1 ,"-=0.4");

			return tl;

			

			
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