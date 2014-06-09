var mori = require('mori');

exports.bag = function(elements) {
	var result = mori.hash_map();
	if (elements) {
		mori.each(elements, function(el) {
			result = exports.add(result, el); // yeah, recursion would be nicer
		});
	}
	return result;
};

exports.add = function(bag, el, n) {
	var val = mori.get(bag, el);
	var inc = n || 1;
	return mori.assoc(bag, el, val ? val + inc : inc);
};

exports.remove = function(bag, el, n) {
	var val = mori.get(bag, el);
	var dec = n || 1;
	return val == null ? bag :
		val > dec ? mori.assoc(bag, el, val - dec) :
			mori.dissoc(bag, el);
};

exports.removeAll = mori.dissoc;

exports.get = function(bag, element) {
	return mori.get(bag, element) || 0;
};

exports.set = mori.assoc;

exports.has = mori.has_key;

exports.count = function(bag) {
	return mori.reduce(function(a, b) { return a + b; }, mori.vals(bag));
};

var arrRepeat = function(n, val) {
	var result = [];
	for (var i = 0; i < n; i++) result.push(val);
	return result;
};

exports.toArray = function(bag) {
	return mori.reduce_kv(function(arr, k, v) {
		return arr.concat(arrRepeat(v, k));
	}, [], bag);
};

exports.seq = function(bag) {
	return mori.reduce_kv(function(seq, k, v) {
		return mori.concat(seq, mori.repeat(v, k));
	}, mori.vector(), bag);
};

function binToVar(f) {
	return function() {
		return Array.prototype.reduce.call(arguments, f);
	};
}

function combineMultiplicitiesWith(f) {
	return binToVar(function(b1, b2) {
		return mori.reduce(function(acc, key) {
			return exports.set(acc, key, f(exports.get(b1, key), exports.get(b2, key)));
		}, exports.bag(), mori.set(mori.concat(mori.keys(b1), mori.keys(b2))));
	});
}

exports.union = combineMultiplicitiesWith(Math.max);

exports.intersection = combineMultiplicitiesWith(Math.min);

exports.sum = combineMultiplicitiesWith(function(a, b) { return a + b; });
