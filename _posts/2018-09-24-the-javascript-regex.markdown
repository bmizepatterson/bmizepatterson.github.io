---
title: The JavaScript Regex
layout: post
date: 2018-09-24 15:56:45
categories: JavaScript
excerpt: 'How to use Regexes in JavaScript'
---

For some, a well-formed regex is a thing of beauty; for others, it's the reason why there's a bottle of ibuprofen nearby. Regardless of which group you fall into, it's hard to deny that regular expressions are powerful tools, and any web developer would do well to become familiar (if not actually *comfortable*) with their use.

The regex will take different forms depending on the context and what language you are working with. This post will consider the JavaScript implementation and provide an overview of how they work in that (other) polarizing language.

(This post is **not** a general introduction to regular expressions, so if you need, so if that's what you need, check out the [resources](#regex-tools) below.)

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

## Regex Tools

Check out these handy tools and resources about regular expressions:

- <a href="https://regex101.com/" target="_blank">Regex101.com</a> &mdash; Create and test your expressions all in one place
- <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp" target="_blank">MDN Regex Reference</a> &mdash; Formal description of JavaScript's implementation of regular expressions
- <a href="https://eloquentjavascript.net/09_regexp.html" target="_blank">Eloquent Javascript: Regular Expressions</a> &mdash; Thorough but delightfully readable tutorial for regular expressions in JavaScript
