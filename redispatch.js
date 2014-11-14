"use strict";
var undef;

module.exports = redispatch;

function redispatch(){
  var fns = [], d = function(){
    var args = arguments, i = fns.length, result;
    for(; i-- ;){
      result = fns[i].apply(this, args);
      if(result !== undef){
        return result;
      }
    }
  };

  d.register = function(fn){
    fns.push(fn);
  };
  return d;
}
