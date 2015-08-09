var assert = require("chai").assert;
var _ = require("..");

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
