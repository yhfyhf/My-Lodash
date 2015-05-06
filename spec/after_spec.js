var assert = require("chai").assert;
var _ = require("..");

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
