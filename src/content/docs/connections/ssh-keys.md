---
title: "SSH keys and host verification"
description: "Supported key formats, passphrase handling, and what to do when a host key changes."
section: "Connections"
order: 1
---

## Supported key formats

ServerDesk accepts:

- OpenSSH keys.
- PEM keys, including RSA, ECDSA, and Ed25519.
- PuTTY PPK keys.
- Passphrase-protected keys.

You can select a key file or provide a local file path. The key material and its passphrase are
stored in the operating system credential store. The local database keeps only a credential
reference.

## Passphrases

A protected key asks for its passphrase when it is used. The passphrase is stored with the key in
the credential store, so you should not need to enter it for every connection.

If the key cannot be read or the passphrase is wrong, the connection fails with a credential
error. Check the file permissions and the passphrase before retrying.

## Host-key verification

ServerDesk checks the server's host key against the local `known_hosts` records before
authentication.

- **Unknown key:** a verification dialog shows the key type and fingerprint. Accept it only after
  comparing it with the server.
- **Changed key:** the connection is blocked. The app does not save the new key automatically.

To check a fingerprint on the server, run the matching command for the host-key type:

```bash
ssh-keygen -lf /etc/ssh/ssh_host_ed25519_key.pub
```

If the fingerprint does not match, stop and investigate. A changed host key can be a normal
server rebuild, or it can be a sign that the connection is not going where you think it is.

## Authentication errors

Authentication failures keep their own error category. Check:

- The username.
- The selected key or password.
- The key passphrase.
- Whether the server accepts the authentication method for that account.

The next guide covers [service management](/docs/server-work/services). If the connection still
fails, use [Troubleshooting](/docs/reference/troubleshooting).
