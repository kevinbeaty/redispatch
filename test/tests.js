"use strict";
var dispatch = require('../'),
    _ = require('underscore'),
    test = require('tape');

test('dispatch', function(t){
  var empty = dispatch();

  empty.register(function(){
    return null;
  });

  t.equals(null, empty(null));
  t.deepEquals(empty([1,2,3]), null);
  

  empty.register(function(arr){
    if(Array.isArray(arr)){
      return [];
    }
  });

  t.equals(null, empty(null));
  t.deepEquals(empty([1,2,3]), []);
  
  t.end();
});
