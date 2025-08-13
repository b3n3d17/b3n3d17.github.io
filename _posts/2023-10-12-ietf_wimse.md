---
layout: post
title: Simplifying OAuth for Container Orchestration
date: 2023-10-12 20:00:16
description: Discussing a method for simplified oauth client authentication for orchestrated containerized microservices
tags: cybersecurity, ietf
categories: work
---

In the world of container orchestration, where microservices dynamically interact with each other and external resources, securing access to protected resources is a paramount concern. The OAuth 2.0 framework was designed to facilitate secure access management in distributed systems, but it often poses challenges, especially when it comes to managing sensitive secrets like client IDs and client secrets. The solution to this complex issue lies in "Service Account Token Volume Projection," a concept introduced by Kubernetes that injects JSON Web Tokens (JWTs) into workloads.

This [IETF draft](https://datatracker.ietf.org/doc/draft-hofmann-wimse-workload-identity-bcp/) outlines how these JWTs can be employed to handle client credentials in container orchestration systems. Its primary aim is to enhance interoperability within orchestration systems while reducing complexities for developers. Moreover, it incentivizes authorization servers to support RFC 7523, a crucial aspect of OAuth 2.0.

Traditionally, provisioning unique credentials for every workload instance was a manual and cumbersome process, devoid of automated rotation mechanisms. This not only added inconvenience but also increased the attack surface. Service Account Token Volume Projection changes the game by enabling the creation of JWTs known as Service Account Tokens. These tokens act as client credentials, eliminating the need for client ID and client secret configurations.

Additionally, the feature permits automated token rotation and ensures that private keys for token signing are handled by the control plane, further reducing manual configuration efforts. However, the lack of a standardized approach for managing these tokens across various container orchestrators and lacking wide spread support by authorization servers leads to additional development efforts. In a PoC I used this approach with [Duende Identity Server](https://duendesoftware.com/products/identityserver). And there I needed to modify the credential verifiaction in order for this approach to work.

This IETF draft presents a standardized approach for managing Service Account Tokens in container orchestration systems. By doing so, it promotes a secure and scalable method for creating and managing these tokens while ensuring seamless integration with existing OAuth-based authorization systems.

In a nutshell, this approach simplifies the OAuth 2.0 framework for container orchestration, making it more developer-friendly, secure, and efficient. It's a significant step forward in the realm of container orchestration, promising a brighter and more secure future for microservices and their interaction with the broader network.

Please get involved in the discussion [here](mailto:draft-hofmann-wimse-workload-identity-bcp@ietf.org?subject=Mail%20regarding%20draft-hofmann-wimse-workload-identity-bcp)
