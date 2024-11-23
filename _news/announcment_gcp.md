---
layout: post
date: 2024-11-23 14:00:00-0400
inline: true
---

Currently playing Cloud Run on GCP. Awesome service 🚀. However, using volumes
is a pain. You can use `gcfuse` to _mount_ buckets to the file-system. Sound nice.
However, its cannot be used for concurrent access. I could use NFS but I in order
to provision a managed service it costs 200$/month at least. The only option
is to provision myself bare metal with NFS - but if I do that why am I using
server-less 😭😭😭😭.
