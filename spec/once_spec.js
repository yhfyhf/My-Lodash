var once = require("..").once;
var assert = require("chai").assert;

describe("once",function() {
  it("should execute a function only once",function() {
    var i = 0;
    function add1() {
      return i += 1;
    }

    var addOnce = once(add1);

    addOnce();
    addOnce();
    addOnce();

    assert.equal(i,1);
  });

  it("should return the result of the invoked function", function() {
    var i = 0;
    function add1() {
      i += 1;
      return i;
    }

    var addOnce = once(add1);

    assert.equal(addOnce(),1);
    assert.equal(addOnce(),1);
    assert.equal(addOnce(),1);

  });

  it("should return undefined if function returns undefined",function() {
    function blah() {
      return;
    }

    var blahOnce = once(blah);

    assert.equal(blahOnce(),undefined);
  });

  it("should not invoke computation unless the returned function is invoked",function() {
    var i = 0;
    function add1() {
      i += 1;
      return i;
    }

    once(add1);
    var addOnce = once(add1);

    assert.equal(i,0);
    addOnce();
    assert.equal(i,1);


  });


});