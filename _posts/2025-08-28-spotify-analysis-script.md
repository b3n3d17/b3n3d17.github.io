---
layout: post
title: "Ditching Spotify - Using GDPR Data Export to Build Your Physical Music Collection"
date: 2025-08-28 15:00:00
description: "How I used my Spotify GDPR data export and a simple Go script to identify which albums to buy when transitioning away from streaming subscriptions"
tags: golang, spotify, gdpr, music, physical-media, data-export
---

I'm ditching my Spotify subscription to build a physical music collection. While streaming is convenient, I want to own the music I love most and stop paying monthly fees for something ephemeral.

Thanks to GDPR, getting your Spotify data is straightforward. The challenge? Making sense of years of listening history to identify albums worth buying.

## Getting Your Spotify Data

1. Go to [Spotify Privacy Settings](https://www.spotify.com/account/privacy/)
2. Request "Extended streaming history" 
3. Wait 30 days for your export
4. Download the ZIP file when ready

## The Problem

My export contained 300,000+ streaming events over 5 years. Each record includes track name, album, artist, and play duration. The perfect data to compute which albums to buy, but not something "every day people" would use. So I utilized a little bit of golang to automate the process.

The Go script processes the export and generates reports with:

- Albums ranked by play count
- Song breakdowns for each album  
- Direct search links to MusicBrainz and Medimops for easy buy

## Usage

```bash
# Basic usage - top 50 albums as Markdown
go run analyze.go

# JSON output to file
go run analyze.go -json -output=albums.json -limit=10

# Available flags:
# -input: Input JSON file
# -limit: Top N albums (default: 50) 
# -json: Output JSON instead of Markdown
# -output: Save to file (default: stdout)

# You can also use pandoc to generate a .pdf
# and send it to your friends and family
pandoc out.md -o out.pdf
```

## Example Output

Here's what the script generates for the top albums (limited to 2 for this example):

| Rank | Album | Artist | Plays | Search Links |
|------|-------|--------|-------|--------------|
| 1 | Abbey Road | The Beatles | 847 | [MusicBrainz](https://musicbrainz.org/search?query=The+Beatles+Abbey+Road&type=release&limit=25&method=indexed) • [Medimops Artist](https://www.medimops.de/produkte-C0/?fcIsSearch=1&searchparam=The+Beatles) • [Medimops Album](https://www.medimops.de/produkte-C0/?fcIsSearch=1&searchparam=Abbey+Road) |
| 2 | Dark Side of the Moon | Pink Floyd | 623 | [MusicBrainz](https://musicbrainz.org/search?query=Pink+Floyd+Dark+Side+of+the+Moon&type=release&limit=25&method=indexed) • [Medimops Artist](https://www.medimops.de/produkte-C0/?fcIsSearch=1&searchparam=Pink+Floyd) • [Medimops Album](https://www.medimops.de/produkte-C0/?fcIsSearch=1&searchparam=Dark+Side+of+the+Moon) |

The script provides detailed breakdowns with individual song play counts and direct purchase links to MusicBrainz and Medimops.

## Beyond Buying: Self-Hosted Media

Once you build a physical collection, consider **Jellyfin** - a self-hosted media server that replaces Spotify:

- No monthly fees
- Your music, your rules  
- Stream anywhere
- No tracking or ads

Get the code [here](../../../assets/code/analyze.go)

