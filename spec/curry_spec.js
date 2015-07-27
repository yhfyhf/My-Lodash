var assert = require("chai").assert;
var _ = require("..");

describe("curry", function() {
    var add = function (a, b, c) {
        return a + b + c;
    };

    var curried = _.curry(add);

    it("should return the result if all arguments are provided", function() {
        assert.equal(curried(1, 2, 3), 6);
        assert.equal(curried(1, 2, 3, 4), 6);
    });

    it("should return a function that accepts the remaining arguments", function() {
        assert.equal(typeof curried(1), 'function');
        assert.equal(curried(1, 2)(3), 6);
        assert.equal(curried(1)(2, 3), 6);
        assert.equal(curried(1)(2)(3), 6);
    });
});
