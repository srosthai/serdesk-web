export type FeatureStatus = "available" | "planned";

export type Feature = {
  id: string;
  name: string;
  description: string;
  detail: string;
  status: FeatureStatus;
  featured: boolean;
};

export const features: Feature[] = [
  {
    id: "server-inventory",
    name: "Server inventory",
    description:
      "Keep every VPS profile, group, tag, and connection detail in one list instead of a folder of notes.",
    detail:
      "Saved profiles include name, host, port, user, authentication type, group, tags, and notes. Search and group filters keep a large inventory manageable.",
    status: "available",
    featured: true,
  },
  {
    id: "ssh-connections",
    name: "SSH connections",
    description:
      "Connect with a password or private key, review the host key fingerprint, and keep one managed session per server.",
    detail:
      "Password and private-key authentication are supported. Unknown host keys require explicit acceptance, and a changed key blocks the connection instead of silently continuing.",
    status: "available",
    featured: true,
  },
  {
    id: "monitoring",
    name: "Resource monitoring",
    description:
      "Read CPU load, memory, disk, and network samples with a visible sample time and an honest stale state.",
    detail:
      "CPU load, memory, filesystems, and network counters come from fixed read-only commands. Each group carries its own sample time and status: available, unsupported, or unavailable.",
    status: "available",
    featured: true,
  },
  {
    id: "terminal",
    name: "Interactive terminal",
    description:
      "Open multiple shell tabs per server with full ANSI output, scrollback, and a dedicated SSH channel for each session.",
    detail:
      "Each terminal tab gets its own SSH channel and PTY. ANSI colors, cursor movement, selection, and 5,000 lines of scrollback are preserved.",
    status: "available",
    featured: true,
  },
  {
    id: "services",
    name: "Service management",
    description:
      "Discover the systemd units that actually exist, then start, stop, or restart them with an explicit confirmation and a verified result.",
    detail:
      "Discovery reads the units actually returned by systemd. Start, stop, and restart use fixed commands, require confirmation, and re-query the unit to verify the result.",
    status: "available",
    featured: true,
  },
  {
    id: "files",
    name: "File manager",
    description:
      "Browse, upload, download, rename, and delete remote files over the authenticated SFTP connection.",
    detail:
      "The file browser uses SFTP on the existing SSH connection. Uploads and downloads report progress, preserve partial files on failure, and verify completed writes.",
    status: "available",
    featured: true,
  },
  {
    id: "laravel",
    name: "Laravel projects",
    description:
      "Detect Laravel projects at an explicit path and run a fixed set of Artisan actions with bounded, readable output.",
    detail:
      "A directory is treated as Laravel only when artisan, composer.json, bootstrap/, and storage/ are present. Actions are selected from a fixed allowlist.",
    status: "available",
    featured: false,
  },
  {
    id: "logs-history",
    name: "Logs and history",
    description:
      "Read bounded log tails and review a local, sanitized history of the operations you run.",
    detail:
      "Log reads are bounded to approved locations and 64 KiB. Operation history stores a sanitized summary and never raw terminal output.",
    status: "available",
    featured: false,
  },
];

export const featuredFeatures = features.filter((feature) => feature.featured);

export const howItWorks = [
  {
    number: "01",
    title: "Install ServerDesk",
    description:
      "Download the desktop application for Windows, macOS, or Linux. It runs on your computer with no hosted backend.",
  },
  {
    number: "02",
    title: "Connect your VPS",
    description:
      "Add the server address, SSH port, username, and authentication method. Verify the host key before the first session.",
  },
  {
    number: "03",
    title: "Manage your server",
    description:
      "Monitor resources, open a terminal, inspect services, and browse files from the same workspace.",
  },
] as const;
