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
	    	// $.get("/api2/meetupEvents", function(data) {
	    	// 	self.data = data;
				self.render();
				App.LoadingTransition.tweenTo('complete'); 
			// });

	    },
	    render:function(){

	    	var self = this;
	    	self.$el.html(self.template(self.data));

		   	var map = new google.maps.Map(self.$('#map')[0], { 
		   		draggable: false, zoomControl: false, scrollwheel: false, disableDoubleClickZoom: true, disableDefaultUI: true,
		    	center: { lat: 51.534529, lng: -0.124720 }, zoom: 13,
		    	styles:[{"featureType":"all","elementType":"labels.text.fill","stylers":[{"color":"#ffffff"}]},{"featureType":"all","elementType":"labels.text.stroke","stylers":[{"color":"#000000"},{"lightness":13}]},{"featureType":"administrative","elementType":"geometry.fill","stylers":[{"color":"#000000"}]},{"featureType":"administrative","elementType":"geometry.stroke","stylers":[{"color":"#144b53"},{"lightness":14},{"weight":1.4}]},{"featureType":"administrative","elementType":"labels","stylers":[{"visibility":"off"}]},{"featureType":"administrative.province","elementType":"labels","stylers":[{"visibility":"off"}]},{"featureType":"administrative.locality","elementType":"labels","stylers":[{"visibility":"off"}]},{"featureType":"administrative.neighborhood","elementType":"labels","stylers":[{"visibility":"off"}]},{"featureType":"administrative.land_parcel","elementType":"labels","stylers":[{"visibility":"off"}]},{"featureType":"landscape","elementType":"all","stylers":[{"color":"#08304b"}]},{"featureType":"poi","elementType":"geometry","stylers":[{"color":"#0c4152"},{"lightness":5}]},{"featureType":"poi","elementType":"labels","stylers":[{"visibility":"off"}]},{"featureType":"poi.attraction","elementType":"labels","stylers":[{"visibility":"off"}]},{"featureType":"road","elementType":"labels","stylers":[{"weight":"0.75"},{"saturation":"-74"},{"visibility":"simplified"},{"color":"#9394b2"}]},{"featureType":"road.highway","elementType":"geometry.fill","stylers":[{"color":"#000000"}]},{"featureType":"road.highway","elementType":"geometry.stroke","stylers":[{"color":"#0b434f"},{"lightness":25}]},{"featureType":"road.arterial","elementType":"geometry.fill","stylers":[{"color":"#000000"}]},{"featureType":"road.arterial","elementType":"geometry.stroke","stylers":[{"color":"#0b3d51"},{"lightness":16}]},{"featureType":"road.arterial","elementType":"labels","stylers":[{"visibility":"simplified"}]},{"featureType":"road.local","elementType":"geometry","stylers":[{"color":"#000000"}]},{"featureType":"road.local","elementType":"labels","stylers":[{"visibility":"off"}]},{"featureType":"transit","elementType":"all","stylers":[{"color":"#146474"}]},{"featureType":"water","elementType":"all","stylers":[{"color":"#021019"}]}]
		   	});
		 
		   	google.maps.event.addListenerOnce(map, 'tilesloaded', function(){
		   		var bounds = this.getBounds();
			    var topLeft = { lat:bounds.f.b, lng:bounds.b.b };
			    var bottomRight = { lat : bounds.f.f, lng : bounds.b.f }
				var marker = new google.maps.Marker({
					position: topLeft,
					map: map,
					title: 'Hello World!'
				});
				var marker = new google.maps.Marker({
					position: bottomRight,
					map: map,
					title: 'Hello World!'
				});
			});
			App.$el.append(self.$el);







			// var w = 1920; // x
			// var h = 1080; // y
			// var stage = new createjs.Stage(self.$el.find('#demoCanvas')[0]);
			// TweenLite.ticker.addEventListener("tick", stage.update, stage);

			// var distance circle = new createjs.Shape();
			// 	distance circle.graphics
			// 		.beginStroke('#FFF')
			// 		.setStrokeStyle(2)
			// 		.drawCircle(700, 400, 600);
			// 	stage.addChild(distance circle);
				

			// var shape = new createjs.Shape();
			// 	shape.graphics
			// 		.beginFill("#000")
			// 		.drawCircle(100, 100, 100)
			// 		.endFill();

			// stage.addChild(shape);

			// Tl = new TimelineMax({paused:true, onComplete:function() { this.restart(); }});
			// Tl.set(shape, { scaleX:0.1, scaleY: 0.1 })
			//   .to(shape, 0.5, { scaleX:1, scaleY: 1, ease:Circ.easeInOut});
			
			// Tl.play();




			var w = 1920; // x
			var h = 1080; // y
			var stage = new createjs.Stage(self.$el.find('#demoCanvas')[0]);
			TweenLite.ticker.addEventListener("tick", stage.update, stage);



			var distanceCircle = new createjs.Shape();
				distanceCircle.graphics.beginStroke('#FFF').setStrokeStyle(2).drawCircle(700, 400, 600);
				stage.addChild(distanceCircle);


			var shapes = [];
				_.each(new Array(2),function(d,i){
					var shape = new createjs.Shape();
						shape.graphics.beginFill("#000").drawCircle(0, 0, 100).endFill();
						shape.regX = shape.width/2;	
    					shape.regY = shape.height/2;

					shapes.push(shape);
					stage.addChild(shape);
					TweenMax.set(shape, { x: 600, y:600 ,scaleX:0.2, scaleY: 0.2, alpha: 0.5 });
				});
			

			Tl = new TimelineMax({paused:true, onComplete:function() { this.restart(); }});
				_.each(shapes, function(shape,i){
					Tl.to(shape, 0.5, { scaleX:0.5, scaleY: 0.5},"+=0.5")
					  .to(shape, 0.5, { scaleX:1, scaleY: 1, ease:Circ.easeInOut});
				});
			
			Tl.play();



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





