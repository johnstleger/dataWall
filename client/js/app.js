(function () {
	window.App = {};
	App.$el = $('#backbone-app');
	App.Vent = _.extend({},Backbone.Events);
	App.View = {};
	App.Helper = {};
	App.Stage = {};
	App.Init = function(){

		
		function setStage(){
			console.log("Stage changed")
			App.Stage.Width = $(window).width();
			App.Stage.Height = $(window).height();
		}; setStage();
		$(window).on("debouncedresize", setStage); 


		// Loading Transition ---
		var wipe = App.$el.find('.transition-wipe');
		App.LoadingTransition = new TimelineMax({ paused:true, onComplete:function(){ this.seek(0); } });
		App.LoadingTransition
			.addLabel('start')
			.set(wipe, { x:-App.Stage.Width, immediateRender:true })

			.to(wipe, 1, { x:0 })	  
			.addLabel('active')

			.to(wipe, 1, { x: App.Stage.Width })
			.addLabel('complete');

		App.R = new App.Router();

	}
})();				