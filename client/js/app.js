(function () {
	window.App = {};
	App.$el = $('#backbone-app');
	App.Vent = _.extend({},Backbone.Events);
	App.View = {};
	App.Helper = {};
	App.Stage = {};
	App.Init = function(){
		function setStage(){
			App.Stage.Width = $(window).width();
			App.Stage.Height = $(window).height();
		};
		$(window).on("debouncedresize", setStage);
		setStage();
		App.R = new App.Router();
	}
})();
