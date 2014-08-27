//Ember testing async helper to add a "waitForElement" helper to testing so can wait for an element to exist in DOM before running further tests...
//based on the default "waiter" Ember test @ https://github.com/emberjs/ember.js/blob/v1.7.0/packages/ember-testing/tests/helpers_test.js#L420

//generic test helpers object so can config multiple helpers under one location
var testHelpers = {};

//set up waitForElement specific object
testHelpers.waitForElement = {
	element: '',
	ready: function() {
		if($(this.element).length>0){
			Ember.Test.unregisterWaiter(this, this.ready);
			//reset properties
			this.element = '';
			return true;
		} else {
			return false;
		}
	}
};
//register actual async helper
Ember.Test.registerAsyncHelper('waitForElement', function(app, element) {
	Ember.run(function(){
		testHelpers.waitForElement.element = element;
		Ember.Test.registerWaiter(testHelpers.waitForElement, testHelpers.waitForElement.ready);
	});
	return wait(app);
});

/*
usage:
	visit('/route');
	waitForElement(100);
	andThen(function(){
		//assertions here...	
	});
*/
