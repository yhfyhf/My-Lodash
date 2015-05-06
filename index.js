var _ = {

    /**
     * Restrict the `func` to be invoked only once.
     */
    once: function(func) {
        var invoked = false;
        var res;
        return function() {
            if (!invoked) {
                invoked = true;
                res = func();
                return res;
            } else {
                return res;
            }
        };
    },

    /**
     * Memoize the result of `func`. The optional `resolver` determines how resolve
     * the caching key.
     */
    memoize: function(func, resolver) {
        var cache = {};
        return function(arg) {
            var key = arg;
            if (resolver) {
                key = resolver(arg);
            }

            if (!cache.hasOwnProperty(key)) {
                cache[key] = func(arg);
            }

            return cache[key];
        };
    },

    /**
     * Force `this` in `func` to be a context object.
     */
    bind: function(func, context) {
        return function() {
            return func.call(context);
        };
    },

    /*
     * Return a function in which `func` is called less than `n` times. Subsequent
     * calls return the result of last `func` invocation.
     */
    before: function(n, func) {
        var res;
        return function() {
            if (--n > 0) {
                res = func();
            }
            return res;
        }
    },

    /*
     * Opposite of `before`, return a function that invoke `func` once it is called
     * at least `n` times.
     */
    after: function(n, func) {
        return function() {
            if (--n < 1) {
                return func();
            }
        }
    }

};

module.exports = _;
