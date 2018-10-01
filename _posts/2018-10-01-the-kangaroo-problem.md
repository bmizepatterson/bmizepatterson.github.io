---
title: The Kangaroo Problem
subtitle: How should we evaluate code?
layout: post
date: 2018-10-01 14:33:32
categories:
    - Problem Solving
excerpt: 'The concept of "good code" can be controversial&mdash;as much as, I suppose, the concept of "good" anything. What makes something good? Obviously, different people will have different answers. This post will discuss a few ideas&mdash;at least as far as code goes.'
---

<div class="snippet">
    <blockquote>
        <p>Quot homines, tot sententiae; suus cuique mos.<br />
           There are as many opinions as there are people. To each his own.</p>
        <p>&mdash;Terence, Phormio 454</p>
    </blockquote>

    <blockquote>
        <p>Though I <strong>code</strong> with the tongues of men and of angels, but have not love, I have become sounding brass or a clanging cymbal.</p>
        <p>&mdash;I Corinthians 13:1 (adapted)</p>
    </blockquote>
</div>

The concept of "good code" can be controversial&mdash;as much as, I suppose, the concept of "good" anything. What makes something good? Obviously, different people will have different answers. But perhaps that makes it more imporant than ever for me to answer that question for myself.

So what makes "good code"? This post will discuss a few ideas.

Warning: For an example I'll be looking at the <a href="https://www.hackerrank.com/challenges/kangaroo/problem" target="_blank" {{ site.ext_link_rel }} >HackerRank Kangaroo Problem</a>. **I will be discussing solutions to the problem.** (In fact, I'll be discussing several solutions.) **If you don't want the solution spoiled for you, stop reading here.** You've been warned...

## The Kangaroo Problem

Here's the setup, <a href="https://www.hackerrank.com/challenges/kangaroo/problem" target="_blank" {{ site.ext_link_rel }} >as desribed on HackerRank</a>:

<div class="snippet">
    <p>You are choreographing a circus show with various animals. For one act, you are given two kangaroos on a number line ready to jump in the positive direction (i.e, toward positive infinity).</p>

    <ul>
        <li>The first kangaroo starts at location <svg xmlns:xlink="http://www.w3.org/1999/xlink" width="2.492ex" height="2.176ex" style="vertical-align: -0.338ex;" viewBox="0 -791.3 1073 936.9" role="img" focusable="false"><g stroke="currentColor" fill="currentColor" stroke-width="0" transform="matrix(1 0 0 -1 0 0)"><path stroke-width="1" d="M52 289Q59 331 106 386T222 442Q257 442 286 424T329 379Q371 442 430 442Q467 442 494 420T522 361Q522 332 508 314T481 292T458 288Q439 288 427 299T415 328Q415 374 465 391Q454 404 425 404Q412 404 406 402Q368 386 350 336Q290 115 290 78Q290 50 306 38T341 26Q378 26 414 59T463 140Q466 150 469 151T485 153H489Q504 153 504 145Q504 144 502 134Q486 77 440 33T333 -11Q263 -11 227 52Q186 -10 133 -10H127Q78 -10 57 16T35 71Q35 103 54 123T99 143Q142 143 142 101Q142 81 130 66T107 46T94 41L91 40Q91 39 97 36T113 29T132 26Q168 26 194 71Q203 87 217 139T245 247T261 313Q266 340 266 352Q266 380 251 392T217 404Q177 404 142 372T93 290Q91 281 88 280T72 278H58Q52 284 52 289Z"></path><g transform="translate(572,0)"><path stroke-width="1" d="M213 578L200 573Q186 568 160 563T102 556H83V602H102Q149 604 189 617T245 641T273 663Q275 666 285 666Q294 666 302 660V361L303 61Q310 54 315 52T339 48T401 46H427V0H416Q395 3 257 3Q121 3 100 0H88V46H114Q136 46 152 46T177 47T193 50T201 52T207 57T213 61V578Z"></path></g></g></svg> and moves at a rate of <svg xmlns:xlink="http://www.w3.org/1999/xlink" width="2.29ex" height="2.176ex" style="vertical-align: -0.338ex;" viewBox="0 -791.3 986 936.9" role="img" focusable="false"><g stroke="currentColor" fill="currentColor" stroke-width="0" transform="matrix(1 0 0 -1 0 0)"><path stroke-width="1" d="M173 380Q173 405 154 405Q130 405 104 376T61 287Q60 286 59 284T58 281T56 279T53 278T49 278T41 278H27Q21 284 21 287Q21 294 29 316T53 368T97 419T160 441Q202 441 225 417T249 361Q249 344 246 335Q246 329 231 291T200 202T182 113Q182 86 187 69Q200 26 250 26Q287 26 319 60T369 139T398 222T409 277Q409 300 401 317T383 343T365 361T357 383Q357 405 376 424T417 443Q436 443 451 425T467 367Q467 340 455 284T418 159T347 40T241 -11Q177 -11 139 22Q102 54 102 117Q102 148 110 181T151 298Q173 362 173 380Z"></path><g transform="translate(485,0)"><path stroke-width="1" d="M213 578L200 573Q186 568 160 563T102 556H83V602H102Q149 604 189 617T245 641T273 663Q275 666 285 666Q294 666 302 660V361L303 61Q310 54 315 52T339 48T401 46H427V0H416Q395 3 257 3Q121 3 100 0H88V46H114Q136 46 152 46T177 47T193 50T201 52T207 57T213 61V578Z"></path></g></g></svg> meters per jump.</li>
        <li>The second kangaroo starts at location <svg xmlns:xlink="http://www.w3.org/1999/xlink" width="2.492ex" height="2.176ex" style="vertical-align: -0.338ex;" viewBox="0 -791.3 1073 936.9" role="img" focusable="false"><g stroke="currentColor" fill="currentColor" stroke-width="0" transform="matrix(1 0 0 -1 0 0)"><path stroke-width="1" d="M52 289Q59 331 106 386T222 442Q257 442 286 424T329 379Q371 442 430 442Q467 442 494 420T522 361Q522 332 508 314T481 292T458 288Q439 288 427 299T415 328Q415 374 465 391Q454 404 425 404Q412 404 406 402Q368 386 350 336Q290 115 290 78Q290 50 306 38T341 26Q378 26 414 59T463 140Q466 150 469 151T485 153H489Q504 153 504 145Q504 144 502 134Q486 77 440 33T333 -11Q263 -11 227 52Q186 -10 133 -10H127Q78 -10 57 16T35 71Q35 103 54 123T99 143Q142 143 142 101Q142 81 130 66T107 46T94 41L91 40Q91 39 97 36T113 29T132 26Q168 26 194 71Q203 87 217 139T245 247T261 313Q266 340 266 352Q266 380 251 392T217 404Q177 404 142 372T93 290Q91 281 88 280T72 278H58Q52 284 52 289Z"></path><g transform="translate(572,0)"><path stroke-width="1" d="M109 429Q82 429 66 447T50 491Q50 562 103 614T235 666Q326 666 387 610T449 465Q449 422 429 383T381 315T301 241Q265 210 201 149L142 93L218 92Q375 92 385 97Q392 99 409 186V189H449V186Q448 183 436 95T421 3V0H50V19V31Q50 38 56 46T86 81Q115 113 136 137Q145 147 170 174T204 211T233 244T261 278T284 308T305 340T320 369T333 401T340 431T343 464Q343 527 309 573T212 619Q179 619 154 602T119 569T109 550Q109 549 114 549Q132 549 151 535T170 489Q170 464 154 447T109 429Z"></path></g></g></svg> and moves at a rate of <svg xmlns:xlink="http://www.w3.org/1999/xlink" width="2.29ex" height="2.176ex" style="vertical-align: -0.338ex;" viewBox="0 -791.3 986 936.9" role="img" focusable="false"><g stroke="currentColor" fill="currentColor" stroke-width="0" transform="matrix(1 0 0 -1 0 0)"><path stroke-width="1" d="M173 380Q173 405 154 405Q130 405 104 376T61 287Q60 286 59 284T58 281T56 279T53 278T49 278T41 278H27Q21 284 21 287Q21 294 29 316T53 368T97 419T160 441Q202 441 225 417T249 361Q249 344 246 335Q246 329 231 291T200 202T182 113Q182 86 187 69Q200 26 250 26Q287 26 319 60T369 139T398 222T409 277Q409 300 401 317T383 343T365 361T357 383Q357 405 376 424T417 443Q436 443 451 425T467 367Q467 340 455 284T418 159T347 40T241 -11Q177 -11 139 22Q102 54 102 117Q102 148 110 181T151 298Q173 362 173 380Z"></path><g transform="translate(485,0)"><path stroke-width="1" d="M109 429Q82 429 66 447T50 491Q50 562 103 614T235 666Q326 666 387 610T449 465Q449 422 429 383T381 315T301 241Q265 210 201 149L142 93L218 92Q375 92 385 97Q392 99 409 186V189H449V186Q448 183 436 95T421 3V0H50V19V31Q50 38 56 46T86 81Q115 113 136 137Q145 147 170 174T204 211T233 244T261 278T284 308T305 340T320 369T333 401T340 431T343 464Q343 527 309 573T212 619Q179 619 154 602T119 569T109 550Q109 549 114 549Q132 549 151 535T170 489Q170 464 154 447T109 429Z"></path></g></g></svg> meters per jump.</li>
    </ul>

    <p>You have to figure out a way to get both kangaroos at the same location at the same time as part of the show. If it is possible, return YES, otherwise return NO.</p>

    <h3>Function Description</h3>

    <p>Complete the function <code>kangaroo</code> in the editor below. It should return 'YES' if they reach the same position at the same time, or 'NO' if they don't.</p>

    <p><code>kangaroo</code> has the following parameters:</p>
    <ul>
        <li><code>x1</code>, <code>v1</code>: integers, starting position and jump distance for kangaroo 1</li>
        <li><code>x2</code>, <code>v2</code>: integers, starting position and jump distance for kangaroo 2</li>
    </ul>

    <h3>Constraints</h3>
    <ul>
        <li>0 &le; <code>x1</code> &lt; <code>x2</code> &le; 10,000</li>
        <li>1 &le; <code>v1</code> &le; 10,000</li>
        <li>1 &le; <code>v2</code> &le; 10,000</li>
    </ul>
</div>

A bit contrived, but no less a puzzle. Let's see if we can work out a solution in JavaScript, and at the same time develop a standard by which we can evaluate our code.

## *Good* code works.

The minimum requirement for code is that it works. Code that doesn't work certainly can't be called "good."

But what does it mean for code to work? To answer this question I have to have a precise understanding of what it is I want my code to do. I need to have a defined goal. That goal may change over time&mdash;and my definition of "good code" will change along with it.

Thankfully, HackerRank is very clear about what it means for our solution to the Kangaroo Problem to work:

1. Our solution should take the form of a **function** that accepts four parameters called `x1`, `v1`, `x2`, and `v2`.
2. The function should return the string 'YES' if and only if it is possible for the two kangaroos to land in the same spot at the same point in time.
3. The function should return the string 'NO' if it is impossible for them to land in the same spot.

In addition to these goals defined by HackerRank, there is one more particular to our case:

<ol start="4"><li>The function must meet conditions 1-3 for every test case provided by HackerRank.</li></ol>

After all, this is how HackerRank itself determines success. It calls our function on a series of values. If the function returns the right value for each test case, then it deems us successful and awards us a handful of those coveted Hackos.

One approach to the problem is to loop through all the possible kangaroo positions and test whether they are in the same spot at any point. But how many times should we loop? Surely we'll have an answer after 10,000 iterations. (Surely the kangaroos will be tired enough after 10,000 jumps to take a break!)

{%- highlight javascript linenos-%}
function kangaroo(x1, v1, x2, v2) {
    // A 'good' solution
    let result = 'NO';
    for (let i = 0; i < 10000 && result == 'NO'; i++) {
        if (x1 + v1 * i == x2 + v2 * i) {
            result = 'YES';
        }
    }
    return result;
}
{%- endhighlight -%}

Does this code work? Let's check our specs:

<ul class="task-list">
    <li class="task-list-item">
        <span class="checked"></span>
        It's a function.
    </li>
    <li class="task-list-item">
        <span class="checked"></span>
        It returns the string 'YES' if and only if it is possible for the two kangaroos to land in the same spot at the same point in time.
    </li>
    <li class="task-list-item">
        <span class="checked"></span>
        It returns the string 'NO' if they will never, ever land in the same spot.
    </li>
    <li class="task-list-item">
        <span class="checked"></span>
        It satisfies these conditions for every test case provided by HackerRank.
    </li>
</ul>

Yes, we've met all our goals. If we test our function with all of HackerRank's test cases, we succeed every time. According to our definition, we've produced some *good* code.

## *Better* code is easy to interpret.

But what does our function really do? It's probably not too difficult to explain it at the moment, since we just wrote it. It loops 10,000 times, and each time it checks... Wait, what does it check? Inside the loop we have this conditional expression:

{%- highlight javascript -%}
x1 + v1 * i == x2 + v2 * i
{%- endhighlight -%}

If we think for a second, we might be able to remember that this line calculates the current position of each kangaroo as the sum of its initial location plus the product of its jump-size multiplied by the number of jumps it's made at this point. It then compares these calculations together to see if they are in the same location. To us it may be (fairly) clear, but would it be clear to someone else who was reading our code?

And even if it makes perfect sense to us right now, what will we do when we come back to this code in ten weeks or ten days (or ten minutes!) and this line seems a little more obscure?

To me, this is the line between *good* code and *better* code. Good code may work, but better code works in a way that is clear and easy to interpret. Good code may get the job done for *me*, but better code is useful for others as well. (If you're in doubt about the limitations of merely good code, just check out any <a href="https://en.wikipedia.org/wiki/Minification_(programming)" target="_blank" {{ site.ext_link_rel }}>minified</a> JavaScript file.)

Our solution to the Kangaroo Problem is short, but we've already seen how at least one line is pretty hard to read. What can we do to make it clearer?

One option is to add comments that explain the tricky bits, but I have an even better idea.

Wouldn't it be great if we could just replace the complicated `if`-statement with a description, in English, of what condition it's checking? We can do that if we replace the condition with a function call:

{%- highlight javascript linenos-%}
function kangaroo(x1, v1, x2, v2) {
    // A 'better' solution
    
    let kangaroosAreInTheSameSpot = function(jumpNumber) {
        // Calculates the position of the kangaroos after
        // a given number of jumps and tests for equality.
        return (x1 + v1 * jumpNumber == x2 + v2 * jumpNumber);
    }

    let result = 'NO';
    for (let i = 0; i < 10000 && result == 'NO'; i++) {
        if (kangaroosAreInTheSameSpot(i)) {
            result = 'YES';
        }
    }
    return result;
}
{%- endhighlight -%}

All we have done is refactor the logic of the condition into its own function. We gave that function the very descriptive name of `kangaroosAreInTheSameSpot`. The effect is that our `if`-statement reads like natural English.

Just imagine for a moment returning to this code after a year and trying to make sense of it. How much easier will it be to interpret this solution, compared to our first, "good" attempt![^1]

## Can code be *"best"*?

But I think we can do more to improve our merely "good" solution. It contains a loop that runs 10,000 times&mdash;but why 10,000? Why not 100 times, or 1 million? The truth is that we assumed that any kangaroo would be tired out after 10,000 jumps, and so that's how many times we looped. This happened to work for us; all of the HackerRank test cases were successful. But there was nothing in the setup of the problem that told us we would only have to account for 10,000 jumps. What if a super-kangaroo came along that could jump 1&nbsp;million times in a row without breaking a sweat? Our solution might not work.

This leads us to the concept not of "good" code or "better" code, but of the *best* code. For code to be "best" does **not** mean that it can't be improved. All code is the product of a human author and will express the limitations of that author. Pobody's nerfect. Not to mention the fact that the requirements of code may change over time. Since we're evaluating code according to the extent to which it solves a problem, when that problem changes, even the best code must be changed along with it.

So what does it mean for code to be *best*?

## The *best* code is clever.

The best code not only solves the current problem, but attempts to anticipate other problems that are likely to arise. In the case of the Kangaroo Problem, we might imagine a super-kangaroo that can jump more than 10,000 times. How can we improve our solution so that it isn't limited to 10,000 jumps&mdash;or to any arbitrary number of jumps?

When I first encountered this problem, I asked myself how I could break it into smaller pieces that could be solved more easily. For example, I knew that it would be easy to test whether the kangaroos were in the same position at the start, before they had many any jumps, because their starting positions are passed in as parameters.

From there, I realized I could call my `kangaroo` function recursively, updating the values of `x1` and `x2` each time. A recursive solution starts with a "base case" that defines the situation when a solution has been found. The base case is followed by the recursive case, which calls the same function again with different values.

{%- highlight javascript linenos-%}
function kangaroo(x1, v1, x2, v2) {
    // A 'best' solution with recursion
    
    // BASE CASE:
    // If the kangaroos are on the same spot, then we found a solution
    if (x1 == x2) return 'YES';

    // RECURSIVE CASE:
    // Update x1 and x2 and call kangaroo() again.
    x1 += v1;
    x2 += v2;
    return kangaroo(x1, v1, x2, v2);
}
{%- endhighlight -%}

This is a start, but we're not quite there yet. If the kangaroos ever land in the same spot, this solution will find it. But if there is no solution&mdash;if the kangaroos will never, ever land in the same spot&mdash;then our function will keep running forever... or until it overflows the stack. That's not what we want. We need to add a few more base cases to check whether we have enough information to determine that, no, the kangaroos will never land in the same spot.

{%- highlight javascript linenos-%}
function kangaroo(x1, v1, x2, v2) {
    // A 'best' solution with recursion
    
    // BASE CASE 1: Success
    // If the kangaroos are on the same spot, then we found a solution
    if (x1 == x2) return 'YES';

    // BASE CASE 2: Failure
    // If the 1st kangaroo has jumped ahead of the 2nd kangaroo,
    // then they'll never land on the same spot.
    if (x1 > x2) return 'NO';

    // BASE CASE 3: Failure
    // If Kangaroo 2 is going faster than Kangaroo 1,
    // then they'll never land on the same spot.
    if (v2 > v1) return 'NO';

    // BASE CASE 4: Failure
    // If the kangaroos have the same velocity
    // (and they're not on the same spot already)
    // then they'll never land on the same spot.
    if (v1 == v2) return 'NO';

    // RECURSIVE CASE:
    // Update x1 and x2 and call kangaroo() again.
    x1 += v1;
    x2 += v2;
    return kangaroo(x1, v1, x2, v2);
}
{%- endhighlight -%}

There are three situations that indicate, at any point, that the kangaroos will never land in the same spot. First, since the problem setup says Kangaroo 2 always starts out ahead of Kangaroo 1, we know that they should stay that way until they land in the same spot (if they ever do). If Kangaroo 1 is ever ahead of Kangaroo 2, then it's jumped *over* her buddy, who will never catch up to her.

Second, if the 2nd kangaroo is moving faster than the first, then the first will never be able to catch up to her, and they'll never land together.

Third, if the kangaroos are jumping at the same velocity, they'll always be moving in parallel and will never intersect.

The strength of this solution is its **cleverness**. It employed a technique (recursion) that transformed it from a **particular** solution (limited to 10,000 jumps) to a **general** solution (theoretically unlimited).

That's what I mean by *clever*. A clever solution leverages the inherent strength of our computer's processor to perform a feat that would be much too difficult for any human. Making someone solve this problem by hand using recursion would probably violate the Geneva Convention. It would drive anyone insane. But our processor is actually very good at this sort of task and doesn't shy away from finite recursion. Asking the code to do something that it's very good at doing is what makes this a *clever* solution.

## The *best* code is simple.

I am not afraid to admit that I like to be clever. 😉 And here is where I describe the most important lesson I learned from the Kangaroo Problem. The best code may be clever, but the best code is also simple.

When I told my husband about my clever solution to the Kangaroo Problem, he blinked once, grabbed a stack of Post-It notes, and began scribbling. A minute later he showed me his solution&mdash;consisting of just one `if`-`else`-statement. No recursion. Not even a loop.

Sheepishly, I typed it into HackerRank and ran the tests. They all checked out. He had instantly replaced my 28-line solution, which had a <a href="https://en.wikipedia.org/wiki/Big_O_notation" target="_blank" {{ site.ext_link_rel }}>complexity</a> of *O(n)*, with one smaller by a factor of 4 with a complexity of *O(1)*. The booger.

Here is what he wrote:

{%- highlight javascript linenos-%}
function kangaroo(x1, v1, x2, v2) {    
    if (v1 < v2 || (x2 - x1) % (v1 - v2) !== 0) {
        return 'NO';
    } else {
        return 'YES';
    }
}
{%- endhighlight -%}

He explained that the straightforward solution to the problem is to use a system of equations. We know that the position of the first kangaroo is equal to `x1 + v1 * n`, where `n` is the number of jumps it has made. Similarly, the position of the second kangaroo is equal to `x2 + v2 * n`. If we set these expressions equal to one another, we can not only determine *whether* they will intersect, but *when* and *at what location*. So let's do some algebra:

1. `x1 + v1 * n = x2 + v2 * n` (Set the expressions equal to each other.)
2. `(v1 * n) - (v2 * n) = x2 - x1` (Move the `n` terms to the same side.)
3. `n * (v1 - v2) = x2 - x1` (Factor out the `n` terms.)
4. `n = (x2 - x1) / (v1 - v2)` (Divide each side by `v1 - v2`.)

As long as `n` is a **positive integer**, then we know right off the bat that the kangaroos will land in the same spot at some point. `n` is positive as long as `v1 < v2`. That's what the first logical condition in the `if`-statement above is checking. If `v1 < v2`, then we can return 'NO'.

The second logical condition is checking that `n` evaluates to an integer. After all, it doesn't make much sense to talk about the kangaroos being in the same spot after 1.37 jumps, right? It only works if they intersect at a whole number value of `n`. So if `(x2 - x2)` divides into `(v1 - v2)` with a remainder other than zero, then we should return 'NO'.

Otherwise, `n` evaluates to a positive integer, so the answer is 'YES'. The kangaroos will intersect.

## Balancing the bests

Ultimately, code is "good enough" if it accomplishes the desired goal, regardless of how it does that. But "good enough" code isn't exactly code I'd be eager to Slack to my friends or post to my blog. 😉 Better code accomplishes the desired goal in a way that is easy to interpret, so that others can understand what it is doing and how it is doing it&mdash;and so that I'm not left scratching my head when I return to it after a while.

But writing the best code requires a balance between simple and clever. Our first solution to the Kangaroo Problem was simple; all it did was loop 10,000 times. But it wasn't clever enough to handle other likely situations, such as a super-kangaroo that can jump 1 million times. Our final solution strikes a balance between clever and simple. It's clever enough to work for any number of jumps, but it's so simple that it doesn't even use a loop.

Striking that balance is what's going to be the challenge for me. But at least now I'll always know exactly where my kangaroos are...

[^1]: Of course, just because I have a function called `kangaroosAreInTheSamePlace` doesn't mean that it *actually* checks whether the kangaroos are in the same spot. But that does at least make it clear that this was my *intention* and that's what the `if`-statement is *supposed* to be doing.
