var assert = require("chai").assert;
var _ = require("..");

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
