---
title: Function Scope
subtitle: A Meditation
layout: post
date: 2018-08-26 12:24:11
categories: JavaScript
excerpt: "Let's get abstract. We'll ponder the nature of the JavaScript function and think about scope. Oh, and what's a <em>koan</em>?"
---

Recently I was working through this [JavaScript koan](https://github.com/mrdavidlaing/javascript-koans):

{%- highlight javascript linenos -%}
function makeMysteryFunction(makerValue) {
  var newFunction = function doMysteriousThing(param) {
    return makerValue + param;
  };
  return newFunction;
}

var mysteryFunction3 = makeMysteryFunction(3);
var mysteryFunction5 = makeMysteryFunction(5);
{%- endhighlight -%}

JavaScript koans ([**KOH**-ahns](https://www.dictionary.com/browse/koan)) are exercises that teach JavaScript through testing. Each exercise initially results in a run-time error, and by finding and fixing it you are brought a little closer to JavaScript enlightenment. In this particular exercise, the error to fix involved this expression:

{%- highlight javascript -%}
mysteryFunction3(10) + mysteryFunction5(5)
{%- endhighlight -%}

Here we have two functions, one nested inside the other. The function makeMysterFunction takes one parameter, makerValue, and consists of one variable declaration, newFunction, which it returns. But newFunction is itself assigned the function doMysteriousThing which takes param and returns the sum of makerValue and param.

When I first thought through this, I wondered how the parameter param could ever be passed to doMysteriousThing. In fact, since doMysteriousThing is defined inside of makeMysteryFunction, there's no way to call that function at all, right?

And the lines that followed seemed very strange. A variable called mysteryFunction3 is declared and assiged the result of makeMysteryFunction(3). But this doesn't make sense. If I pass 3 to makeMysteryFunction, sure, the inner function doMysteriousThing uses that value in the line `return makerValue + param;` but that's the only use of makeValue in the function. It doesn't even return it.

And what would the final line do? What does the call to `mysteryFunction3(10)` even mean? What's going on here?

There were two key concepts I had to grasp before any of this made sense.

## Inescapable scope
The first is scope. Scope refers to where in your code a particular variable is accessible. At first glace, scope is pretty straightforward. There are two scopes: local and global. Local variables aren't accessible outside of their context. So a variable declared inside a function can't be used outside of it. So far so good.

But things get a little tricky when we start nesting functions. In our example, the function doMysteriousThing is nested inside makeMysteryFunction. So the variable param (line 3) is accessible only within doMysteriousThing, but makerValue is accessible inside makeMysteryFunction **and** doMysteriousThing.

## A lesson in function ontology
Second, I had to understand the *essence* of the JavaScript function. I knew what functions *did*. I knew that they accepted parameters, executed tasks, and returned values. But I didn't really understand what they *were*. In JavaScript, [functions are objects](https://medium.com/front-end-hacking/javascript-functions-are-objects-6affba08ab26). What this means is that, aside from accepting parameters, executing tasks, and doing all the things functions do, a JavaScript function can itself be assigned to a variable&mdash;that is, as a whole, not just its return value. This is actually happening in several places the code above, such as in line 2, where the entire function doMysteriousThing is assigned to the variable newFunction.

And if they can be assigned to variables, that means they can be returned by other functions. In line 5, makeMysteryFunction returns newFunction, which is itself the function doMysteriousThing. It's understanding this that brought lines 8 and 9 to light for me. The variable mysteryFunction3 is actually a call to doMysteriousThing where makerValue equals 3. Likewise, mysteryFunction5 is a call to doMysteriousThing where makerValue is equal to 5.

## Toward JavaScript enlightenment
I'll let you finish the problem and evaluate the expression `mysteryFunction3(10) + mysteryFunction5(5)`. Without an understanding of functions and scope in JavaScript, this exercise is indeed a mystery, and in this case the koans certainly deliver on their promise of JavaScript enlightenment.

## Learn more
- [MDN JS Function Reference](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions)
- [Function Closures](https://www.w3schools.com/js/js_function_closures.asp)&mdash;a trick that leverages scope
- Marijn Haverbeke's chapter on [Functions](https://eloquentjavascript.net/03_functions.html) from *Eloquent Javascript* provides a much more thorough and, well, *eloquent* explanation of functions in JavaScript.
