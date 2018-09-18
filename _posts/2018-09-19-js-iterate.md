---
title: Iterating Arrays in Javascript
layout: post
date: 2018-09-18 13:03
categories: JavaScript
excerpt: "A brief look at four ways to iterate through an array in JavaScript"
---

Let's say our goal is to add together a series of numbers. We need to build a function that takes an array of numbers as input and returns the sum of those numbers as an integer. There are at least four ways to do this in JavaScript. Let's take a brief look.

## Set up

Most of our approaches will begin by instantiating a variable to keep track of our sum. Then, it will do something to increase that variable as we add up the numbers. Finally, it will return the variable as the output of the function.

{%- highlight javascript linenos -%}
function sum(arr) {
  // Instantiate counter
  let sum = 0;

  // Do something here to count up the numbers in the array

  // Return the total
  return sum;
}
{%- endhighlight -%}

It's always a good idea to print out the values we are working with in the function. Let's do this as a side effect using `console.log()`.

{%- highlight javascript linenos -%}
function sum('Array: ', arr) {
  // Print out arr
  console.log(arr);

  // Instantiate counter
  let sum = 0;

  // Do something here to count up the numbers in the array

  // Print out the total
  console.log('Total: ', sum);

  // Return the total
  return sum;
}
{%- endhighlight -%}

Now let's look at the different ways we can actually count up those numbers.

## Solution #1: Classic Iteration

The "classic" way to iterate over an array (or other iteritable item) is the **FOR** loop. We declare a(nother) counter variable (traditionally, the variable `i`) and use it to access the array element located at the `i`th index.

{%- highlight javascript linenos -%}
function sum('Array: ', arr) {
  // Print out arr
  console.log(arr);

  // Instantiate counter
  let sum = 0;

  // FOR loop
  for (let i = 0; i < arr.length; i++) {
     sum += arr[i];
  }

  // Print out the total
  console.log('Total: ', sum);

  // Return the total
  return sum;
}
{%- endhighlight -%}

Remember that `sum += arr[i]` is the same thing as `sum = sum + arr[i]`, except it is shorter, cooler, and more beautiful. ;)

**PROs:** I believe that prior to [ECMA 6](https://www.ecma-international.org/ecma-262/6.0/#sec-for-in-and-for-of-statements), this was the only way to iterate over the elements in an array, so most developers are very comfortable with this method. For the same reason, browsers have supported this method since the beginning of time.

**CONs:** It's messy. Three separate statements are smooshed together after the `for` keyword. It requires us to keep track of where we are in the iteration using a counter variable, such as `i`. And if we need to nest any other iterative loops inside it, we have to use a different variable to keep track of *that* iteration.

## Solution #2: FOR...OF

The advent of [ECMA 6](https://www.ecma-international.org/ecma-262/6.0/#sec-for-in-and-for-of-statements) in 2015 brought a couple new ways to loop over things. No longer must we create a "counter" variable (such as the friendly `i`) to keep track of where we are in the iteration process. The FOR...OF loop takes care of that for us:

{%- highlight javascript linenos -%}
function sum('Array: ', arr) {
  // Print out arr
  console.log(arr);

  // Instantiate counter
  let sum = 0;

  // FOR...OF loop
  for (let element of arr) {
    sum += element;
  }

  // Print out the total
  console.log('Total: ', sum);

  // Return the total
  return sum;
}
{%- endhighlight -%}

With a **for...of** loop, all we do is declare a variable to hold the current array element. JavaScript keeps track of **which** array element is the "current element" for us.

Note that the inside of the loop remains the same. We simply add the value of the current array element to our running counter, `sum`.

**PROs:** Cleaner and closer to natural language.

**CONs:** Some ancient browsers may not support it yet.



## Solution #3: forEach Array Method
In addition to the FOR...OF loop, arrays in JavaScript have the forEach method. This method takes as an argument a callback function to be applied to each element in the array:


{%- highlight javascript linenos -%}
function sum('Array: ', arr) {
  // Print out arr
  console.log(arr);

  // Instantiate counter
  let sum = 0;

  // forEach method
  ar.forEach((element) => {
    sum += element;
  });

  // Print out the total
  console.log('Total: ', sum);

  // Return the total
  return sum;
}
{%- endhighlight -%}

This example also uses the **arrow function expression** that is a concise alternative for writing anonymous functions. It takes the form `( ) => { }`, where the function arguments go within the parentheses, and the function body goes within the curly braces.

Note that the forEach method modifies the array itself, rather than returning a new array. The forEach method always returns undefined.

**PROs:** No separate counter variable is needed.

**CONs:** If you are defining the callback function at the same time as you are passing it as an argument to forEach, things can get messy and hard to read.

Also, there is no way to break out of a forEach without throwing an exception. If the loop starts, it will keep going until it applies the callback function to each element in the array. If you need the option to break out of the loop, use one of the FOR loops above.

## Solution #4: reduce

We can call the **reduce** method on an array whenever we want to "reduce" it down to a single value&mdash;such as the sum of all its elements. We pass a callback function into reduce that takes (at least) two arguments: a running total, and the current value. The callback function should return the new value of the running total, which is then passed into the function again when the next element is called.

Here is how we apply reduce to add up all the numbers in an array:

{%- highlight javascript linenos -%}
function sum('Array: ', arr) {
  // Print out arr
  console.log(arr);

  // reduce array method
  return arr.reduce((currentSum, value) => {
        return currentSum + value;
  });
}
{%- endhighlight -%}

**PROs:** Concision. We can dispense with counter variables as well as the `sum` variable that held our running total as we iterated over the array. In fact, the reduce method on an array can take the place of the entire `sum` function that we are trying to build.

**CONs:** It can be harder to read, especially if the callback function is complex. Probably a good idea to carefully document the action that the callback function takes in some comments.

## Choosing a solution

Each of the solutions discussed above do the job, so choosing the best solution is a matter of context and taste. If you need to support the oldest of browsers, a classic **for** is the safest bet. Also, since this is historically the most common way to iterate through an array, its purpose is obvious. Anyone looking at your code should be able to quickly grasp its function.

But I favor the array methods forEach and reduce for their simplicity. I don't need to keep track of which array index I'm on. I don't have to declare any placeholder variables. And in some cases (such as this example) I don't even have to write a separate function. For these reasons the array methods appeal to me.
