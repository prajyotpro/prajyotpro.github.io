---
id: 294
title: 'Automate AWS AMI creation for your Laravel Project with Packer'
date: '2022-08-07T18:56:11+00:00'
author: 'Prajyot Khandeparkar'
layout: post
guid: 'https://www.prajyotkhandeparkar.com/?p=294'
permalink: /automate-aws-ami-creation-for-your-laravel-project-with-packer/
blogcraft_post_sidebar_option:
    - global-sidebar
twp_disable_ajax_load_next_post:
    - global-layout
image: /wp-content/uploads/2022/08/pexels-mikhail-fesenko-95539051.jpg
categories:
    - Code
    - Work
tags:
    - AWS
    - Code
    - DevOps
    - Infrastructure
    - Work
---

<span class="rt-reading-time" style="display: block;"><span class="rt-label rt-prefix"></span> <span class="rt-time">4</span> <span class="rt-label rt-postfix">min read</span></span>## Intro

In this post, we will find a way to automate your deployment process with Packer – as it says a tool which does packing.

<div class="wp-block-image"><figure class="aligncenter size-full is-resized">![](https://www.prajyotkhandeparkar.com/wp-content/uploads/2022/08/pexels-angela-roma-7319294.jpg)</figure></div>If you have been exploring different tech stacks you will know that there are different ways of deploying your code to servers, but before that please take a look at my previous post on [Initial Backend Project Setup guide](https://www.prajyotkhandeparkar.com/initial-backend-project-setup-sync/) on syncing different environments to its advantage.

## Prerequisite

Now that you are here and before you start reading this any further, I want you to go through the following points and try to understand if this is what you want to achieve.

- Are you running your project on AWS? 
    - Not that Packer does not support other cloud service providers, but in this post, I have considered AWS as a cloud service provider, but you can take this to set up other cloud service providers as well.
- Have you been creating your project infrastructure manually? ie. EC2

If you have the answer to the above question then let’s continue.

## Level: Easy

Here we will mainly focus on automating the process of AWS AMI creation with Packer, which is free and easy to use. Also, Hashicorp has a good document [Packer getting started guilde](https://learn.hashicorp.com/collections/packer/aws-get-started).

## What is Packer? 

The big thing in short, it is a tool which helps maintain configuration and project files. Automating the EC2 creation for you.

## What does Packer do? 

Packer basically creates an EC2 which is running your project, builds an AMI out of it and terminates the EC2. Packer has 3 main building blocks which are well explained in detail on packer doc: <https://learn.hashicorp.com/tutorials/packer/aws-get-started-build-image?in=packer/aws-get-started>

## Advantages of using packer

Free and easy to setup

Automates your project configuration and setup

Easy to maintain and update the code as infrastructure

Easy to horizontally scale your instances

## How to start

As a developer, we will initiate a new repository, just like you do for any other project. The reason we treat this as a project is so that we can add OR update the configuration at any point in time.

We are writing a code with a .hcl file ie. Hashicorp configuration language which is written for packer and terraform scripts. Not to worry, it is pretty easy to learn it from Hashicorp docs.

## Let’s review the folder structure

*Note: For provisioning, I am using shell scripts to keep it simple and easy to understand. There are more advanced provisioning tools like ansible which could be used and something which you can explore at later stages.*

<figure class="wp-block-image size-full">![](https://www.prajyotkhandeparkar.com/wp-content/uploads/2022/08/Screenshot-2022-08-07-at-11.50.50-PM.png)</figure>**aws-laravel.pcr.hcl** – we have the packer configuration file at the root of our project

**provisioners** – different provisioners, written in shell scripts

<figure class="wp-block-image size-full">![](https://www.prajyotkhandeparkar.com/wp-content/uploads/2022/08/Screenshot-2022-08-08-at-12.24.36-AM.png)</figure>**config** – app configuration files

<figure class="wp-block-image size-full">![](https://www.prajyotkhandeparkar.com/wp-content/uploads/2022/08/Screenshot-2022-08-08-at-12.25.20-AM.png)</figure>## Few configurations I would like to discuss 

### ami\_name

```
<pre class="wp-block-code">```
source "amazon-ebs" "packer-aws-laravel" {
 ami_name      = "packer-aws-laravel-${local.timestamp}"
 instance_type = "t2.micro"
 region        = "us-east-1"
 source_ami_filter {
   filters = {
     name                = "ubuntu/images/*ubuntu-jammy-22.04-amd64-server-*"
     root-device-type    = "ebs"
     virtualization-type = "hvm"
   }
   most_recent = true
   owners      = ["099720109477"]
 }
 ssh_username = "ubuntu"
}
```
```

ami\_name = “packer-aws-laravel-${local.timestamp}”

ami\_name, is unique, if you run the same packer script while your ami is already created then it would throw an error stating that an ami already exists. The reason I’m using {local.timestamp} is to differentiate the unique ami\_name. Eventually, you will have to delete older ami’s but also this can be automated with a script and I will explain in later posts.

If you are using a branching strategy for your project and deploying feature/develop/main branches, then ami\_name can be configured based on your branching strategy. For example:

If you are deploying for a feature branch: packer-aws-laravel-${branchname}

If you are deploying for a develop/main branch: packer-aws-laravel-develop-${local.timestamp}

Also versioning your production release can be planned very effectively, for example:

Release version 1.0

ami\_name = “packer-aws-laravel-${release-version}”

This plays an important role in the case of rollbacks, as you already have a tagged ami and can quickly spin up a previous stable version of instances in seconds. I can add on to this but I would prefer having a separate block on branching and release planning.

### Uploading source code

```
<pre class="wp-block-code">```
provisioner "file" {
 source = "packer-aws-laravel.zip"
 destination = "/home/ubuntu/packer-aws-laravel.zip"
}
```
```

In this example, I considered having my source code uploaded as a zip file. You can go ahead and make a better way of doing this alternatively. Making use of git with ssh &amp; pulling in the .env from AWS Secret Manager.

## The source code

<https://github.com/prajyotpro/packer-aws-laravel>

Please feel free to comment and let me know your feedback on the post.