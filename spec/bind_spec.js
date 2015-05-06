var assert = require("chai").assert;

var _ = require("..");

describe("bind",function() {
  it("should force this to be a context object",function() {
    function returnThis() {
      return this;
    }

    var foo = {name: "foo"};
    var bar = {name: "bar"};

    var returnFoo = _.bind(returnThis,foo);
    var returnBar = _.bind(returnThis,bar);

    assert.deepEqual(returnFoo(),foo);
    assert.deepEqual(returnBar(),bar);
  });
});

