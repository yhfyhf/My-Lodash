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

    /**
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
        };
    },

    /**
     * Opposite of `before`, return a function that invoke `func` once it is called
     * at least `n` times.
     */
    after: function(n, func) {
        return function() {
            if (--n < 1) {
                return func();
            }
        };
    },

    /**
     * Return a function that accepts arguments of `func`. When all arguments are
     * provided, return the result of func, else return a function that accepts the
     * remaining arguments.
     */
    curry: function(func) {
        var argc = func.length;
        var curried = function () {
            if (arguments.length >= argc) {
                return func.apply(this, arguments);
            } else {
                var argv = arguments;
                return function() {
                    argv = Array.prototype.slice.call(argv);
                    return curried.apply(this, argv.concat(
                        Array.prototype.slice.call(arguments)));
                };
            }
        };
        return curried;
    },

    /**
     * Curry a function from right to left.
     */
    curryRight: function(func) {
        var argc = func.length;
        var curried = function () {
            var argv = Array.prototype.slice.call(arguments);
            if (arguments.length >= argc) {
                return func.apply(this, argv.reverse());
            } else {
                return function() {
                    return curried.apply(this, Array.prototype.slice.call(arguments).reverse()
                                                    .concat(argv.reverse())
                                                    .reverse());
                };
            }
        };
        return curried;
    },

    /**
     * Invoke `func` after `wait` milliseconds.
     */
    delay: function(func, wait, args) {
        var res;
        setTimeout(res=func.apply(this, args), wait);
        return res;
    },

    /**
     * Used for creating `flow` and `flowRight`.
     */
    createFlow: function(fromRight, args) {
        var functions = args;
        if (fromRight) {
            functions = functions.reverse();
        }
        return function() {
            var index = 0;
            var result = functions[index].apply(this, arguments);
            while (++index < functions.length) {
                result = functions[index].call(this, result);
            }
            return result;
        };
    },

    /**
     * Successively invoke given functions.
     */
    flow: function() {
        return _.createFlow(false, Array.prototype.slice.call(arguments));
    },

    /**
     * Successively invoke given functions from right to left.
     */
    flowRight: function() {
        return _.createFlow(true, Array.prototype.slice.call(arguments));
    },

    /**
     * Create a function that accepts up to `n` arguments.
     */
    ary: function(func, n) {
        n = n ? n : func.length;
        return function() {
            return func.apply(this, Array.prototype.slice.call(arguments).slice(0, n));
        };
    },

    /**
     * Create a function that accepts arguments be modified by each transform function.
     */
    modArgs: function(func) {
        var transforms = Array.prototype.slice.call(arguments);
        return function() {
            var index = 0;
            var args = Array.prototype.slice.call(arguments);
            // console.log(args);
            while (++index < transforms.length) {
                args[index-1] = transforms[index](args[index-1]);
            }
            return func.apply(this, args);
        };
    },

    /*
     * Create a function that negates the result of `func`.
     */
    negate: function(func) {
        return function() {
            return !func.apply(this, arguments);
        };
    }
};

module.exports = _;
