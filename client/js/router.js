(function(){
	var self;
	App.Router = Backbone.Router.extend({
		section:null,
		routes: {
			"":"titleView",
			"floorplan":"floorplanView",
			"twitter-sentiment":"twitterSentimentView",
			"transport":"transportView",
			"map":"mapView",
			"*notFound": "notFound"
		},
		initialize:function(){
			self = this;
			Backbone.history.start();
		},
		sectionDestroy:function(done){
			if(!self.section) return done();
			self.section.destroy(function(){ self.section=null; done(); }); 
		},
		titleView:function(){
			self.sectionDestroy(function(){
				self.section = new App.View.TitleView();
			});
		},
		floorplanView:function(){
			self.sectionDestroy(function(){
				self.section = new App.View.FloorplanView();
			});
		},
		twitterSentimentView:function(){
			self.sectionDestroy(function(){
				self.section = new App.View.TwitterSentimentView();
			});
		},
		transportView:function(){
			self.sectionDestroy(function(){
				self.section = new App.View.TransportView();
			});
		},
		mapView:function(){
			self.sectionDestroy(function(){
				self.section = new App.View.MapView();
			});
		},
		notFound:function(){
			self.sectionDestroy(function(){
				console.log('Closed');
			});
		}
	});
})();