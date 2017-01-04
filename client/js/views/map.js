(function(){

	App.View.MapView = Backbone.View.extend({
		id:'MapView',
		className:'',
	    initialize:function(){
	    	var self = this;
	    	self.Vent = _.extend({},Backbone.Events);
			self.template = _.template($("#map-template").html());
			self.dataUpdate();
	    },
	    dataUpdate:function(){

	    	var self = this;
	    	App.LoadingTransition.tweenTo('active'); 
	    	$.get("/api2/meetupEvents", function(data) {
	    		self.data = data;
				self.render();
				App.LoadingTransition.tweenTo('complete'); 
			});

	    },
	    render:function(){

	    	var self = this;
	    	self.$el.html(self.template(self.data));

	    	var prepData = {};

	    	_.each(self.data.MeetupEvents,function(category,key){

	    		var temp = {};
	    			temp.colorRGB = category.colorRGB;
	    			temp.locations = [];
	    		
	    		_.each(category.results, function(d,i){
	    			var location = {};
	    				location.title = d.name;
	    				location.scale = d.yes_rsvp_count*3;
	    				if('venue' in d){
	    					location.lat = d.venue.lat;
	    					location.lng = d.venue.lon;
	    					temp.locations.push(location);
	    				}
	    		});

	    		var rsvpCounts = _.map(temp.locations,function(event, key){ return event.yes_rsvp_count; });
	    			temp.minRSVP = _.min(rsvpCounts);
	    			temp.maxRSVP = _.max(rsvpCounts);

	    		prepData[key] = temp;

	    	});


	    	self.MapModule = new App.Module.MapCanvas({ 
	    		$el: self.$el,
	    		data: prepData
	    	});
				
	    	self.MapModule.init();
			App.$el.append(self.$el);

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

