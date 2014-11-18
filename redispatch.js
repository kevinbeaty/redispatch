"use strict";
var undef;

module.exports = redispatch;

function redispatch(){
  var fns = [],
      d = dispatch(fns);
  d.register = function(fn){
    fns.push(fn);
  };
  return d;
}

function dispatch(fns){
  return function(){
    var args = arguments, i = fns.length, result;
    for(; i-- ;){
      result = fns[i].apply(this, args);
      if(result !== undef){
        return result;
      }
    }
  };
}
