---
title: "Troubleshooting"
description: "Common connection, authentication, service, and transfer failures and what to check next."
section: "Reference"
order: 1
---

## The browser preview cannot connect

The website's browser preview cannot open SSH sessions. Interactive terminals, monitoring,
service discovery, and file transfers run in the ServerDesk desktop application.

Install the desktop build and add the server there. The preview states on this website are
deliberately empty rather than filled with fabricated server data.

## Authentication failed

Check the username, the selected authentication method, and the credential.

- For a password, confirm the account accepts password authentication.
- For a private key, confirm the key is the one authorized for that account.
- For a protected key, confirm the passphrase.

## Host key changed

ServerDesk blocks a connection when the server presents a different host key. Do not clear the
known key just to get past the dialog.

Verify the new fingerprint out of band. If the server was rebuilt or replaced, update the trust
decision after confirming the change. If it was not, stop and investigate.

## Connection timed out or host not found

Check:

- The host name or IP address.
- The SSH port.
- The server firewall and network access.
- Whether the SSH service is running.

A DNS failure, a timeout, and a refused connection are different failures. Use the error label to
choose the next check.

## Service action denied

A service action can fail when the SSH account does not have non-interactive sudo permission for
that unit. The result names the command and includes the remote output. Add the narrowest
`NOPASSWD` rule for the unit you need, then retry.

See [Services and service actions](/docs/server-work/services).

## A transfer stopped partway

An interrupted transfer is reported as failed or cancelled, not success. Partial files are kept
and named in the result so you can inspect or remove them.

Retry with a fresh transfer. A destination conflict requires explicit overwrite confirmation.

## Documentation does not match the app

Open an issue with:

- The ServerDesk version.
- The server distribution and version.
- The exact error label or message.
- The step that differed from this guide.

Use the [GitHub issue tracker](https://github.com/srosthai/ServerDesk/issues) for reports.
