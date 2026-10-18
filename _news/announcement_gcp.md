---
layout: post
date: 2024-11-23 14:00:00-0400
inline: true
---

Currently, I am playing with Cloud Run on GCP (an awesome service 🚀). However, using volumes is a pain. I can use `gcfuse` to _mount_ buckets to the filesystem. So far so good. However, it cannot be used for concurrent access.
I could use NFS volumes as the _only_ alternative, but the costs start at $200/month.
Alternative: I could provision a small VM and set up NFS... but then I'd need a VM for my **serverless** application 😭😭😭😭.
