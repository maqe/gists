//Ember testing async helper to add a "pause" to testing so can wait for something to happen in DOM (animation, etc.) before running further tests...
// modified version of the default "wait" async helper
Ember.Test.registerAsyncHelper('pause', function(app, duration) {
	return Ember.Test.promise(function(resolve) {
		Ember.Test.adapter.asyncStart();
		var interval = setInterval(function(){
			clearInterval(interval);
			Ember.Test.adapter.asyncEnd();
			Ember.run(null, resolve, true);
		}, duration);
	});
});
