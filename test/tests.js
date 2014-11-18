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

  empty.register(emptyArray);

  t.equals(null, empty(null));
  t.deepEquals(empty([1,2,3]), []);

  empty.unregister(emptyArray);

  t.equals(null, empty(null));
  t.deepEquals(empty([1,2,3]), null);

  t.end();

  function emptyArray(arr){
    if(Array.isArray(arr)){
      return [];
    }
  }
});

test('context', function(t){
  var dog = {name: 'fido'},
      spot = {name: 'spot'},
      speak = dispatch();
  dog.say = dispatch(dog);

  speak.register(ruff);
  dog.say.register(ruff);

  t.equals('ruff fido', speak.call(dog));
  t.equals('ruff spot', speak.call(spot));
  t.equals('ruff fido', dog.say());

  speak.register(bark);
  dog.say.register(bark);

  t.equals('bark fido', speak.call(dog));
  t.equals('bark spot', speak.call(spot));
  t.equals('bark fido', dog.say());

  speak.unregister(bark);
  dog.say.unregister(bark);

  t.equals('ruff fido', speak.call(dog));
  t.equals('ruff spot', speak.call(spot));
  t.equals('ruff fido', dog.say());

  t.end();

  function ruff(){
    /*jshint validthis:true */
    return 'ruff '+this.name;
  }

  function bark(){
    /*jshint validthis:true */
    return 'bark '+this.name;
  }

});
