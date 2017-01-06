(function(){
	App.View.FloorplanView = Backbone.View.extend({
		id:'FloorplanView',
		className:'',
		playhead:0,
	    initialize:function(){
	    	var self = this;
	    	self.$app = App.$el;
			self.template = _.template($("#floorplan-template").html());
			self.dataUpdate();
	    },
	    dataUpdate:function(){
	    	var self = this;
	    	App.LoadingTransition.tweenTo('active'); 
	    	setTimeout(function(){
	    		self.data = {};
	    		self.render();
				App.LoadingTransition.tweenTo('complete'); 
	    	},500);
	    },
	    render:function(){

	    	var self = this;
	    	self.$el.html( self.template(self.data) );
	    	self.$app.append(self.$el);


			self.tl = new TimelineMax({ 
				onComplete:function(){ this.restart(); } 
			});
				

			
			var floors = self.$('.floor-plan-block'),
				highlightInfo = self.$('.floor-plan-info-block'),
				floorList = self.$('.floor-plan-list-block');

			// Timeline --
			var default_zoom = 1.2;
			TweenMax.set(floors, { opacity:0, scale:default_zoom-0.2, immediateRender:true });
			TweenMax.set(highlightInfo, { opacity:0, y:50, immediateRender:true });

			_.each(floors,function(selected_floor,i){
					
				floorList.append('<li>t'+(i+1)+'</li>');

				self.tl
					.call(function(){
						var floorListItem = floorList.find('li');
							floorListItem.removeClass('active');
							floorListItem.eq(i).addClass('active');
					},[],self)
					.to(selected_floor, 1.5, { opacity:1, scale:default_zoom, ease: Power3.easeOut },"-=0.2")
					


				var floor_highlights = $(selected_floor).find("#highlights rect");

				_.each(floor_highlights.slice(0,3),function(selected_highlight,i){

					var selected_highlight_data = {};
					self.tl
						.set(highlightInfo, { opacity:0, y:50 })
						.call(updateInfoBlock,[selected_highlight],self)
						
						.to(selected_highlight, 0.5, { opacity:1,fill: "00cccc", scale:1 })
						.to(highlightInfo,0.5, { opacity:1, y:0 },"-=0.5")

						.to(selected_highlight, 0.5, { opacity:0.5,fill: '#FFF', scale:1 },"+=2")
						.to(highlightInfo,0.5, { opacity:0, y:-50 },"-=0.5");
				});

				self.tl
					.to(selected_floor, 0.3, { opacity:0, scale:default_zoom+0.2 });

			});
			
			self.tl.play();



			// Timeline Helpers --
			function updateInfoBlock(selected_highlight){
				var id = $(selected_highlight).attr('id'), containsJson = !id.indexOf('_x');
				if(!containsJson){ self.$('.floor-plan-info-block').html('<h1>No Data</h1><p>Lorem Ipsum is simply dummy text.</p>'); return; }
				var infoBlockData = parseIdtoJson(id),
					infoBlockTemplate = _.template("<h1><%= title %> <%= color %></h1><p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>");
				self.$('.floor-plan-info-block').html(infoBlockTemplate(infoBlockData));
			}


			function parseIdtoJson(id){
				var str = eval('"'+id.replace(/_x/g,'\\x').replace(/_/g,' ')+'"');
				var result = {}; // var result = JSON.parse( str.replace(/(?:([^{\:\,]+):([^\,}]+))/g,'"$1":"$2"') );
				var sub = str.replace('{','').replace('}','');
				sub.split(',').forEach(function (item) { 
					var kv = item.split(/\:/), k = kv[0].trim(), v = kv[1].trim(); result[k] = v;
				});
				return result;
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