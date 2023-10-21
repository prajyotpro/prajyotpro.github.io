---
layout: post
title:  "Git: Why do we need a pull request template?"
author: 'Prajyot Khandeparkar'
---


### Why do we need a pull request template?
The question of whether or not a pull request template is necessary is a frequent topic of discussion among developers. Let's explore the potential benefits of a well-structured pull request template in terms of streamlining the process and enhancing team collaboration.


### Relying solely on ticket links for pull request descriptions
Some developers advocate for using ticket links as the sole source of information for pull request descriptions. However, this approach has limitations.

After discussing this matter with my development team, we concluded that merely providing a ticket link as a reference for the pull request may not provide reviewers with sufficient information to effectively review the code.

While tickets can track progress and provide a general overview of features or issues, they often lack the specific context that reviewers need when examining code. Additionally, ticket information may not always be up-to-date.

### The significance of a template
A pull request with numerous file changes and a vague title can leave reviewers confused about the purpose of the request. Imagine reviewing a pull request that modifies five files and has the description "bugfix."

Would this provide enough context for a thorough review? Such situations often raise questions about why the author didn't take the time to provide a more detailed description.

Reviewers typically seek answers to questions such as:
- What is the purpose of this pull request?
- Why was this pull request created?
- How does this pull request improve or debug the application?


### The pull request template
The primary goal of a pull request template is to streamline the review process, providing reviewers with a clear and concise overview of the changes being proposed. Additionally, it serves as a helpful reminder for the author to include all relevant information.

Beyond Ticket Links: Enhancing the Pull Request Description

While including a ticket link for reference is a good starting point, it's essential to go beyond that and provide a detailed pull request description. This description should not simply replicate the ticket description but should specifically address the code changes being introduced.

```Ticket: <#ticket_url>```

The pull request description should provide a comprehensive summary of the code changes, including the motivation behind the changes, related issues, and any dependencies involved. This additional context helps reviewers quickly grasp the purpose and scope of the pull request.


```
# Description

Please include a summary of the change and which issue is fixed. Please also include relevant motivation and context. List any dependencies that are required for this change.
```
Categorizing the Type of Change

Clearly indicating the type of change being introduced, whether it's a bug fix, feature addition, or refactoring, can significantly improve the reviewer's understanding and streamline the review process.

```
## Type of change

Please delete options that are not relevant.

- [ ] Bug fix (non-breaking change which fixes an issue)
- [ ] New feature (non-breaking change which adds functionality)
- [ ] Breaking change (fix or feature that would cause existing functionality to not work as expected)
- [ ] This change requires a documentation update
```

Demonstrating Stability through Testing


Ensuring that code changes don't introduce regressions is crucial. To provide confidence in the stability of the changes, authors should include test cases and, if applicable, screenshots or videos demonstrating the successful execution of tests and the achievement of expected outcomes.



```
# How Has This Been Tested?

Please describe the tests that you ran to verify your changes. Provide instructions so we can reproduce. Please also list any relevant details for your test configuration

- [ ] Test A
- [ ] Test B

**Test Configuration**:
* Firmware version:
* Hardware:
* Toolchain:
* SDK:
```


Standards Checklist

Incorporating a checklist that ensures adherence to coding standards is a valuable addition to the pull request template. While CI pipelines can enforce these standards, having a checklist serves as a reminder for the author and reinforces the importance of maintaining consistent code quality.

```
# Checklist:

- [ ] My code follows the style guidelines of this project
- [ ] I have performed a self-review of my own code
- [ ] I have commented my code, particularly in hard-to-understand areas
- [ ] I have made corresponding changes to the documentation
- [ ] My changes generate no new warnings
- [ ] I have added tests that prove my fix is effective or that my feature works
- [ ] New and existing unit tests pass locally with my changes
- [ ] Any dependent changes have been merged and published in downstream modules
```


By incorporating these elements into a pull request template, teams can promote effective communication, streamline the review process, and maintain high-quality code standards.


### Guide: How to set up a pull request template for your repository services.
Github: [https://docs.github.com/en/communities/using-templates-to-encourage-useful-issues-and-pull-requests/creating-a-pull-request-template-for-your-repository](https://docs.github.com/en/communities/using-templates-to-encourage-useful-issues-and-pull-requests/creating-a-pull-request-template-for-your-repository)

Bitbucket: [https://docs.github.com/en/communities/using-templates-to-encourage-useful-issues-and-pull-requests/creating-a-pull-request-template-for-your-repository](https://docs.github.com/en/communities/using-templates-to-encourage-useful-issues-and-pull-requests/creating-a-pull-request-template-for-your-repository)

Gitlab: [https://docs.gitlab.com/ee/user/project/description_templates.html](https://docs.gitlab.com/ee/user/project/description_templates.html)


Here are a few more decent pull request templates which you can pick for your team: [https://github.com/axolo-co/developer-resources/tree/main/pull-request-templates](https://github.com/axolo-co/developer-resources/tree/main/pull-request-templates)