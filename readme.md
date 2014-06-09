#mori-bag

Efficient immutable bags (multisets) made with [mori](http://swannodette.github.io/mori/).

##Intro

A bag is an unordered collection of elements. Bags are like arrays without being in order, or sets that allow duplicates. They're often preferable to arrays since they can check the number of times an element exists in the collection in O(1) time.

Example (that abuses JS binding mutability a bit, but meh):

```js
var bag = require('mori-bag');

var coins = bag.bag([5, 25, 25]);

coins = bag.add(coins, 10); // Add a 10-cent coin
coins = bag.add(coins, 1, 7); // Add 7 pennies
coins = bag.add(coins, 100, 2); // Add 2 100-cent coins

coins = bag.remove(coins, 5); // Remove a 5-cent coin
coins = bag.remove(coins, 1, 3); // Remove 3 pennies
coins = bag.removeAll(coins, 100); // Remove all 100-cent coins

bag.has(coins, 25); => true // coins has a 25-cent coin
bag.get(coins, 1); => 4 // coins has 4 pennies
bag.toArray(coins); => [25, 25, 1, 1, 1, 1, 10];
```

##API

Note that all functions return new bags and do not modify their arguments. Element equality is determined by mori, so `mori.vector([1, 2, 3])` will always be treated as the same element.

**bag()**  
**bag(elements)**

Creates a new bag. If `elements` is provided, either as a JS array or another mori seqable, its elements are added to the bag.

**add(bag, element)**  
**add(bag, element, n)**

Adds the element to the bag. If `n` is provided, adds the element n times.

**remove(bag, element)**  
**remove(bag, element, n)**

Removes the element from the bag once. If `n` is provided, removes the element n times. If the element isn't present or `n` is greater than the number of times the element is present, this is equivalent to `removeAll(bag, element)`.

**removeAll(bag, element)**

If the element is present, removes all of it from the bag, otherwise doesn't change the bag.

**get(bag, element)**

Returns the number of times `element` is in `bag`.

**set(bag, element, value)**

Sets the number of times `element` is in `bag`.

**has(bag, element)**

Returns `true` is `element` is in `bag`, else `false`.

**count(bag)**

Returns the number of elements in bag.

**toArray(bag)**

Returns the elements of `bag` as a JS array.

**seq(bag)**

Returns the elements of `bag` as a mori seq. This needs to be used first in order to use functions like `mori.reduce` on the bag, since mori's seqable conversion doesn't convert the bag to a seq correctly.

**union(...bags)**

Returns the multiset union of the bags (the number of times each element appears in the result is equal to the maximum number of times it appears in any of the arguments).

**intersection(...bags)**

Returns the multiset intersection of the bags (the number of times each element appears in the result is equal to the minimum number of times it appears in any of the arguments).

**sum(...bags)**

Returns the multiset sum of the bags (the number of times each element appears in the result is equal to the sum of the number of times it appears in the arguments).

##Licence

[MIT](http://opensource.org/licenses/MIT)

©2014 j201
