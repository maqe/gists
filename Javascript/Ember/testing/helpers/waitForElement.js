//Ember testing async helper to add a "waitForElement" to testing so can wait for an element to exist in DOM before running further tests...
// modified version of the default "wait" async helper
Ember.Test.registerAsyncHelper('waitForElement', function(app, element) {
	return Ember.Test.promise(function(resolve) {
		Ember.Test.adapter.asyncStart();
		var interval = setInterval(function(){
			if($(element).length>0){
				clearInterval(interval);
				Ember.Test.adapter.asyncEnd();
				Ember.run(null, resolve, true);
			}
		}, 10);
	});
});
