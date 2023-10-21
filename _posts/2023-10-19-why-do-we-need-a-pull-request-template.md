---
layout: post
title:  "Git: Why do we need a pull request template?"
author: 'Prajyot Khandeparkar'
---


### Why do we need a pull request template?
This question is always up for debate between developers. Do you think a good pull request description can provide meaning to a pull request? Let us find out if a good pull request template can help speed up the process and benefit the team


### Using ticket link as the only reference point for the pull request description
When it comes to pull request template/description few developers will always make a point of using the ticket link as the pull request reference point to its description. 


I have been discussing this point with my development team and came to the conclusion that just using a reference link of a ticket to the pull request might not help the reviewers with all the information required to review the code.

A ticket can help you to keep track of the progress and will contain the feature/issue description. However, it lacks the context a developer would seek while reviewing the code. Eventually, at times, the ticket might not be updated.


### Importance of a template
A pull request with several file changes and a  sparse pull request title will not make us understand what is going on with the pull request. For example, let's consider you are reviewing a pull request which consists of changes in 5 files and a description with “bugfix”.

Would it provide you with enough context to review the pull request? It will always make you question why the author did not take some time to add a decent description in the pull request.

You would seek a few questions which would get you an answer for 
- What is the pull request about
- Why is it created
- How would it help improve/debug the application


### The pull request template
The end goal is always to reduce the efforts of a reviewer and provide the best code review experience. It can also benefit as a memory aid for the author.

A minimum the author can do is to have a ticket link for reference, but as we had discussed earlier this will not help the reviewer much.

```Ticket: <#ticket_url>```

Next can be the pull request description, you would ask if we have a description for the ticket then why do we re-write a description in the pull request?

Well, the pull request description should give a detailed summary of what code changes you are making with the pull request.

It can consist of related issues and motivation, which would answer why it was created. It can also include information about the dependencies.

```
# Description

Please include a summary of the change and which issue is fixed. Please also include relevant motivation and context. List any dependencies that are required for this change.
```

Do you think it would be easier and much quicker to understand what type of pull request you are reviewing? Adding information on the type of change adds much more value to a pull request.

```
## Type of change

Please delete options that are not relevant.

- [ ] Bug fix (non-breaking change which fixes an issue)
- [ ] New feature (non-breaking change which adds functionality)
- [ ] Breaking change (fix or feature that would cause existing functionality to not work as expected)
- [ ] This change requires a documentation update
```

One of the most important factors to consider for any code change is that it should not break the application. How can we know it? Can the author add test cases and a few image/video  attachments of the overall tests covered so that it meet the expected stable outcomes?

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

Last but not least, a checklist that the code will be as standardized as required. Even though we can have this in the CI pipelines as well. But it is always good practice for improving the team.

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


### Guide: How to set up a pull request template for your repository services.
Github: [https://docs.github.com/en/communities/using-templates-to-encourage-useful-issues-and-pull-requests/creating-a-pull-request-template-for-your-repository](https://docs.github.com/en/communities/using-templates-to-encourage-useful-issues-and-pull-requests/creating-a-pull-request-template-for-your-repository)

Bitbucket: [https://docs.github.com/en/communities/using-templates-to-encourage-useful-issues-and-pull-requests/creating-a-pull-request-template-for-your-repository](https://docs.github.com/en/communities/using-templates-to-encourage-useful-issues-and-pull-requests/creating-a-pull-request-template-for-your-repository)

Gitlab: [https://docs.gitlab.com/ee/user/project/description_templates.html](https://docs.gitlab.com/ee/user/project/description_templates.html)



That should do a decent trick to create a good pull request for your team. What do you think about it?



Here are a few more decent pull request templates which you can pick for your team: [https://github.com/axolo-co/developer-resources/tree/main/pull-request-templates](https://github.com/axolo-co/developer-resources/tree/main/pull-request-templates)