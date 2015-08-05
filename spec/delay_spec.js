var assert = require("chai").assert;
var _ = require("..");

describe("delay", function() {
    var delayed = _.delay(function (a, b, c) {
        return a + b + c;
    }, 5000, [1, 2, 3]);

    it("delay invoking function", function() {
        assert.equal(delayed, 6);
    });
});
