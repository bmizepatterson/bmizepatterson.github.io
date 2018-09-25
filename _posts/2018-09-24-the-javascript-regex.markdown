---
title: The JavaScript Regex
layout: post
date: 2018-09-25 07:51:19
categories: JavaScript
excerpt: 'How to use Regexes in JavaScript'
---

For some, a well-formed regex is a thing of beauty; for others, it's the reason why there's a bottle of ibuprofen nearby. Regardless of which group you fall into, it's hard to deny that regular expressions are powerful tools, and any web developer would do well to become familiar (if not actually *comfortable*) with their use.

The regex will take different forms depending on the context and what language you are working with. This post will consider the JavaScript implementation and provide an overview of how they work in that language.

(This post is **not** a general introduction to regular expressions, so if that's what you need, check out the [resources](#regex-tools) below.)

## Creating a regular expression in JS

Most importantly, and most strangely, in JavaScript the regular expression is not a string but an object. And so, when defining a regex, don't use quotes;
use the backslash (`/`):

{%- highlight javascript -%}
let expression = /blog/;
{%- endhighlight -%}

Or, you can create an instance of the RegExp object, in which case you **do** use quotes:

{%- highlight javascript -%}
let expression = new RexExp("blog");
{%- endhighlight -%}

Any flags should be placed after the second delimiting backslash. In this example, the `i` flag indicates case-insensitive matching:

{%- highlight javascript -%}
let expression = /blog/i;
{%- endhighlight -%}

MDN has a <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp#Syntax" target="_blank">comprehensive list</a> of available flags.

## Using a regular expression in JS

Defining your regular expression is one thing; using it to search text is another. Thankfully, the JS RexExp object comes with several useful methods.

### Testing for a match

To test for a match, pass the string to be search into the RexExp::test() method. This method will return true if the regex matches the string, otherwise false.

{%- highlight javascript -%}
let expression = /blog/i;
let match = expression.test('This blog is awesome!');   // Returns true
{%- endhighlight -%}

### Obtaining matched text

If you need more information about a match than just *whether* it occurred, use the RexExp::exec() method. Calling exec() on a string will return `null` if no match is found. Otherwise, it will return an object with more information about the match.

{%- highlight javascript -%}
let expression = /blog/i;
let match = expression.exec('This blog is awesome!');
console.log(match.index);   // Prints 5, the position of the matched text
console.log(match);         // Prints an array of matched strings
{%- endhighlight -%}

### String methods

Note that the test() and exec() methods are called on the JavaScript RegExp object, and we pass in the string to be searched. Alternatively, we can call analogous methods *on the test string* and pass in a RexExp object.

{%- highlight javascript -%}
let expression = /blog/i;
let string = 'This blog is awesome!';
string.search(expression);      // Returns 5, the position of the matched text
string.match(expression);       // Returns an array of matches

let replaced = string.replace(expression, 'article');
console.log(replaced);
// Prints "This article is awesome!"
{%- endhighlight -%}

## Regex Tools

Check out these handy tools and resources about regular expressions:

- <a href="https://regex101.com/" target="_blank">Regex101.com</a> &mdash; Create and test your expressions all in one place
- <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp" target="_blank">MDN Regex Reference</a> &mdash; Formal description of JavaScript's implementation of regular expressions
- <a href="https://eloquentjavascript.net/09_regexp.html" target="_blank">Eloquent Javascript: Regular Expressions</a> &mdash; Thorough but delightfully readable tutorial for regular expressions in JavaScript
