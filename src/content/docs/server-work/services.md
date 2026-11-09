---
title: "Services and service actions"
description: "Discover systemd units and run confirmed start, stop, and restart actions."
section: "Server work"
order: 1
---

## Discover the units

1. Connect the server from **Servers**.
2. Open **Services**.
3. Select the server and refresh the unit list.

ServerDesk reads the units that systemd actually returns. It does not add a fixed list of common
services. Systems without systemd report an unsupported discovery state instead of an empty
successful list.

## Filter and inspect

The unit list can be filtered by name, description, load state, and raw systemd state. Active,
inactive, failed, and unknown units stay distinct.

Status inspection reads the unit again. It does not rely on the previous list.

## Start, stop, or restart

Stop and restart require a confirmation dialog. The dialog names the server and the unit, so a
destructive action is not a single accidental click.

Service actions use a fixed command template and a validated unit name. They do not accept
arbitrary shell input.

After the action, ServerDesk queries the unit again and reports whether the requested state was
verified. A zero exit status on its own is not treated as proof that the service reached the
requested state.

## Sudo expectations

The SSH account is expected to be a dedicated non-root account. ServerDesk does not prompt for a
sudo password and does not assume unrestricted sudo.

If the action is denied, the result includes the exact non-interactive command and the remote
output. An example sudoers rule for one unit looks like this:

```text
deploy ALL=(root) NOPASSWD: /usr/bin/systemctl start -- nginx.service, /usr/bin/systemctl stop -- nginx.service, /usr/bin/systemctl restart -- nginx.service
```

Adjust the user, path, and unit for your server. Do not grant broader access than the actions you
actually need.

## If discovery is empty

Check that the server uses systemd and that the account can read unit state. If the page reports
an unsupported result, the server is not exposing systemd in the expected way.

For connection problems, use [Troubleshooting](/docs/reference/troubleshooting).
