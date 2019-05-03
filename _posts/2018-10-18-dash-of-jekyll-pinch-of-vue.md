---
title: A Dash of Jekyll, A Pinch of Vue
layout: post
date: 2018-10-22 9:36
categories:
    - Jekyll
    - Vue.js
excerpt: "Is it possible to incorporate Vue.js into a site built with Jekyll? You betcha! But watch out for a few sticky wickets..."
image: assets/img/2018-10-22-vue-jekyll.png
---

[Jekyll](https://jekyllrb.com/) [makes it easy](https://jekyllrb.com/docs/collections/) to list out, say, all of the projects I have in my portfolio. But since each project takes up quite a bit of space, I wanted to find a way to display one at a time, with "next" and "previous" buttons for pagination. Something like this:

![Portfolio Page Mock-up]({{ "/assets/img/portfolio-page.png" | relative_url }})

I was able to achieve this with [Vue.js](https://vuejs.org/), but not without a few sticky wickets.

## Problem: Where do I load Vue?

The first problem was how exactly to bring Vue into the site. I figured it would be easiest to link to it on a CDN. But Jekyll uses includes and layouts to build the HTML of each web page. Where in all this patchwork should the link go?

I build the basic HTML structure of each page in a "default" layout. This is where the opening and closing `<body>` tags are. At first, I placed Vue there, right above the closing `</body>` tag:

{%- highlight html -%}
<!-- layout: default.html -->
<!-- ... -->
    <script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
</body>
</html>
{%- endhighlight -%}

This successfully brought Vue into the website, but it raised other problems. First, it's a little excessive. I don't really need Vue to load for every page on my site; I only want it on my portfolio page. (At least for right now.) Second, the JavaScript file where I define my Vue instance must load after Vue. So where am I going to place that `<script>` tag? Again, if I place it in my default layout, the script will load for every page of the site. It won't be a large file, but there's no reason to load a resource the page doesn't need.

### Solution

I ended up creating a new "portfolio" layout that itself uses the default. I changed my portfolio page to use this new layout, and at the very end of it is where I linked both to Vue and to my local script. Now I'm loading these resources for the page that needs them, but not for the pages that don't.

## Problem: How do I move data from Jekyll into Vue?

Jekyll is great for keeping track of all the data in my website&mdash;without actually needing a database. Vue is also superb at handling data and keeping the DOM in sync with that data. But how can I get Jekyll to send data to a Vue instance?

In the case of my portfolio project, I use liquid tags to iterate through an array of projects, like this:

{%- highlight liquid -%}
{% raw %}

{%- for project in site.projects -%}
    <h1>{{ project.title }}</h1>
    <p>{{ project.description }}</p>
{%- endfor -%}

{% endraw %}
{%- endhighlight -%}

This results in enough HTML to display each project:

{%- highlight html -%}
<h1>Tic-Tac-Toe</h1>
<p>A two-player tic-tac-toe game</p>

<h1>Contact Manager</h1>
<p>A simple contact manager</p>

<h1>JavaScript Calculator</h1>
<p>A deceptively simple JavaScript calculator</p>
{%- endhighlight -%}

This is great if I want to show all of my project on one page, but I want to show only one. Vue can turn different elements "on" and "off" with ease, but it does this through the use of its own internal data structure. How can I move the content Jekyll prints to HTML into my Vue instance?

### Solution: Components

I created a two Vue components called  `project-collection` and `project-card`. The `project-collection` rendered my "previous" and "next" buttons and included a slot for a single project card. Crucially, I included a `projectCount` prop in the `project-collection` component so that I could keep track of how many projects I am displaying in the collection, and so, when I should have the "previous" and "next" buttons enabled/disabled.

The `project-card` component represented a single project in my portfolio, and the template included all the HTML to render that project on the page. Using liquid's iteration syntax, I looped through the projects on my site, and for each one I printed a `project-card` component. I passed all the project data into the component either through props or by filling slots in the template.

## Problem: Too many mustaches!

In the process of creating these Vue components, I realized that both Jekyll (which uses the [liquid](https://shopify.github.io/liquid/) templating language) and Vue use double curly brackets (`{% raw %}{{ }}{% endraw %}`) in their templates. This was gonna get really confusing, really fast.

### Solution: Declare different delimiters
Luckily, I learned that I could use other delimiters in Vue, simply by declaring them in the component:

{%- highlight javascript -%}
Vue.component('project-collection', {

    delimiters: ["((", "))"],

    // ...
{%- endhighlight -%}

I chose double parentheses, and problem solved!

## Problem: How do I get my components to speak to each other?

At this point, I had managed to use Jekyll to move data from my site into Vue. I had created components that displayed each project, and I had a little logic to display *only* the current project, with "previous" and "next" buttons to change the current project. There was just one problem: The buttons didn't work.

The buttons were part of the `project-collection` component, but my projects were each in their own `project-card` component. Somehow I needed to get these components to talk to each other, so that when I click on a button in the `project-collection`, it changes something in the `project-card`s.

### Solution: Events on the bus go 'round and 'round...

Vue makes it easy for components to emit and listen for various events&mdash;both the standard events like "click" as well as custom events. It wouldn't be hard for me to emit an event on the parent `project-collection` component and to have all the children `project-card` components listen for that event. But I figured that later I might have other components on this page that are not in a parent-child relationship with these and so wouldn't be able to listen for their events directly.

So I decided to set up an event "bus" in the global scope, from which all relevent events would be emitted, and on which all events would be handled. It took the form of a Vue instance that I saved to a global variable, like this:

{%- highlight javascript -%}
window.Event = new Vue();
{%- endhighlight -%}

Next, when the user clicked a "previous" or "next" button, I emitted an event on this event bus:

{%- highlight javascript -%}
broadcastProject: function() {
    Event.$emit('display-project', { project: this.project });
}
{%- endhighlight -%}

And on all my components I set up an event listener inside the `created` event hook:

{%- highlight javascript -%}
created: function() {
    let vm = this;
    Event.$on('display-project', function(event) {
        vm.isSelected = (event.project == vm.project);
    });
}
{%- endhighlight -%}

Now my components could talk to each other, and the "previous" and "next" buttons could affect the `project-card` components.

## A dash and a pinch

On their own, both Jekyll and Vue are great, but together they really sweeten the pot!
