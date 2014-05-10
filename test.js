var tape = require('tape');
var bag = require('./lib');
var mori = require('mori');

tape('bag', function(t) {
	t.ok(mori.equals(bag.bag(), mori.hash_map()), "bag() creates an empty bag");
	t.ok(mori.equals(bag.bag([1, 1, 2]), mori.hash_map(1, 2, 2, 1)), "bag(arr) fills the bag with the array elements");
	t.ok(mori.equals(bag.bag(mori.list(1, 1, 2)), mori.hash_map(1, 2, 2, 1)), "bag(seq) fills the bag with the seq elements");
	t.end();
});

tape('toArray', function(t) {
	t.deepEqual(bag.toArray(bag.bag([1, 1, 2])).sort(), [1, 1, 2]);
	t.end();
});

function bagArrEq(t, _bag, arr, msg) {
	if (msg)
		t.deepEqual(bag.toArray(_bag).sort(), arr.sort(), msg);
	else
		t.deepEqual(bag.toArray(_bag).sort(), arr.sort());
}

tape('add', function(t) {
	bagArrEq(t, bag.add(bag.bag(), 1), [1], "add new element");
	bagArrEq(t, bag.add(bag.bag([1, 1, 2]), 1), [1, 1, 1, 2], "add existing element");
	bagArrEq(t, bag.add(bag.bag(), 1, 3), [1, 1, 1], "add repeatedly");
	t.end();
});

tape('remove', function(t) {
	bagArrEq(t, bag.remove(bag.bag([1, 1]), 1), [1], "remove existing element");
	bagArrEq(t, bag.remove(bag.bag([2]), 1), [2], "remove non-existing element");
	bagArrEq(t, bag.remove(bag.bag([1, 1, 1, 1]), 1, 2), [1, 1], "remove repeatedly");
	t.end();
});

tape('removeAll', function(t) {
	bagArrEq(t, bag.removeAll(bag.bag([1, 1, 2]), 1), [2], "removeAll existing elements");
	bagArrEq(t, bag.removeAll(bag.bag([2]), 1), [2], "removeAll non-existing elements");
	t.end();
});

tape('get', function(t) {
	t.equal(bag.get(bag.bag([1, 1, 5]), 1), 2, "get an existing element");
	t.equal(bag.get(bag.bag([1, 1, 5]), 3), 0, "get a non-existing element");
	t.end();
});

tape('has', function(t) {
	t.equal(bag.has(bag.bag([1, 1, 5]), 1), true, "has an existing element");
	t.equal(bag.has(bag.bag([1, 1, 5]), 3), false, "has a non-existing element");
	t.end();
});

tape('count', function(t) {
	t.equal(bag.count(bag.bag([1, 1, 3])), 3);
	t.end();
});

tape('seq', function(t) {
	t.ok(mori.equals(mori.sort(bag.seq(bag.bag([1, 1, 2]))), mori.list(1, 1, 2)));
	t.end();
});
