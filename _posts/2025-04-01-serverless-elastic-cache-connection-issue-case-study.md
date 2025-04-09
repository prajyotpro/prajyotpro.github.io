---
layout: post
title:  "Case Study: Issue with Serverless and elastic cache Redis"
author: 'Prajyot Khandeparkar'
---


### Case Study: Issue with Serverless and elastic cache Redis

<br>
#### Case

The backend serverless system experienced connectivity disruptions with AWS ElastiCache Redis during a period of elevated API request volume stemming from a scheduled event on client applications. This resulted in a significant number of 5XX error responses.

<br>
#### The Error

Recorded on the Lambda cloudwatch logs
<br>
<img src="/wp-content/uploads/2025/cw-log-serverless-cache-lambda-error.png" /> <br>

ERROR getaddrinfo EMFILE in an AWS Lambda function indicates that your function has run out of file descriptors. Let's break down what this means:

Understanding the Components:
- getaddrinfo: This is a standard function used to perform DNS resolution. It translates a hostname (like "example.com") into an IP address.
- EMFILE: This is an error code that stands for "Too many open files." It signifies that the process has reached its limit for the number of files it can have open concurrently.

<br>
#### What's happening in AWS Lambda
AWS Lambda functions run in a containerized environment. Like any operating system, this environment has limits on the number of files (including network sockets, which are treated as files) that a process can have open at the same time.

When your Lambda function makes network requests (e.g., to external APIs, databases, or other AWS services), it opens network sockets. If your function opens many sockets without closing them properly, it will eventually exhaust the available file descriptors, leading to the EMFILE error.

<br>
#### Current architecture

<br>
<img src="/wp-content/uploads/2025/arch-hld-serverless-cache-lambda-error.png"/> <br>

The current project architecture is relatively simple, employing API Gateway for request routing to a collection of services. These services, in turn, utilize either a database or caching mechanisms depending on their specific logic.

Our Lambda functions, based on Node.js 20.x, employ the npm Redis module, implemented as a singleton for efficiency.

<br>
#### Observation

Due to the launch event the services were catering multiple concurrent requests at a time.

Below is the metric which was observed on the endpoint failures.

<br>
<img src="/wp-content/uploads/2025/serverless-cache-lambda-error_api-gateway-request.png"/> <br>

As you can see in the above graph the API gateway clocked above 2k request / 5 min. 

<br>
<img src="/wp-content/uploads/2025/serverless-cache-lambda-error_api-gateway-5xx.png"/> <br>

Which also resulted in 5XX errors on the client screens.

<br>
<img src="/wp-content/uploads/2025/serverless-cache-lambda-error_lambda-invocation.png"/> <br>

Lambda invocations which went up to 300 / 5min

<br>
<img src="/wp-content/uploads/2025/serverless-cache-lambda-error_lambda-concurrent-execution.png"/> <br>

Lambda concurrency which went above 300 / 5min

<br>
<img src="/wp-content/uploads/2025/serverless-cache-lambda-error_redis-current-connection.png"/> <br>

Elastic cache Redis current connection count going above 18k / 5min

<br>
<img src="/wp-content/uploads/2025/serverless-cache-lambda-error_redis-new-connection.png"/> <br>

Elastic cache Redis new connections going above 1k / 5min

<br>
#### Other impacted services

None of the other services like MongoDB database were impacted. MongoDB drivers often have robust connection pooling built-in, which may be handling connection management more effectively.

<br>
#### What might have caused the issue

**Connection frequency in Redis**

The Lambda function might be making more frequent Redis connections or holding them open for longer durations compared to MongoDB connections. As we also can see in the elastic cache Redis connection metric which is spiked to 18k connections.
Redis is often used for caching and session management, which can lead to a high volume of short-lived connections.

**Lambda Concurrency and Redis**

High Lambda concurrency can exacerbate the
EMFILE issue. Each concurrent invocation might be opening Redis connections, and if they're not closed correctly, the problem will quickly escalate. Same can be understood from the presented metric chart for Lambda invocations and concurrent executions.

<br>
#### Implemented solution

**Understanding the current implementation on Redis connection class**

Although the implementation for Redis service client is a singleton design, while useful in traditional application environments, often presents challenges and might not behave as expected or be truly effective in the context of AWS Lambda due to the stateless and ephemeral nature of the Lambda execution environment.

The fundamental characteristics of AWS Lambda – statelessness, ephemeral execution environments, and horizontal scalability – make the traditional singleton design pattern unreliable and often ineffective. You cannot guarantee a single instance across multiple invocations, and you might end up with multiple instances, defeating the pattern's purpose. 

**Closing the connection after the operation**

For every distinct execution of the Lambda function, a fresh connection is created, the required operations are carried out, and the connection is subsequently terminated.

Note: Examples are in Typescript

The cache client

```

import { createClient } from "redis";

export class Cache implements ICache {
  private client: any = null;

  async getInstance(): Promise<any> {
   
    this.client = await createClient({
      url: appConfig.redis.roUrl,
    })
      .on("error", (err) => {
        console.log(err);
        throw new Error("Redis Client Connection Error");
      })
      .connect();
    return this.client;
    
  }

  async closeInstance(): Promise<void> {
      this.client && (await this.client.quit());
  }
}

```

Implementation

```
async doSomething(userId: string): Promise<IResponse[] | undefined> {
    try {
        
      const cacheClient = await this._cache.getInstance();
      const res = await cacheClient.HGET(<KEY>, userId);
      await this._cache.closeInstance();
      return JSON.parse(res);

    } catch (error) {

      console.error(error, `Arguments : {${userId}}`);
      return;

    }

}
```

<br>
#### Result

Optimized connection management facilitated reliable execution under significant load without performance degradation, demonstrated by a lower steady-state connection count and a stable rate of new connection establishment.


<br>
#### Next steps


**Reactive vs Proactive**

Need to consider a few new pipeline action items at the
`stag` environment to improve reliability testing and implement load testing.

**Researching on better pooling mechanism libraries**

Redis example code generally opens a connection, demonstrates a command or feature, and then closes. Real-world code typically has short bursts of communication with the server and periods of inactivity in between. Opening and closing connections involves some overhead and leads to inefficiency if you do it frequently. This means that you can improve the performance of production code by making as few separate connections as possible.

Managing connections in your own code can be tricky, so the Redis client libraries give you some help. The two basic approaches to connection management are called connection pooling and multiplexing. The redis-py, jedis, and go-redis clients support connection pooling, while NRedisStack supports multiplexing. Lettuce supports both approaches.



**Utilizing Read-only nodes on AWS ElastiCache**

Making use of read-only nodes on AWS ElastiCache is a crucial strategy for improving the performance, resilience, and availability of your Redis or Memcached clusters. y directing read operations to the read-only nodes, you significantly reduce the load on the primary (write) node. This allows the primary node to focus on write operations, leading to better write performance and overall throughput.

As your read traffic increases, you can easily scale out your cluster by adding more read-only nodes without impacting the write capacity of the primary node.

Read-only nodes provide redundancy for read operations. Even if one read-only node becomes unavailable, your application can still serve read requests from the other healthy read-only nodes.


<br>
#### Conclusion

Serverless environments like AWS Lambda require careful consideration of resource management, especially for external connections. The stateless and ephemeral nature of Lambda can make traditional stateful patterns like singletons behave unexpectedly and lead to resource exhaustion (like file descriptors).

High concurrency in Lambda can amplify connection management issues. A seemingly small inefficiency in connection handling can quickly become a critical problem under heavy load.

Naively implementing a singleton for external connections in Lambda might not be effective and can even be detrimental. Each concurrent Lambda invocation can still create its own "singleton" instance, negating the intended benefits.

Explicitly opening and closing connections per invocation can be a viable immediate solution to prevent resource exhaustion in Lambda, but it comes with performance overhead. This highlights the trade-off between resource management and performance in serverless environments.

Connection pooling is a more robust and performant long-term solution for managing connections in Lambda. Exploring and implementing client libraries with built-in connection pooling is crucial for efficiency.

Leveraging read replicas in ElastiCache (or similar read-only scaling mechanisms in other data stores) is essential for handling high read traffic and improving the resilience of applications interacting with serverless backends. Offloading reads reduces the load on the primary node and enhances scalability.

Thorough reliability and load testing in staging environments are critical for identifying and addressing potential scalability and connection management issues before they impact production. Proactive testing is key to preventing incidents like the one described.

Monitoring key metrics (like connection counts, error rates, and concurrency) is vital for understanding the behavior of serverless applications under load and for diagnosing issues when they arise. The provided metrics were crucial in pinpointing the root cause.

Different database drivers and client libraries have varying levels of built-in connection management capabilities. The comparison with MongoDB highlights the importance of choosing libraries that are well-suited for high-concurrency environments.