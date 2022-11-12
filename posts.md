---
id: 11
title: Blog
permalink: /posts/
date: '2018-01-18T06:37:53+00:00'
author: 'Prajyot Khandeparkar'
layout: page
guid: 'http://165.227.238.222/wordpress/?page_id=11'
write_hide_page_title:
    - ''
blogcraft_post_sidebar_option:
    - global-sidebar
twp_disable_ajax_load_next_post:
    - global-layout
---

{% for post in site.posts %}
  <div>
      <p>
        <a href="{{ post.url }}"><b>{{ post.title }}</b></a>
        <br>in <b>{{ post.categories[0] }}</b> on {{ post.date }}
        <!-- <p>{{ post.excerpt }}</p> -->
      </p>
  </div>
{% endfor %}