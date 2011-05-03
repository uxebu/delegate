var Ticker = function(){
	dojo.mixin(this, delegate());

	this.interval = 1000;
};

Ticker.prototype = {
	tune: function(interval){
		this.interval = interval;
		console.log('Ticker tuning to', interval);
	},
	tick: function(){
		console.log('Tick');
		var that = this;
		setTimeout(function(){
			that.emit('ticked');
		}, this.interval);
	}
}

var Tocker = function(){
	dojo.mixin(this, delegate());

	this.interval = 1000;
};

Tocker.prototype = {
	tune: function(interval){
		this.interval = interval;
		console.log('Tocker tuning to', interval);
	},
	tock: function(){
		console.log('Tock');
		var that = this;
		setTimeout(function(){
			that.emit('tocked');
		}, this.interval);
	}
};

var Tuner = function(){
	dojo.mixin(this, delegate());

	var that = this;
	this.domNode = dojo.create('input', {
		type: 'text',
		change: function(){that.emit('changed', this.value);},
		value: 1000
	}, dojo.body());
};

var ticker = new Ticker;
var tocker = new Tocker;

delegate.delegate(ticker, tocker, {
	'ticked': 'tock'
});

delegate.delegate(tocker, ticker, {
	'tocked': 'tick'
});

console.log('Ticker-tocker started! BEHOLD!');

ticker.tick();

dojo.ready(function(){
	var tuner = new Tuner;
	delegate.delegate(tuner, ticker, { 'changed': 'tune' });
	delegate.delegate(tuner, tocker, { 'changed': 'tune' });
});
