---
title: "Installation"
description: "Install the ServerDesk desktop application on Windows, macOS, or Linux."
section: "Getting started"
order: 2
---

## Before you start

ServerDesk is a desktop application. Install it on the computer you use to manage servers, not
on the VPS.

Public installers are not published yet. The [Download page](/download) shows the current release
state and will link directly to the published assets when they are available.

## Windows

1. Download the NSIS installer from the [Download page](/download).
2. Run the installer. It installs per user and does not require an administrator account.
3. Launch ServerDesk from the Start menu.

## macOS

1. Download the universal DMG from the [Download page](/download).
2. Open the DMG and move ServerDesk to Applications.
3. Launch the app. If macOS refuses the first launch, open System Settings, go to Privacy and
   Security, and review the message before allowing the app.

## Linux

Choose the package that matches your distribution. The release page lists the exact file names,
architectures, and checksums for each build.

### Debian or Ubuntu

```bash
sudo apt install ./<downloaded-package>.deb
```

### Fedora

```bash
sudo dnf install ./<downloaded-package>.rpm
```

### AppImage

```bash
chmod +x <downloaded-package>.AppImage
./<downloaded-package>.AppImage
```

## Verify the download

When a release publishes checksums, compare the file you downloaded against the value on the
release page.

```bash
sha256sum <downloaded-file>
```

Do not install a package when the checksum does not match.

## Next step

Continue with [First connection](/docs/getting-started/first-connection) or read about
[SSH keys and host verification](/docs/connections/ssh-keys).
