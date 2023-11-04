---
layout: post
title:  "Git: The Ideal Pull Request?"
author: 'Prajyot Khandeparkar'
---


### The Ideal Pull Request?

Do you have pull requests that are rejected or never get reviewed on time? Maybe you're the developer who's assigned to review pull requests, but you don't put some time and efforts to review it. 
Whatever the case, it's a problem.

Is this concerning? Let's talk about a few factors that can delay or reject pull requests.
 1. The pull request doesn't have enough information to understand what it's doing or why.
 2. The code doesn't work the way it's supposed to.
 3. The pull request has too many comments, which can be overwhelming and make it hard to review the code.
 4. The pull request is too big to review effectively.
 5. Developers don't have enough time to review new pull requests.

</br>
<img src="../wp-content/uploads/2023/pexels-olia-danilevich-4974915.jpg" /> </br></br>



Let's discuss how we solved the above problems with the help of following pointers.


### Task / Ticket

In large managed projects, it's important to have a ticket assigned to you for any development initiative. This is the first step in starting your code, but do you have enough context in the ticket to begin?


Here is a quick look at a ticket checklist for software development lifecycle (SDLC):

 1. **Description:** The project manager usually updates this with the information you need to start working on the ticket.
 2. **Technical description:** The senior developer or team lead adds this section. It includes a detailed walkthrough of how to implement the feature or fix the issue.
 3. **UML links:** This is a graphical representation of the design, which may be helpful for reference.
 4. **User acceptance criteria (UAC):** This section describes the expected outcome of the feature or issue.
 5. **Reference to any documentation or API specifications:** This section provides any additional information that is needed to complete the UAC.
 6. **Test ticket:** This section provides details about the testing scenarios, unit tests, and regression tests that need to be performed.


</br>
<img src="../wp-content/uploads/2023/pexels-olia-danilevich-4974920.jpg" /> </br></br>


### Discussing and planning ahead of code

Discussing and planning ahead of coding are essential for building an optimal project. Let's consider a ticket or task that you have been assigned. There are many implementation scenarios that you may need to discuss with your team, such as:

 - **Breaking down the ticket into multiple achievable feature development sub-tickets.** This will make the pull request more concise and easier to review.
 - **Discussing in depth the implementation code structuring and design.** This will help to ensure that the code is well-organized, easy to maintain, and scalable.
 - **Working with your team using extreme programming (XP), pair programming, or even a quick sync-up meeting.** This will help to promote collaboration, shared understanding, and better decision-making.


### Single responsibility principle (SRP)

According to the SOLID principles, we can apply the concepts of cohesion and separation of concerns to our pull requests. This means that each pull request should have a single objective, making it more focused and easier to review.


### Pull request templating

A pull request with numerous file changes and a vague title can leave reviewers confused about the purpose of the request. Imagine reviewing a pull request that modifies five files and has the description “bugfix.”
Would this provide enough context for a thorough review? Such situations often raise questions about why the author didn’t take the time to provide a more detailed description.
Review my preview post on how a  pull request template can help you be more effecient in the process: https://www.prajyotkhandeparkar.com/2023/10/19/why-do-we-need-a-pull-request-template.html



### Continuous integration

You may be wondering why I have added a CI point to this pull request. Here are a few ways to reduce development errors with the help of CI:

 - Basic code quality scans, such as linting, can help to make code builds much cleaner.
 - Adding checks to identify failed test cases at the time of pull request creation.
 - Tools such as SonarCube and other AI-powered tools can help you to identify code improvements and security hotspots quickly.


This would significantly automate the pull request process before a developer is even involved in reviewing the code, saving a lot of developer time.


I agree that the pointers I shared are not applicable in all domain scenarios. For example, some domains, such as healthcare or finance, have stricter regulatory requirements that may limit the use of CI/CD pipelines. Additionally, some domains, such as research or academia, may have more complex workflows that are not well-suited to automation.


However, I believe that the pointers I shared are still relevant to a wide range of domain scenarios. CI/CD can be a valuable tool for reducing development errors and improving the quality of software releases, regardless of the domain.

