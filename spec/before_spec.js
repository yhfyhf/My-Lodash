var assert = require("chai").assert;
var _ = require("..");

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
