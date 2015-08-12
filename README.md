# My-Lodash

A JavaScript utility library for a taste of functional programming.


## Quick Start
```javascript
var add = function (a, b, c) {
    return Math.pow(Math.pow(a, b), c);
};

var curried = _.curry(add);

console.log(curried(3)(2)(1));  // 9
```

## API
``` javascript
_.once(func)
_.memoize(func, resolver)
_.bind(func, context)
_.before(n, func)
_.after(n, func)
_.curry(func)
_.curryRight(func)
_.delay(func, wait, args)
_.flow([funcs])
_.flowRight([funcs])
_.ary(func, [n=func.length])
_.modArgs(func, [transforms])
_.negate(func)
_.rearg(func, [indexes])
_.wrap(value, func)
```

## Tests
```bash
mocha test
```

## License
**IDC(I Don't Care)**
