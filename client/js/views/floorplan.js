(function(){
	var self;
	App.View.FloorplanView = Backbone.View.extend({
		id:'FloorplanView',
		className:'view',
		playhead:0,
	    initialize:function(){
	    	self = this;
	    	self.$app = App.$el;
			self.template = _.template($("#floorplan-template").html());
			self.data = {};
			self.render();
	    },
	    render:function(){
	    	self.$el.html(self.template(self.data));
	    	self.$app.append(self.$el);
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