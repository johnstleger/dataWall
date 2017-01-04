(function(){

	App.Module.MapCanvas = function(options){
		this.$el = options.$el;
		this.meetupEventCategories = options.data || {
			arts:{
				colorRGB:[0,204,204],
				maxRSVP:0, 
				minRSVP:0,
				locations:[
					{ lat:51.533214, lng:-0.137266, scale:100, title:'title1' },
					{ lat:51.535192, lng:-0.153192, scale:50, title:'zoo' }
				]
			},
			music:{
				colorRGB:[255,39,91],
				maxRSVP:0, 
				minRSVP:0,
				locations:[
					{ lat:51.533214, lng:-0.137266, scale:50, title:'title1' },
					{ lat:51.535192, lng:-0.153192, scale:150, title:'zoo' }
				]
			}
		}
		this.init = function(){
			var self = this;
			self.createMap(function(msg){
				console.log('Map initialised');
				self.initAnimation();
			});
		}
		this.createMap = function(callback){

			var self = this;
			var mapContainer = self.$el.find('#map')[0],
				mapSettings = { draggable: false, zoomControl: false, scrollwheel: false, disableDoubleClickZoom: true, disableDefaultUI: true,center: { lat:51.529771, lng:-0.124407 }, zoom: 14,styles:[{"featureType":"all","elementType":"labels.text.fill","stylers":[{"color":"#ffffff"}]},{"featureType":"all","elementType":"labels.text.stroke","stylers":[{"color":"#000000"},{"lightness":13}]},{"featureType":"administrative","elementType":"geometry.fill","stylers":[{"color":"#000000"}]},{"featureType":"administrative","elementType":"geometry.stroke","stylers":[{"color":"#144b53"},{"lightness":14},{"weight":1.4}]},{"featureType":"administrative","elementType":"labels","stylers":[{"visibility":"off"}]},{"featureType":"administrative.province","elementType":"labels","stylers":[{"visibility":"off"}]},{"featureType":"administrative.locality","elementType":"labels","stylers":[{"visibility":"off"}]},{"featureType":"administrative.neighborhood","elementType":"labels","stylers":[{"visibility":"off"}]},{"featureType":"administrative.land_parcel","elementType":"labels","stylers":[{"visibility":"off"}]},{"featureType":"landscape","elementType":"all","stylers":[{"color":"#08304b"}]},{"featureType":"poi","elementType":"geometry","stylers":[{"color":"#0c4152"},{"lightness":5}]},{"featureType":"poi","elementType":"labels","stylers":[{"visibility":"off"}]},{"featureType":"poi.attraction","elementType":"labels","stylers":[{"visibility":"off"}]},{"featureType":"road","elementType":"labels","stylers":[{"weight":"0.75"},{"saturation":"-74"},{"visibility":"simplified"},{"color":"#9394b2"}]},{"featureType":"road.highway","elementType":"geometry.fill","stylers":[{"color":"#000000"}]},{"featureType":"road.highway","elementType":"geometry.stroke","stylers":[{"color":"#0b434f"},{"lightness":25}]},{"featureType":"road.arterial","elementType":"geometry.fill","stylers":[{"color":"#000000"}]},{"featureType":"road.arterial","elementType":"geometry.stroke","stylers":[{"color":"#0b3d51"},{"lightness":16}]},{"featureType":"road.arterial","elementType":"labels","stylers":[{"visibility":"simplified"}]},{"featureType":"road.local","elementType":"geometry","stylers":[{"color":"#000000"}]},{"featureType":"road.local","elementType":"labels","stylers":[{"visibility":"off"}]},{"featureType":"transit","elementType":"all","stylers":[{"color":"#146474"}]},{"featureType":"water","elementType":"all","stylers":[{"color":"#021019"}]}]};
			self.map = new google.maps.Map( mapContainer, mapSettings );

		   	google.maps.event.addListenerOnce( self.map, 'tilesloaded', callback );

		}
		this.initAnimation = function(){
			
			var self = this;

			self.width = self.$el.width();
			self.height = self.width*0.5625; //16x9


			self.toolTip = self.$el.find('#tool');

			// Create Stage
			var stageElement = self.$el.find('#mapCanvas');
				stageElement.attr('width',self.width);
				stageElement.attr('height',self.height);

			self.stage = new createjs.Stage(stageElement[0]);
			TweenLite.ticker.addEventListener("tick", self.stage.update, self.stage);

			
			// Add office location
			var hkx = self.convertLatLng({lat:51.534409,lng:-0.125074})
			var hkxDot = new createjs.Shape();
				hkxDot.graphics.beginFill('#FFF').drawCircle(hkx.x, hkx.y, 6).endFill();
			var hkxCircle = new createjs.Shape();
				hkxCircle.graphics.beginStroke('rgba(255,255,255,0.6)').setStrokeStyle(2).drawCircle(hkx.x, hkx.y, 450).endStroke();
			
			self.stage.addChild( hkxDot, hkxCircle);


			// Add all meetups
			_.each(self.meetupEventCategories,function(eventCategory,key){
				eventCategory.markers = self.addMarkers(eventCategory);
			});

			self.initTimeline();

		}
		this.addMarkers = function(eventCategory){
				
			var self = this;

			var locations = eventCategory.locations;
			var color = eventCategory.colorRGB.join(',');

			var output = { dots:[], marks:[] };
			
			_.each(locations, function(d,i){
				
				d = self.convertLatLng(d);

				var mark = new createjs.Shape();
					mark.graphics.beginFill('rgba('+color+',0.2)').beginStroke('rgb('+color+')').setStrokeStyle(3).drawCircle(0, 0, d.scale);
					mark.regX = mark.width/2;	
					mark.regY = mark.height/2;

				TweenMax.set(mark, { x: d.x, y:d.y });
				self.stage.addChild(mark); 
				output.marks.push(mark);

				var dot = new createjs.Shape();
					dot.graphics.beginFill('rgb('+color+')').drawCircle(0, 0, 4);
					dot.regX = dot.width/2;	
					dot.regY = dot.height/2;

				TweenMax.set(dot, { x: d.x, y:d.y });
				self.stage.addChild(dot); 
				output.dots.push(dot);


			});
			return output;

		}
		this.initTimeline = function(){
			
			var self = this;

			self.Tl = new TimelineMax({paused:true, onComplete:function() { this.restart(); }});

			// Set scene default --
			_.each(self.meetupEventCategories,function(eventCategory,key){
				self.Tl
					.set(self.toolTip, { y: -20, opacity:0 })
					.set(eventCategory.markers.marks, { scaleX:0, scaleY: 0 })
					.set(eventCategory.markers.dots, { scaleX:0, scaleY: 0 });
			});

			// Add scene for each meetup category --
			_.each(self.meetupEventCategories,function(eventCategory,key){
				self.Tl
					.to(eventCategory.markers.dots, 0.5, { scaleX:1, scaleY:1, ease: Expo.easeOut },"+=0.5")
					.staggerTo(eventCategory.markers.marks, 1, { scaleX:1, scaleY:1, ease: Expo.easeOut },0.1,"-=0.5")
					.to(eventCategory.markers.marks, 0.5, { alpha:0.0 },"+=0.5");

					_.each(eventCategory.markers.marks.slice(0,10), function(mark,i){
						var location = eventCategory.locations[i];
						self.Tl
							.to(mark, 0.5, { alpha:1 },"-=0.2")
							.call(function(){ 
								self.toolTip.html(location.title);
								TweenMax.set(self.toolTip, { top:location.y, left: location.x });
							},[],"-=0.5")
							.to(self.toolTip, 0.5, { y:0, opacity:1 })
							.to(self.toolTip, 0.5, { opacity:0 },"+=1")
							.set(self.toolTip, { y:-20 })
							.to(mark, 0.5, { alpha:0 },"-=0.5")
							.set({},{},"+=0.1");

					});

					self.Tl
						.to(eventCategory.markers.dots, 0.5, { scaleX:0, scaleY:0, ease: Expo.easeOut })
						.staggerTo(eventCategory.markers.marks, 1, { scaleX:0, scaleY:0, ease: Expo.easeOut },0.1,"-=0.5");
					
			});

			self.Tl.play();

		}

		this.convertLatLng = function(input){
			if( 'x' in input){ return input; }
			var self = this;
			var scale = Math.pow(2, self.map.getZoom());
			
			var nw = new google.maps.LatLng(
			    self.map.getBounds().getNorthEast().lat(),
			    self.map.getBounds().getSouthWest().lng()
			);
			
			var inputLngLat = new google.maps.LatLng({lat:input.lat,lng:input.lng}),
				worldCoordinateNW = self.map.getProjection().fromLatLngToPoint(nw),
				worldCoordinate = self.map.getProjection().fromLatLngToPoint(inputLngLat);
			
			var pixelOffset = new google.maps.Point(
			    Math.floor((worldCoordinate.x - worldCoordinateNW.x) * scale),
			    Math.floor((worldCoordinate.y - worldCoordinateNW.y) * scale)
			);

			input.x = pixelOffset.x;
			input.y = pixelOffset.y;
			return input;
		}	
	}

})();