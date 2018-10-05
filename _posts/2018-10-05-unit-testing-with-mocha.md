---
title: Unit Testing with Mocha
layout: post
date: 2018-10-05 18:53:29
categories:
    - JavaScript
    - Problem Solving
excerpt: 'It's a great feeling to have built something. It's an even better feeling to be confident that the thing you built does what it's supposed to do. How can we gain this confidence?'
---

Let's say you've just written the World's Greatest App&trade;. It's a calculator, and it's beautiful. It has tons of cool features. It does the <a href="https://en.wikipedia.org/wiki/New_Math" target="_blank" {{ site.ext_link_rel }}>new math</a>. You've poured your heart and soul into it. Plus an arm and a leg. Not to mention a few hours. It's a great feeling to have built something. It's an even better feeling to be confident that the thing you built does what it's supposed to do. You tested it on your machine for a few minutes, but something nags at you that you're forgetting something. What if a user clicks the wrong thing at the wrong time and it breaks? And how do you know that all the pieces of it will work properly together in every situation?

To test every conceivable user behavior by hand is not only impractical, it's impossible. Luckily, there are several tools available that make it easy to test *most* situations automatically&nbsp;and, at the very least, to be certain your code works the way you intend it to. Let's talk about a few of these.

## Mocha, a test framework

<a href="https://mochajs.org" target="_blank" {{ site.ext_link_rel }}>Mocha</a>, like other test frameworks, makes it possible for us to test our code automatically. Before we can write any tests, though, we have to bring Mocha into our project.

Mocha runs on <a href="https://nodejs.org/" target="_blank" {{ site.ext_link_rel }}>Node.js</a>, so it can be installed like any Node module with the <a href="https://www.npmjs.com/" target="_blank" {{ site.ext_link_rel }}>Node Package Manager</a> and run from the terminal. But for now let's keep things simple and run it in the browser.

First, let's create an HTML file called `test.html`:

{%- highlight html linenos -%}
<html>
    <head>
        <meta charset="utf-8">
        <title>Mocha Tests</title>
    </head>
    <body>

    </body>
</html> 
{%- endhighlight -%}

Mocha provides a CSS file and a JS file we can link to from our test page. And in order for Mocha to display the results of our tests, we need to add a `<div>` tag with the id `mocha`.

{%- highlight html linenos -%}
<html>
    <head>
        <meta charset="utf-8">
        <title>Mocha Tests</title>
        <link href="https://unpkg.com/mocha@5.2.0/mocha.css" rel="stylesheet">
    </head>
    <body>
        <div id="mocha"></div>

        <script src="https://unpkg.com/mocha@5.2.0/mocha.js"></script>
    </body>
</html> 
{%- endhighlight -%}

(Be sure to consult the <a href="https://mochajs.org/#running-mocha-in-the-browser" target="_blank" {{ site.ext_link_rel }}>Mocha documentation</a> to get the most up-to-date URLs to the CSS and JS files.)

Finally, add a few lines of JavaScript to the HTML:

{%- highlight html linenos -%}
<html>
    <head>
        <meta charset="utf-8">
        <title>Mocha Tests</title>
        <link href="https://unpkg.com/mocha@5.2.0/mocha.css" rel="stylesheet">
    </head>
    <body>
        <div id="mocha"></div>

        <script src="https://unpkg.com/mocha@5.2.0/mocha.js"></script>

        <script>mocha.setup('bdd')</script>

        <script>mocha.run()</script>
    </body>
</html> 
{%- endhighlight -%}

The line inside the first tag sets Mocha up to run. In a minute we'll add another `<script>` tag in line 13 that links to some actual tests. Line 14 actually runs the tests.

If we navigate to test.html we should now see some text in the top-right corner that tells us how many of our tests have passed, how many have failed, and how long the tests took to run. Since we aren't actually running any tests yet, we see zero's across the board.

## Assertion libraries: The language of tests

There's one more piece missing before we can start to write a test. We need a language in which to write it. It would be cumbersome to write our tests in plain JavaScript. Thankfully, there are several assertion libraries that make it easy, resulting in tests that read very much like natural English, and <a href="https://mochajs.org/#assertions" target="_blank" {{ site.ext_link_rel }}>Mocha plays nice with all of them</a>.

Let's use the <a href="https://www.chaijs.com/" target="_blank" {{ site.ext_link_rel }}>chai.js</a> assertion library. All we have to do is put a reference to it in test.html:

{%- highlight html linenos -%}
<html>
    <head>
        <meta charset="utf-8">
        <title>Mocha Tests</title>
        <link href="https://unpkg.com/mocha@5.2.0/mocha.css" rel="stylesheet">
    </head>
    <body>
        <div id="mocha"></div>
        <script src="https://www.chaijs.com/chai.js"></script>
        <script src="https://unpkg.com/mocha@5.2.0/mocha.js"></script>

        <script>mocha.setup('bdd')</script>

        <script>mocha.run()</script>
    </body>
</html> 
{%- endhighlight -%}

Now let's write some tests!

## Writing a test

It's always a good idea to start with a simple test that will tell us whether all the pieces of our testing suite are working properly. Let's begin by creating a file called test.test.js. (It's helpful to append a test file with `test.js` so we can easily recognize a test file.) Let's tell Mocha to run this test file by adding it to test.html:

{%- highlight html linenos -%}
<html>
    <head>
        <meta charset="utf-8">
        <title>Mocha Tests</title>
        <link href="https://unpkg.com/mocha@5.2.0/mocha.css" rel="stylesheet">
    </head>
    <body>
        <div id="mocha"></div>
        <script src="https://www.chaijs.com/chai.js"></script>
        <script src="https://unpkg.com/mocha@5.2.0/mocha.js"></script>

        <script>mocha.setup('bdd')</script>
        <script src="test.test.js"></script>
        <script>mocha.run()</script>
    </body>
</html> 
{%- endhighlight -%}

The test.test.js file will contain just one test:

{%- highlight javascript linenos -%}
describe('The test suite', function() {
    it('is working.', function() {
        chai.expect(true).to.be.true;
    });
});
{%- endhighlight -%}

Our assertion library, Chai, comes with some handy functions we use to write tests&mdash;but they can be a little strange-looking at first. This test begins by calling the `describe()` function, which is used to group related tests. (That is, all the tests inside this function *describe* the same thing.) The `descibe()` function takes two arguments:

1. a string ("The test suite") which expresses the thing these tests are describing, and
2. a callback function which will contain the actual tests.

Inside the callback function, we call yet another function, simply called `it()`. This function represents an individual test. Like the `describe()` function, it takes two arguments. The first is a string, and the second is a callback function comprising the actual test.

The actual test contains just one line of code, `expect(true).to.be.true;`. Any guesses about what this line does? Our assertion library provides the function `expect()`, which takes an expression that we can test. In this case, we're doing the rather silly test of checking whether true is true.

Obviously this test will pass&mdash;unless something is wrong with how we've set up the test suite. If everything is working right, we should see something like that looks like this:

<style>
#mocha {
    font: 20px/1.5 "Helvetica Neue", Helvetica, Arial, sans-serif;
    margin: 1rem 50px;
}
#mocha ul {
    list-style: none;
}
#mocha ul, #mocha li {
    margin: 0;
    padding: 0;
}
#mocha h1 {
    margin: 0;
    font-size: 1em;
    font-weight: 200;
}
#mocha h2 {
    margin: 0;
    position: relative;
    font-size: 12px;
    font-weight: normal;
}
#mocha .test.pass {
    margin-left:20px;
}
#mocha .test.pass::before {
    content: '✓';
    font-size: 12px;
    display: block;
    float: left;
    margin-right: 5px;
    color: #00d6b2;
}
</style>
<div id="mocha">
    <ul id="mocha-report">
        <li class="suite">
            <h1>The test suite</h1>
            <ul>
                <li class="test pass fast">
                    <h2>is working.</h2>
                </li>
            </ul>
        </li>
    </ul>
</div>

<div class="snippet">
    <h3>A word about naming tests</h3>
    <p>As you'll see in the simple example above, the test reads as an English sentence. It even ends with a period. This is an important convention in testing. A project with thousands of tests will be much easier to read if each tests states <em>precisely</em> what it is testing, in plain English.</p>
    <p>This is sometimes easier said than done, but you'll thank yourself later for any effort you spend making your tests readable!</p>
</div>

## Writing a *real* test

Ok, so maybe checking to see if true is true isn't the most useful test. Let's see how we can use a test to actually check the behavior of our code. Suppose we used the following little function in our calculator app:

{%- highlight javascript linenos -%}
function isNumeric(string) {
    return (0 <= string && string <= 9);
}
{%- endhighlight -%}

It takes a string input and checks if the string is a digit from 0 to 9. If it is, the function returns true. If not, it returns false.

But are we sure this function works the way we think it should? Let's test it. We'll want to check two scenarios:

1. Does it return true for the digits 0 through 9?
2. Does it return false for everything else?

If the function does both of these things, we can be confident that it works. What would these tests look like? Let's start with the first scenario:

{%- highlight javascript linenos -%}
describe("isNumeric", function() {
    it("returns true for digits.", function() {
        for (let i = 0; i < 10; i++) {
            expect(isNumeric(i)).to.be.true;
        }
    });
});
{%- endhighlight -%}

We're testing the `isNumeric()` function right now, so that's the string we pass to `describe()`. Likewise, the string we pass to `it()` tells us we're checking that this function "returns true for digits."

The part inside `it()` is where the actual checking takes place. We explicitly check each digit from 0 to 9 with a `for` loop that passes each digit into the `isNumeric()` function. We tell Mocha that we expect the result of `isNumeric()` to be true each time. If it returns false for any of them, then the test fails.

What about the second scenario? We can't explicitly check for every single non-digit value like we did when we checked for the digits. This is where we have to consider the inputs that are most likely in the context of our app. Since it's a calculator, perhaps we should check that operators (such as + and -) return false. After all, operators aren't digits.

{%- highlight javascript linenos -%}
describe("isNumeric", function() {
    it("returns true for digits.", function() {
        for (let i = 0; i < 10; i++) {
            expect(isNumeric(i)).to.be.true;
        }
    });

    it("returns false for operators.", function() {
        expect(isNumeric('+')).to.be.false;
        expect(isNumeric('-')).to.be.false;
        expect(isNumeric('/')).to.be.false;
        expect(isNumeric('x')).to.be.false;
    });
});
{%- endhighlight -%}

Note that this time we called `expect()` multiple times inside a test. This is because we have four operators to check: +, -, x, and /. All four of those have to return false in order for this test to pass.

## Testalicious

As you can see, tests can be time-consuming to write, but hopefully it's clear that automated testing can make you a faster, more confident developer.
