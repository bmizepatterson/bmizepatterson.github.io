---
title: JS Functions
layout: post
---

An exercise: What will the function whatDoIDo() return?

{%- highlight javascript -%}
function whatDoIDo() {
  function makeMysteryFunction(makerValue) {
    var newFunction = function doMysteriousThing(param) {
      return makerValue + param;
    };
    return newFunction;
  }

  var mysteryFunction3 = makeMysteryFunction(3);
  var mysteryFunction5 = makeMysteryFunction(5);

  return mysteryFunction3(10) + mysteryFunction5(5)
}
{%- endhighlight -%}

Answer: 23
