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
