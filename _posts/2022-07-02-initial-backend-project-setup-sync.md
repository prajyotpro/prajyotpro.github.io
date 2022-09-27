---
id: 284
title: 'Initial Backend Project Setup Sync'
date: '2022-07-02T17:03:06+00:00'
author: 'Prajyot Khandeparkar'
layout: post
guid: 'https://www.prajyotkhandeparkar.com/?p=284'
permalink: /initial-backend-project-setup-sync/
blogcraft_post_sidebar_option:
    - global-sidebar
twp_disable_ajax_load_next_post:
    - global-layout
wpdiscuz_post_rating:
    - '4.5'
wpdiscuz_post_rating_count:
    - '2'
image: /wp-content/uploads/2022/07/pexels-kevin-ku-5775851.jpg
categories:
    - Code
    - Work
tags:
    - DevOps
    - Docker
    - Work
---

<span class="rt-reading-time" style="display: block;"><span class="rt-label rt-prefix"></span> <span class="rt-time">3</span> <span class="rt-label rt-postfix">min read</span></span>### Intro

A very simple topic to discuss yet an important must-have implementation.

Have you set up your project on a LAMP stack, node.js, Rails OR Django? Is your project using multiple services for data storage and processing? Have you noticed the version of the service integrated into the project OR the operating system your project is running on?

In this post topic, we will briefly discuss why a good environment setup is important and what are the possible tools to maintain one.

### Why is that important?

Let’s walk through a scenario. A developer has a machine which is running Ubuntu 16 operating system. It\* *(a developer)* installs apache2 on the system to run a PHP Laravel project. Installs database server MySQL &amp; caching server Redis.

It\* initiates the development process of the project requirements, he is able to complete the development work and now is the time to deploy the app.

It\* spins up a new instance on AWS, elastic-cache and RDS for required data stores.

What happens next?

### Problem Statement

While the service versions went unnoticed here is what it might look like:

![](https://lh3.googleusercontent.com/HeNgt-HUL0CQZCBDDm2Vn-3EJ6XhsJGPSwlo_uSr8JTCICXzxSmkE1jXTPo-Wsb5kSDMhJnd00B9nkazEfcvqVTZ0--gww-Iry1QKId9-7X_RhyzHs9PNBmZ9r-r8fbprVB19aCrdMk9OnlNSg)

We can clearly see there are conflicts between the version of different platforms and services used in both of these environments.

What can happen in such scenarios? Endless possibilities of issues in a long run, we know that in the world of software development there are always some maintainance, optimizations, bug fixes and planned releases for upgrades and deprecations.

I can list down a few possibilities from my past experiences here:

- A Laravel package which does not meet the production PHP version requirement.
- A Laravel package which does not meet the production MySQL OR Redis server-client requirement.
- The untracked package is deprecated and is unable to install for production deployment.
- Composer installation might fault due to version compatibility.
- Production downtime / page error.
- Hard to debug at the time of deployment what went wrong in the production environment which cannot be replicated in the local development environment.

**What can be the solution to these problems?**

If we can understand the cause of the issue on production and are able to debug it in the local development environment, will that be a good debug scenario? But the production application might face downtime. We also are aware of the statement **“Precaution is better than cure”**.

### Solution with a precaution

How can we have a better sync between all environments which can improve known issues prior to release OR easy to debug on all environment scenarios. Let’s list down a few of the solutions which we have in place.

**Docker:**

Docker takes away repetitive, mundane configuration tasks and is used throughout the development lifecycle for fast, easy and portable application development – desktop and cloud. Docker’s comprehensive end-to-end platform includes UIs, CLIs, APIs and security that are engineered to work together across the entire application delivery lifecycle. It is quick and easy to set up.

<figure class="wp-block-embed is-type-wp-embed is-provider-docker wp-block-embed-docker"><div class="wp-block-embed__wrapper">> [Home](https://www.docker.com/)

<iframe class="wp-embedded-content" data-secret="xHfkBqKkxH" frameborder="0" height="338" marginheight="0" marginwidth="0" sandbox="allow-scripts" scrolling="no" security="restricted" src="https://www.docker.com/embed/#?secret=MXRKxPKgkf#?secret=xHfkBqKkxH" style="position: absolute; clip: rect(1px, 1px, 1px, 1px);" title="“Home” — Docker" width="600"></iframe></div></figure>**Vagrant:**

Vagrant provides the same, easy workflow regardless of your role as a developer, operator, or designer. It leverages a declarative configuration file which describes all your software requirements, packages, operating system configuration, users, and more.

<figure class="wp-block-embed"><div class="wp-block-embed__wrapper">https://www.vagrantup.com/ </div></figure>Let’s discuss more on this in detail on setup and cloud deployments in my new post. Stay tuned.

Please feel free to leave a comment OR feedback in the comment section OR email to know more.