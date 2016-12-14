(function () {
	window.App = {};
	App.$el = $('#backbone-app');
	App.Vent = _.extend({},Backbone.Events);
	App.View = {};
	App.Helper = {};
	App.Init = function(){
		//$.getJSON('./api', function( data ) {
			// 	App.Data = data;
			// 	App.R = new App.Router();
		// }); 
		App.R = new App.Router();
	}
})();
