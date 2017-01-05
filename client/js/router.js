;(function(){
	var self;
	App.Router = Backbone.Router.extend({
		section:null,
		initialize:function(){
			self = this;
			Backbone.history.start();
		},
		sectionDestroy:function(done){
			if(!self.section) return done();
			self.section.destroy(function(){ self.section=null; done(); }); 
		},
		routes: {
			"":"titleView",
			"havas-news":"havasNewsView",
			"twitter-kings-cross-sentiment":"twitterKingsCrossSentimentView",
			"twitter-hkx":"twitterHKXView",
			"transport":"transportView",
			"map":"mapView",
			"floorplan":"floorplanView",
			"*notFound": "notFound"
		},
		titleView:function(){
			self.sectionDestroy(function(){
				self.section = new App.View.TitleView();
			});
		},
		havasNewsView:function(){
			self.sectionDestroy(function(){
				self.section = new App.View.HavasNewsView();
			});
		},
		twitterHKXView:function(){
			self.sectionDestroy(function(){
				self.section = new App.View.TwitterHKX();
			});
		},
		transportView:function(){
			self.sectionDestroy(function(){
				self.section = new App.View.TransportView();
			});
		},
		twitterKingsCrossSentimentView:function(){
			self.sectionDestroy(function(){
				self.section = new App.View.TwitterKingsCrossSentiment();
			});
		},
		mapView:function(){
			self.sectionDestroy(function(){
				self.section = new App.View.MapView();
			});
		},
		floorplanView:function(){
			self.sectionDestroy(function(){
				self.section = new App.View.FloorplanView();
			});
		},
		notFound:function(){
			self.sectionDestroy(function(){
				console.log('Closed');
			});
		}
	});
})();