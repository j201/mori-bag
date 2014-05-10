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
