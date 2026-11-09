---
title: "Overview"
description: "How ServerDesk works, what stays local, and what you need before connecting a server."
section: "Getting started"
order: 1
---

## The model

ServerDesk is a desktop application. It runs on the computer you use to manage servers and opens
a direct SSH connection to each VPS you add. There is no ServerDesk cloud account, hosted
dashboard, or agent running on the server.

The website is the product showcase and download destination. The desktop app is where the work
happens.

## What you need

- A Linux VPS with an SSH service you can reach.
- The server address, SSH port, and username.
- A password or a private key for authentication.
- A desktop computer running Windows, macOS, or Linux.

## What stays local

- Server profiles, groups, tags, and notes.
- The operation history the app records.
- Credentials, which are kept in the operating system credential store.

Remote commands, terminal sessions, file transfers, and monitoring samples are exchanged with
the server you connect to. They do not pass through a ServerDesk-hosted backend.

## Next step

Download the desktop application, then follow the first-connection guide when it is published.
Until then, the [Download page](/download) explains the current release state.
