var assert = require("chai").assert;
var _ = require("..");

describe("once", function() {
    it("should execute a function only once", function() {
        var i = 0;
        function add1() {
            return i += 1;
        }

        var addOnce = _.once(add1);

        addOnce();
        addOnce();
        addOnce();

        assert.equal(i, 1);
    });

    it("should return the result of the invoked function", function() {
        var i = 0;
        function add1() {
          i += 1;
          return i;
        }

        var addOnce = _.once(add1);

        assert.equal(addOnce(), 1);
        assert.equal(addOnce(), 1);
        assert.equal(addOnce(), 1);

    });

    it("should return undefined if function returns undefined", function() {
        function blah() {
            return;
        }

        var blahOnce = _.once(blah);

        assert.equal(blahOnce(), undefined);
    });

    it("should not invoke computation unless the returned function is invoked", function() {
        var i = 0;
        function add1() {
            i += 1;
            return i;
        }

        _.once(add1);
        var addOnce = _.once(add1);

        assert.equal(i,0);
        addOnce();
        assert.equal(i,1);
    });
});


describe("memoize", function() {
    it("should cache results", function() {
        var i = 0;
        function identity(n) {
            i = i + 1;
            return n;
        }

        memoizedIdentity = _.memoize(identity);

        assert.equal(memoizedIdentity(1), 1);
        assert.equal(memoizedIdentity(1), 1);
        assert.equal(i, 1);

        assert.equal(memoizedIdentity(2), 2);
        assert.equal(memoizedIdentity(2), 2);
        assert.equal(i, 2);
    });

    it("should use cache_key argument to calculate cache key", function() {
        function identity(o) {
            return o;
        }

        memoizedIdentity = _.memoize(identity, function(o) {
            return o[0];
        });

        var user1 = [1, "Howard"];
        var user2 = [1, "Howard Yeh"];
        assert.deepEqual(memoizedIdentity(user1),user1);
        assert.deepEqual(memoizedIdentity(user2),user1);
    });
});


describe("bind", function() {
    it("should force this to be a context object", function() {
        function returnThis() {
            return this;
        }

        var foo = {name: "foo"};
        var bar = {name: "bar"};

        var returnFoo = _.bind(returnThis, foo);
        var returnBar = _.bind(returnThis, bar);

        assert.deepEqual(returnFoo(), foo);
        assert.deepEqual(returnBar(), bar);
    });
});


describe("before", function() {
    it("should execute a function n times", function() {
        var i = 0;
        function add1() {
            i += 1;
        }

        var addTwice = _.before(3, add1);

        addTwice();
        assert.equal(i, 1);

        addTwice();
        assert.equal(i, 2);

        addTwice();
        assert.equal(i, 2);
    });

    it("should return the result of last invocation", function() {
        var i = 0;
        function add1() {
            return i += 1;
        }

        var addTwice = _.before(3, add1);

        assert.equal(addTwice(), 1);
        assert.equal(addTwice(), 2);
        assert.equal(addTwice(), 2);
    });
});


describe("after", function() {
    it("should execute a function after it is called at least n times", function() {
        var i = 0;
        function add1() {
            return i += 1;
        }

        var done = _.after(3, add1);

        assert.equal(done(), undefined);
        assert.equal(i, 0);

        assert.equal(done(), undefined);
        assert.equal(i, 0);

        done();
        assert.equal(i, 1);
    });
});


describe("curry", function() {
    var add = function (a, b, c) {
        return Math.pow(Math.pow(a, b), c);
    };

    var curried = _.curry(add);

    it("should return the result if all arguments are provided", function() {
        assert.equal(curried(3, 2, 1), 9);
        assert.equal(curried(4, 3, 2, 1), 4096);
    });

    it("should return a function that accepts the remaining arguments", function() {
        assert.equal(typeof curried(1), 'function');
        assert.equal(curried(3, 2)(1), 9);
        assert.equal(curried(3)(2, 1), 9);
        assert.equal(curried(3)(2)(1), 9);
    });
});


describe("curryRight", function() {
    var add = function (a, b, c) {
        return Math.pow(Math.pow(a, b), c);
    };

    var curried = _.curryRight(add);

    it("should return the result if all arguments are provided", function() {
        assert.equal(curried(1, 2, 3), 9);
        assert.equal(curried(1, 2, 3, 4), 4096);
    });

    it("should return a function that accepts the remaining arguments", function() {
        assert.equal(typeof curried(1), 'function');
        assert.equal(curried(1, 2)(3), 9);
        assert.equal(curried(1)(2, 3), 9);
        assert.equal(curried(1)(2)(3), 9);
    });
});


describe("delay", function() {
    var delayed = _.delay(function (a, b, c) {
        return a + b + c;
    }, 5000, [1, 2, 3]);

    it("delay invoking function", function() {
        assert.equal(delayed, 6);
    });
});


describe("flow", function() {
    it("successively invoke given functions", function() {
        var sum = function() {
            var s = 0;
            for (var idx in arguments) {
                s += arguments[idx];
            }
            return s;
        };

        var square = function(n) {
          return n * n;
        };

        var addSquare = _.flow(sum, square);
        assert.equal(addSquare(1, 2), 9);
        assert.equal(addSquare(1, 2, 3), 36);
    });
});


describe("flowRight", function() {
    it("successively invoke given functions from right to left", function() {
        var sum = function() {
            var s = 0;
            for (var idx in arguments) {
                s += arguments[idx];
            }
            return s;
        };

        var square = function(n) {
          return n * n;
        };

        var addSquare = _.flowRight(square, sum);
        assert.equal(addSquare(1, 2), 9);
        assert.equal(addSquare(1, 2, 3), 36);
    });
});


describe("ary", function() {
    it("accept up to n arguments", function() {
        var sum = function() {
            var s = 0;
            for (var idx in arguments) {
                s += arguments[idx];
            }
            return s;
        };

        var sumThree = _.ary(sum, 3);
        assert.equal(sumThree(1, 2, 3, 4), 6);
    });
});


describe("modArgs", function() {
    it("modified each argument through transform function", function() {
        var doubled = function(num) {
            return num * 2;
        };
        var square = function(num) {
            return num * num;
        };

        var modified = _.modArgs(function(x, y) {
            return [x, y];
        }, doubled, square);
        assert.deepEqual(modified(3, 4), [6, 16]);
    });
});


describe("negate", function() {
    it("negate the result of the predicate function.", function() {
        var negated = _.negate(function(n) {
            return n % 2 === 0;
        });
        assert.deepEqual([1, 2, 3, 4].filter(negated), [1, 3]);
    });
});
