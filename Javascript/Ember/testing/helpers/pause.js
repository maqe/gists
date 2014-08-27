//Ember testing async helper to add a "pause" to testing so can wait for something to happen in DOM (animation, etc.) before running further tests...
//based on the default "waiter" Ember test @ https://github.com/emberjs/ember.js/blob/v1.7.0/packages/ember-testing/tests/helpers_test.js#L420

//generic test helpers object so can config multiple helpers under one location
var testHelpers = {};

//set up pause specific object
testHelpers.pause = {
	counter: 0,
	duration: 10,
	ready: function() {
		if(this.counter >= this.duration){
			//unregister waiter
			Ember.Test.unregisterWaiter(this, this.ready);
			//reset properties
			this.counter = 0;
			this.duration = 10;
		}
		return ++this.counter > this.duration;
	}
};
//register actual async helper
Ember.Test.registerAsyncHelper('pause', function(app, duration) {
	Ember.run(function(){
		testHelpers.pause.counter = 0;
		testHelpers.pause.duration = duration;
		Ember.Test.registerWaiter(testHelpers.pause, testHelpers.pause.ready);
	});
	return wait(app);
});

/*
	usage:
		pause(100);
*/
