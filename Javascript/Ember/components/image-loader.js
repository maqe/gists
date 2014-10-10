/*
	
	an image 'loader' component (based on http://ember.zone/a-graceful-image-loading-component/)

	requires:
		imagesLoaded (https://github.com/desandro/imagesloaded)
		CSS styles (https://github.com/maqe/gists/blob/master/LESS/components/image-loader.less)
	
	can be used in HBS file like this: {{image-loader src=pictureUrl}}
	
*/

Studi.ImageLoaderComponent = Ember.Component.extend({

	classNames: ['img-wrapper'],
	classNameBindings: ['loaded'],
	src: '',
	alt: '',
	loaded: false,

	handleLoad: function() {
		var _self = this;
		this.$().children('img').imagesLoaded()
		.done(function(instance){
			//remove loading style
			_self.set('loaded', true);
		})
	}.on('didInsertElement')

});
