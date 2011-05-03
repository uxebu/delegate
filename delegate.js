;(function(){
	var delegate = window.delegate = function delegate(){
		if (!(this instanceof delegate)){
			return new delegate(arguments);
		}
		this.delegates = [];
	};

	delegate.delegate = function(obj, delegate, map){
		return obj.delegates.push({
			obj: delegate,
			map: map
		});
	};

	delegate.prototype = {
		delegate: function(receiver, map){
			return delegate.delegate(this, receiver, map);
		},
		emit: function(event){
			var args = Array.prototype.slice.call(arguments, 1);
			this.delegates.forEach(function(delegate){
				var e = (delegate.map && delegate.map[event]) ? delegate.map[event] : event;
				var f = typeof e === 'function' ? e : delegate.obj[e];
				f && f.apply(delegate.obj, args);
			});
		}
	};

	return delegate;
})();

