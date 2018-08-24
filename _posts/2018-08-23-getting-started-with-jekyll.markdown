---
title: Getting Started with Jekyll
layout: post
date: 2018-08-23 21:09:49
categories: Jekyll
excerpt: "The three things I wish I had known before I jumped on Jekyll"
---

This site uses [Jekyll](https://jekyllrb.com/), the popular[^1] [Ruby gem](https://guides.rubygems.org/rubygems-basics/) that makes it easy to build and maintain a website&mdash;provided that website consists of static, "flat" pages only. If your site needs to connect to a database or relies on other server-side scripting, then Jekyll isn't going to do the job.

But this limitation is counterbalanced by Jekyll's many advantages. Setup, for example, is simple, requiring just a few commands. For that matter, so is deployment&mdash;especially if your host is [GitHub Pages](https://pages.github.com/) (which, by the way, is powered *itself* by Jekyll). But most of all, since Jekyll handles all the details (you don't really even need to know HTML, for goshsakes) this leaves you free to focus on the reason you wanted to create a website in the first place: to create quality content.[^2]

So there's no wonder why Jekyll is so popular, and if you're new to Jekyll but already excited to launch your first Jekyll-powered website, then, well, you know how I was feeling just a few days ago. So allow me to give you a few pointers as you get started. What follows are the three things I wish I had known before I started working with Jekyll.

## 1.&nbsp;&nbsp;If you are new to Ruby or RubyGems, do a little research.

Jekyll is written in the Ruby programming language, and even though you won't use any Ruby to build your website with Jekyll, a familiarity with Ruby *will* help you install it. The front page of the [Jekyll website](https://jekyllrb.com/) currently says you can "get up and running *in seconds*", but that makes a few assumptions. (And in my case, a few assumptions too many!)

First, you need Ruby on your system&mdash;specifically, (as of this writing) version 2.2.5. Run `ruby -v` to see which version of Ruby you have installed, if any. If necessary, [download and install Ruby](https://www.ruby-lang.org/en/downloads/).

But you're not done yet. Jekyll certainly isn't the only application written in Ruby. In fact, Jekyll makes use of a number of *other* Ruby programs (cleverly called "gems") to do its magic. But don't worry; you don't have to install them one-by-one. You'll use the `gem` command to install Jekyll **as well as** the other gems on which it depends. Run `gem -v` to check if you have RubyGems installed. If not, [download it](https://rubygems.org/pages/download).

Finally you are ready to install Jekyll:

`gem install bundler jekyll`

This command will actually install Jekyll **as well as** a second gem called [Bundler](https://bundler.io/), which ensures that the correct versions of all the gems Jekyll needs will be installed as well.

Once Jekyll is installed, the only thing left to do is create your website by running `jekyll new my_website`, where, of course, `my_website` is the name of the directory where your website will be.

## 2.&nbsp;&nbsp;There are gazillions of Jekyll themes available. Don't bother with them. (At least, not yet.)

The glory of Jekyll is that you don't have to manually code each HTML page in your website. Jekyll does it for you. All you have to do is provide the content. Jekyll places this content in an appropriate **layout** and formats it according to the **theme** active on your site. By default, Jekyll installs the [**Minima**](https://github.com/jekyll/minima) theme, but there are dozens more. 

As critical as it may seem to pick out the most "uniquely-you" theme for your website, I advise against it. When you create a new site and Jekyll installs the default theme Minima, it does a lot of work setting up the layouts and configuring your site to work with that theme. Minima comes with three layouts: post, page, and home. (Admittedly, there is a fourth, called default, but it just serves as a wrapper around the other three.) That means all you have to do when you create a new page or blog post is set the appropriate layout in that page's front matter[^3].

The same cannot be said of all the other themes available for download. Some may only define one layout (maybe called "default"), and if that's the case, then you'll have a lot more work to do to make the different pages of your website show up the way you want them.

Does that mean you're stuck with Minima? Quite the opposite. Minima is a simple theme, but it is very flexible and [easily customizable](https://jekyllrb.com/docs/themes/#overriding-theme-defaults). Really, you can make Minima look like however you want.

But whatever you do, don't try to switch themes after you've gotten started building your website. Take my word on that. &#x1F609;

## 3.&nbsp;&nbsp;Don't miss the trees for the forest.
My last tip is simple. Jekyll works so well and is so magical to use that it's easy to become distracted by its workings. (I've spent far too much time today tweaking configuration variables and adjusting CSS!) If you're anything like me, it's almost more fun to set up a website than it is to write blog posts. But Jekyll does what most technologies promise and disappointingly few actually deliver: It gets out of the way. Let it. Let Jekyll do its magic in the background. Focus yourself on what inspired you to make a website in the first place.

## Learn more

To learn more about getting started with Jekyll, check out these resources:

- [Jekyll support docs](https://jekyllrb.com/docs/home/)
- [Giraffe Academy's Jekyll tutorials](https://www.mikedane.com/static-site-generators/jekyll/) &mdash; A fantastic series of quick videos that'll get you moving with Jekyll in no time
- [Alternate Jekyll themes](https://rubygems.org/search?utf8=%E2%9C%93&query=jekyll-theme) &mdash; Use with caution!
- [Troubleshooting Jekyll problems](https://jekyllrb.com/docs/troubleshooting/)
- [Jekyll Talk](https://talk.jekyllrb.com/) &mdash; The Jekyll community wiki

[^1]: Netlify listed Jekyll as the [#1 static site generator of 2017](https://www.netlify.com/blog/2017/05/25/top-ten-static-site-generators-of-2017/).
[^2]: See [the Jekyll philosphy](https://jekyllrb.com/philosophy).
[^3]: [Learn more about front matter.](https://jekyllrb.com/docs/frontmatter/)
