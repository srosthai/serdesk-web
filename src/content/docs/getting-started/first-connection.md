---
title: "First connection"
description: "Add a server profile, verify its host key, and open the first authenticated session."
section: "Getting started"
order: 3
---

## What you need

- The server address or DNS name.
- The SSH port. The default is `22`.
- A Linux username on the server.
- A password or a private key.

## Add the server

1. Open **Servers** in the sidebar.
2. Select **Add server**.
3. Enter a name for the profile, the host, the SSH port, and the username.
4. Choose password or private-key authentication.
5. Provide the credential or select the key file.
6. Run the connection test before saving if you want to validate the details first.

The profile is stored locally. The credential is kept in the operating system credential store,
not in the local database.

## Verify the host key

The first connection shows the server's host-key type and fingerprint. Compare the fingerprint
with the value on the server before accepting it.

If the fingerprint has changed since the last connection, ServerDesk blocks the connection
instead of accepting the new key automatically. Do not accept a changed key until you know why
it changed.

## Open the workspace

After the session is authenticated:

- **Overview** shows the selected server, connection state, system identity, and monitoring
  samples.
- **Terminal** opens an interactive shell for the selected server.
- **Services** discovers the systemd units on the connected machine.
- **File Manager** browses the remote filesystem over SFTP.

If a panel says the data is unavailable, connect the server first. ServerDesk does not fill
disconnected views with sample values.

## Next step

Read [SSH keys and host verification](/docs/connections/ssh-keys) for key formats, passphrases,
and fingerprint checks.
