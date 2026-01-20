AWS: Asynchronous Event Ingestion and Processing Architecture

This documentation outlines the Asynchronous Event Ingestion and Processing Architecture designed for high-scale webhook integration from clients  OR third-party providers.

1. [Overview](#1-overview)
2. [Architecture](#2-architecture)
2. [High-Level Architecture Diagram](#3-high-level-architecture-diagram)
4. [Component Specifications](#4-component-specifications)
    - [API Gateway](#1-api-gateway)
    - [Auth Lambda (Authorizer)](#2-auth-lambda-authorizer)
    - [Injection / Producer Lambda](#3-injection-producer-lambda)
    - [SQS / FIFO (Simple Queue Service)](#4-sqs-fifo-simple-queue-service)
    - [Consumer / Worker Lambda](#5-consumer-worker-lambda)
    - [DLQ (Dead Letter Queue) & Fix-and-Replay](#6-dlq-dead-letter-queue-fix-and-replay)
5. [Request Flow Sequence](#5-request-flow-sequence)
6. [Architectural Justification: Why Asynchronous Validation?](#6-architectural-justification-why-asynchronous-validation)
7. [Future enhancement](#7-future-enhancement)
8. [References](#8-references)


### 1. Overview

The architecture follows a Decoupled Producer-Consumer pattern. Its primary objective is to provide a highly available entry point that captures external events with minimal latency, ensuring data durability through a queuing system before processing business logic and validations.![ref1]

### 2. Architecture

|Component|AWS|
| - | - |
|Entry Point|API Gateway|
|Authentication|Lambda|
|Ingestion|Lambda|
|Messaging/Queue|SQS|
|Worker/Processor|Lambda|
|<a name="_page0_x30.00_y728.25"></a>Scaling|Automatic (Scale-to-Zero)|


### 3. High-Level Architecture Diagram
<br>
<img src="/wp-content/uploads/2026/event-injection-workers.png" />
<br>

### 4. Component Specifications
#### 1. API Gateway

The entry point for all incoming webhook requests.
Role: Acts as the managed interface for the system.

- Key<a name="_page1_x30.00_y396.75"></a> Responsibilities: Terminating TLS, request routing, and basic protocol validation.
- Design<a name="_page1_x30.00_y435.00"></a> Choice: By using API Gateway, we offload authentication and throttling concerns, ensuring the underlying compute resources are only used for legitimate traffic.
#### 2. Auth Lambda (Authorizer)

A dedicated function for request validation.

- Role: Performs security checks (e.g., verifying Shopify HMAC signatures or API keys).
- Interaction: If validation succeeds, it returns an IAM policy allowing the API Gateway to invoke the next stage. If it fails, the request is rejected at the edge with a  `401 Unauthorized`.

#### 3. Injection / Producer Lambda
The ingestion layer is designed for speed and reliability.

- Role: Receives the raw payload from the API Gateway and pushes it to the directed message queue.
- Validation Strategy: This layer uses Shallow Validation. It checks if the payload is valid JSON but does not enforce a strict schema (DTO). This ensures that if the provider adds new fields unexpectedly, the event is still captured.
- Outcome: Once the message is in SQS, it returns a  202 Accepted to the client.

#### 4. SQS / FIFO (Simple Queue Service)

The durability and ordering layer.
- Role: Buffers events and ensures they are processed in the order they were received (First-In-First-Out).

- Benefit: Decouples the ingestion speed from the processing speed, protecting downstream services from traffic spikes.

#### 5. Consumer / Worker Lambda

The core business logic and validation layer.

- Role: Triggered by messages in SQS to perform heavy lifting.
- Validation Strategy: This layer performs Deep Validation (Schema/DTO checks). It maps the incoming data to the internal system requirements.

- Processing: If validation passes, it works on logic to perform updates to the database or triggers downstream business workflows.

#### 6. DLQ (Dead Letter Queue) & Fix-and-Replay

The resilience and recovery mechanism.

- Role: Captures events that fail processing in the Worker Lambda (e.g., schema mismatches or transient database errors).
- Fix-and-Replay Path: Allows developers to inspect failed events in the DLQ, fix the underlying Worker code or schema, and then re-inject the message back into the Worker for processing without losing data.

### 5. Request Flow Sequence
1. Ingestion: The Client sends a webhook. API Gateway triggers the Auth Lambda.
2. Verification: Upon successful authentication, API Gateway passes the request to the Injection Lambda.
3. Persistence: Injection Lambda performs a structural check and sends the payload to SQS FIFO.
4. Acknowledgement: The system returns an immediate  202 Accepted to the client.
5. Processing: SQS triggers the Worker Lambda.
6. Deep Validation: The Worker validates the schema.
   - If Valid: The event is processed.
   - If Invalid: The event is moved to the DLQ.
7. Architectural Justification: Why Asynchronous Validation? This design prioritizes Durability over Immediate Rejection.
   - Resilience to External Changes: Third-party webhooks (like Shopify) are subject to change. If we enforced strict validation at the API Gateway (as suggested in your peer review), a new, unmapped field from Shopify would cause a  400 Bad Request , and the data would be lost forever.
   - Reliability: By accepting the data first, we ensure we have a "copy of record." If the validation fails in the Worker, we have the ability to fix our code and replay the event from the DLQ.
   - Client Experience: Webhook providers require fast response times to prevent retries and back-offs. This architecture minimises the synchronous work, ensuring we meet these strict time constraints.

### 7. Future enhancement

Entry Point: Global External HTTP(S) Load Balancer (ALB equivalent)
- Static IP: Provides a single, static Anycast IP address to whitelist for any third party. 

### 8. References

- [ Sending and receiving webhooks on AWS: Innovate with event notifications | Amazon Web](https://aws.amazon.com/blogs/compute/sending-and-receiving-webhooks-on-aws-innovate-with-event-notifications/)

- [Queue-Based Load Leveling pattern - Azure Architecture Center](https://learn.microsoft.com/en-us/azure/architecture/patterns/queue-based-load-leveling)
