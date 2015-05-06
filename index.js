var _ = {
    once: function(fn) {
        var invoked = false;
        var res;
        return function() {
            if (!invoked) {
                invoked = true;
                res = fn();
                return res;
            } else {
                return res;
            }
        };
    },

    memoize: function(fn, resolver) {
        var cache = {};
        return function(arg) {
            var key = arg;
            if (resolver) {
                key = resolver(arg);
            }

            if (!cache.hasOwnProperty(key)) {
                cache[key] = fn(arg);
            }

            return cache[key];
        };
    },

    bind: function(fn, context) {
        return function() {
            return fn.call(context);
        };
    }
};

module.exports = _;
