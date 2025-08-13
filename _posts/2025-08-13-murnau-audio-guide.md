---
layout: post
title: Building a Modern Audio Guide Platform - murnau.audio-guide.cloud
date: 2025-08-13 15:30:00
description: "A deep dive into developing a multilingual audio guide platform using Go, Templ, and modern web technologies for the Schlossmuseum Murnau"
tags: golang, web-development, audio-guide, museums, sqlite, templ
---

I recently completed development of [murnau.audio-guide.cloud](https://murnau.audio-guide.cloud), a comprehensive digital audio guide platform for the Schlossmuseum Murnau. This project represents a modern approach to museum technology, combining robust backend architecture with an intuitive user experience.

<div style="display: flex; justify-content: center; margin: 2rem 0;">
  <iframe 
    src="https://murnau.audio-guide.cloud" 
    width="375" 
    height="667" 
    style="border: 2px solid #333; border-radius: 25px; box-shadow: 0 8px 20px rgba(0,0,0,0.3);"
    title="Murnau Audio Guide - Mobile Preview">
  </iframe>
</div>

## Technical Architecture & Security-First Design

The platform is built using Go as the primary backend language, emphasizing minimal dependencies and maximum security. The application consists of two main components: a public-facing guide application and a comprehensive admin interface for content management.

The guide application utilizes [Templ](https://github.com/a-h/templ) for type-safe HTML templating, providing excellent developer experience and compile-time safety. This choice enables server-side rendering while maintaining modern web standards. The backend is powered by SQLite for data persistence, offering reliability and simplicity with zero external database dependencies.

For interactive frontend behavior, the platform leverages [HTMX](https://htmx.org), which perfectly aligns with the project's philosophy of simplicity and minimal dependencies. HTMX extends HTML's natural hypermedia capabilities, allowing any element to make HTTP requests and target specific DOM elements for updates - not just anchors and forms. This approach eliminates the need for complex JavaScript frameworks while providing modern interactive features like AJAX, CSS transitions, and dynamic content updates. At only ~14k minified and gzipped, HTMX maintains the project's lightweight footprint while delivering the interactivity expected in modern web applications without build steps or compilation requirements.

For internationalization, the platform supports eleven languages (German, English, Spanish, Italian, Russian, Ukrainian, French, Arabic, Portuguese, Chinese, and Japanese) using the ctxi18n library, making the museum's content accessible to a diverse international audience.

## Features and Functionality

The audio guide covers multiple exhibitions within the Schlossmuseum Murnau, including "Gabriele Münter & Expressionism," "The Blue Rider - A Homage," "Cabinet of Curiosities," and historical content about Murnau itself. Each exhibit features high-quality audio content with accompanying images and detailed descriptions.

The admin interface provides museum staff with comprehensive content management capabilities. Built with the same Go/Templ stack, it includes features for managing exhibitions, audio content, exhibit metadata, and user analytics. The admin system integrates with Google Cloud services for text-to-speech generation and translation capabilities, streamlining content localization workflows.

## Container-First Architecture & Security

The platform leverages Go's static compilation capabilities to create minimal, secure container images. Using multi-stage Docker builds with pinned base image SHA hashes, the final containers contain only the compiled binary and essential runtime dependencies, resulting in significantly smaller attack surfaces and faster deployment times.

Container security is enforced through multiple layers: read-only filesystems prevent runtime modifications, all Linux capabilities are dropped, processes run as unprivileged users (nobody:nobody), and no-new-privileges policies prevent privilege escalation. This defense-in-depth approach, combined with Nginx for SSL termination and Let's Encrypt certificate management, creates a robust security posture.

In addition, the simple setup with sqlite allows that the public facing application
only has the database mounted readonly ensuring no modifications are possible with
minimal effort.

## CI/CD & Deployment

The platform uses automated CI/CD with container builds, security scanning, and Ansible-based deployment. The pipeline handles everything from building images to server provisioning and backup, enabling rapid iteration with minimal manual effort.

## Cost-Effective Server Alternative

Rather than Function-as-a-Service, I chose traditional server deployment due to cost economics. As I [previously noted]({{ "/news" | relative_url }}), Cloud Run with persistent storage becomes expensive - NFS volumes start at $200/month, ironically requiring VMs for "serverless" applications.

The server approach provides predictable costs, direct filesystem access(sqlite shared across 2 containers), simplified architecture, and better performance for persistent data applications like audio guides. Proper automation delivers serverless-like operational benefits without the FaaS cost penalty and lock in.

The containerized architecture makes future migration to Kubernetes trivial if vertical scaling becomes necessary. However, managed K8s services would be complete overkill for a single museum - by the time such scaling is needed, the platform should generate enough revenue to justify those ongoing costs.

## Impact and Innovation

This project demonstrates how modern web technologies can enhance cultural experiences while maintaining enterprise-grade security and operational efficiency. By combining Go's performance and reliability with contemporary frontend approaches and hardened container deployment, the platform delivers a scalable solution that serves both museum visitors and administrative staff effectively.

The modular architecture, minimal dependency footprint, and container-first design allow for easy expansion to additional museums or exhibitions, making it a versatile and maintainable platform for cultural institutions seeking to digitize their visitor experience with minimal operational overhead.
