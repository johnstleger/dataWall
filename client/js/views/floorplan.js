(function(){
	App.View.FloorplanView = Backbone.View.extend({
		id:'FloorplanView',
		className:'',
		playhead:0,
	    initialize:function(){
	    	var self = this;
	    	self.$app = App.$el;
			self.template = _.template($("#floorplan-template").html());
			self.data = {};
			self.render();
	    },
	    render:function(){
	    	var self = this;
	    	self.$el.html(self.template(self.data));
	    	self.$app.append(self.$el);







			// logo
			var floor1 = self.$el.find('svg'),
				rooms = floor1.find("#highlights rect");


			self.Tl = new TimelineMax({ 
				paused:true ,onComplete: function(){ this.seek(0); }
			});		

			self.Tl
				.set(floor1, { opacity:0, immediateRender:true })
				.set(rooms, { opacity:0, scale:0.5, transformOrigin:"50% 50%", immediateRender:true })

				.to(floor1, 0.5,{ opacity:1 },"+=0.5");
				// .staggerTo(rooms,0.5, { opacity:1, scale:1 },0.1,"+=0.5");


				_.each(rooms, function(room,i){
					self.Tl.to(room, 0.5, { opacity:1, scale:1 })
					.call(function(){
						var id = $(room).attr('id');
						var containsJson = !id.indexOf('_x');
						if(containsJson){ return console.log( parseIdtoJson(id) ); }
						console.log(id);
					},[],self);
				});

				
			self.Tl.to(floor1, 0.5,{ opacity:0, scale:1.5 },"+=0.5");
			self.Tl.play();
			
			



			function parseIdtoJson(id){
				var str = eval('"'+id.replace(/_x/g,'\\x').replace(/_/g,'')+'"');
				var result = {}; // var result = JSON.parse( str.replace(/(?:([^{\:\,]+):([^\,}]+))/g,'"$1":"$2"') );
				str.substr(1,str.length-2).split(',').forEach(function (item) { 
					var kv = item.split(/\:/); 
					result[kv[0]] = kv[1];
				}); return result;
			}


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