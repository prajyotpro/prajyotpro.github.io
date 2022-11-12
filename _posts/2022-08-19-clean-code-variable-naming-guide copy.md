---
id: 303
title: 'Clean Code: Variable Naming Guide'
date: '2022-08-19T13:49:39+00:00'
author: 'Prajyot Khandeparkar'
layout: post
guid: 'https://www.prajyotkhandeparkar.com/?p=303'
permalink: /clean-code-variable-naming-guide/
blogcraft_post_sidebar_option:
    - global-sidebar
twp_disable_ajax_load_next_post:
    - global-layout
image: /wp-content/uploads/2022/08/pexels-markus-spiske-2004161.jpg
categories:
    - Code
tags:
    - Code
    - Work
---

<span class="rt-reading-time" style="display: block;"><span class="rt-label rt-prefix"></span> <span class="rt-time">3</span> <span class="rt-label rt-postfix">min read</span></span>*Why my code review fails even if my program works fine? I have learnt so many programming languages, frameworks and executions but was not able to get approval in the code review process.*

*Am I missing something in my code/reviews?*

Something you should seek to find an answer in the code review itself.

This post takes us back to our roots, and I will focus on the most basic mistakes developers make when they write code. Understanding to write clean code comes with time and I totally understand this has been in education right from the start.

I know a lot of developers adapt to learning programming languages and start implementing the project right away. But it is equally important to understand and write clean code. In this post, I will explain a very basic of how and why you need to have a good variable naming.

## Common Naming Conventions

Re-visit your old-school coding lessons. Let’s begin with common variable naming conventions. It is a standard of using these 4 mainly used naming conventions.

#### snake\_case

Is mainly used in programming languages like Python to define variables, functions, and methods, we have also seen snake\_case in PHP as well. For example:

`first_name, last_name, is_valid, get_user_by_id(user_id), array_merge().`

### camelCase

This has been used in most of the popular programming languages, namely Java, Javascript, and Typescript to define variables, functions, and methods. It requires the first letter to be lowercase, with the first letter being uppercase of every new word compounded together. For example:

`firstName, lastName, isValid, getUserById(userId), arrayMerge()`

### PascalCase

This is a common practice to name a class in almost all programming languages. It requires the first letter to be uppercase, along with the first letter of every new word compounded together. For example:

`Customer, Role, CustomerModule`

### kebab-case

Mainly used as a standard in HTML and some other markdown languages.

## Variable Naming

**What are variables?** We understand that variables are names given to computer memory locations in order to access the data throughout the program.

In this section, let’s try to understand how to refactor a badly named variable name.

Consider you are fetching information of a user from the `users` table.

`let u = User.getUserById(id)<br></br>let data = User.getUserById(id)<br></br>let userData = User.getUserById(id)<br></br>let userArray = User.find() `

Why above examples are bad variable names? Let’s find out:

Variable name `u` and `data` can be anything, when you move down to wring more code in the function we will never realise what `u` and `data` stand for, will you?

On the other hand, `userData` is a bit more than required – we understand we are storing obvious data/objects related to a user. It is always a good practice to name it to easily understand what is the object.

For example:

`let user = User.getUserById(userId) // single user object<br></br>OR<br></br>let users = User.find() // array of users`

### Boolean

Similar to the above there are scenarios you will need to save a boolean data type. Consider fetching information of a user which is valid OR admin

`let v`

`let val`

`let valid`

`let a`

`let admin`

Why above examples are bad variable names? Let’s find out

The variable name `v, val, valid, a, admin` can be anything. admin can also store an `user` object or admin object, how does it explain it is a boolean(true/false)?

We can always make use of `is` prefix to make sure it is a boolean type, this makes it more descriptive.

For example:  
`let isValidUser`

`let isAdmin`

### Constant

It is advisable to keep a constant name with all capital `SNAKE_CASE`, the reason is that a constant has to be unique and it can never be overridden by any other value. It is very easy to identify and reuse anywhere in the function.

For example

`CUSTOMER_FEED_NAME, PAGE_LIST_LIMIT`

### Recommendations

For consistency and scalable prospects of the project, It is always good to work with your team lead or team to understand what standards have been followed in the project and how you can improve on it with pipelines.