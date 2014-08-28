Handlebars.registerHelper('ifEqual', function(a, b, opts) {
	if(this.get(a) === b)
		return opts.fn(this);
	else
		return opts.inverse(this);
});

Handlebars.registerHelper('for', function(from, to, block) {
	var accum = '';
	for(var i=from; i<this.get(to); i++) {
		if(block.fn(i)!==undefined) {
			accum += block.fn(i);
		}
	}
	return accum;
});

Handlebars.registerHelper('times', function(n, block) {
	var accum = '';
	for(var i = 0; i < this.get(n); ++i) {
		if(block.fn(i)!==undefined) {
			accum += block.fn(i);
		}
	}
	return accum;
});
