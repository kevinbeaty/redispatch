# Redispatch 

[![Build Status](https://secure.travis-ci.org/kevinbeaty/redispatch.svg)](http://travis-ci.org/kevinbeaty/redispatch)

Creates a function that delegates to a chain of registered dispatch functions. The registered functions are applied with the same arguments and context as the called function in the order they are registered. The first result from a registered function that is not `undefined` will be returned.

```javascript
var dispatch = require('redispatch');

var empty = dispatch()

empty.register(function(){
  return null;
});

empty(null);
// null

empty([1,2,3]);
// null

empty.register(function(arr){
  if(Array.isArray(arr)){
    return [];
  }
});

empty(null);
// null

empty([1,2,3]);
// []

```

Note `register` can be called at any time.  This can be used to extend default behavior of library functions.  See [underscore-transducer][1] for examples.

### License
MIT

[1]: https://github.com/kevinbeaty/underscore-transducer
