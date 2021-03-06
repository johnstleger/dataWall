(function(){

	App.View.TitleView = Backbone.View.extend({
		id:'TitleView',
		className:'view',
		playhead:0,
	    initialize:function(){
	    	var self = this;
	    	self.$app = App.$el;
			self.template = _.template($("#title-template").html());
			self.data = {};
			self.render();
	    },
	    render:function(){
	    	var self = this;
	    	self.$el.html(self.template(self.data));
	    	self.$app.append(self.$el);
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