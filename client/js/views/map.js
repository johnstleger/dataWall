(function(){

	App.View.MapView = Backbone.View.extend({
		id:'MapView',
		className:'',
	    initialize:function(){
	    	var self = this;
	    	self.Vent = _.extend({},Backbone.Events);
			self.template = _.template($("#map-template").html());
			self.data={};
			self.render();
	    },
	    // events:{
	    // 	click:'dataUpdate'
	    // },
	    dataUpdate:function(){

	    	var self = this;
	    	App.LoadingTransition.tweenTo('active'); 
	    	setTimeout(function(){
	    		self.render();
	    		App.LoadingTransition.tweenTo('complete'); 
	    	},500);

	    },
	    render:function(){

	    	var self = this;
	    	self.$el.html(self.template(self.data));
		   	var map = new google.maps.Map(self.$('#map')[0], {
		    	zoom: 4,
		    	center: { lat: 51.534529, lng: -0.124720 },
		    	zoom: 13,
		    	disableDefaultUI: true,
		    	styles:[{"featureType":"all","elementType":"labels.text.fill","stylers":[{"color":"#ffffff"}]},{"featureType":"all","elementType":"labels.text.stroke","stylers":[{"color":"#000000"},{"lightness":13}]},{"featureType":"administrative","elementType":"geometry.fill","stylers":[{"color":"#000000"}]},{"featureType":"administrative","elementType":"geometry.stroke","stylers":[{"color":"#144b53"},{"lightness":14},{"weight":1.4}]},{"featureType":"administrative","elementType":"labels","stylers":[{"visibility":"off"}]},{"featureType":"administrative.province","elementType":"labels","stylers":[{"visibility":"off"}]},{"featureType":"administrative.locality","elementType":"labels","stylers":[{"visibility":"off"}]},{"featureType":"administrative.neighborhood","elementType":"labels","stylers":[{"visibility":"off"}]},{"featureType":"administrative.land_parcel","elementType":"labels","stylers":[{"visibility":"off"}]},{"featureType":"landscape","elementType":"all","stylers":[{"color":"#08304b"}]},{"featureType":"poi","elementType":"geometry","stylers":[{"color":"#0c4152"},{"lightness":5}]},{"featureType":"poi","elementType":"labels","stylers":[{"visibility":"off"}]},{"featureType":"poi.attraction","elementType":"labels","stylers":[{"visibility":"off"}]},{"featureType":"road","elementType":"labels","stylers":[{"weight":"0.75"},{"saturation":"-74"},{"visibility":"simplified"},{"color":"#9394b2"}]},{"featureType":"road.highway","elementType":"geometry.fill","stylers":[{"color":"#000000"}]},{"featureType":"road.highway","elementType":"geometry.stroke","stylers":[{"color":"#0b434f"},{"lightness":25}]},{"featureType":"road.arterial","elementType":"geometry.fill","stylers":[{"color":"#000000"}]},{"featureType":"road.arterial","elementType":"geometry.stroke","stylers":[{"color":"#0b3d51"},{"lightness":16}]},{"featureType":"road.arterial","elementType":"labels","stylers":[{"visibility":"simplified"}]},{"featureType":"road.local","elementType":"geometry","stylers":[{"color":"#000000"}]},{"featureType":"road.local","elementType":"labels","stylers":[{"visibility":"off"}]},{"featureType":"transit","elementType":"all","stylers":[{"color":"#146474"}]},{"featureType":"water","elementType":"all","stylers":[{"color":"#021019"}]}]
		   	});
		   



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