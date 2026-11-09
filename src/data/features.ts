export type FeatureStatus = "available" | "planned";

export type Feature = {
  id: string;
  name: string;
  description: string;
  status: FeatureStatus;
  featured: boolean;
};

export const features: Feature[] = [
  {
    id: "server-inventory",
    name: "Server inventory",
    description:
      "Keep every VPS profile, group, tag, and connection detail in one list instead of a folder of notes.",
    status: "available",
    featured: true,
  },
  {
    id: "ssh-connections",
    name: "SSH connections",
    description:
      "Connect with a password or private key, review the host key fingerprint, and keep one managed session per server.",
    status: "available",
    featured: true,
  },
  {
    id: "monitoring",
    name: "Resource monitoring",
    description:
      "Read CPU load, memory, disk, and network samples with a visible sample time and an honest stale state.",
    status: "available",
    featured: true,
  },
  {
    id: "terminal",
    name: "Interactive terminal",
    description:
      "Open multiple shell tabs per server with full ANSI output, scrollback, and a dedicated SSH channel for each session.",
    status: "available",
    featured: true,
  },
  {
    id: "services",
    name: "Service management",
    description:
      "Discover the systemd units that actually exist, then start, stop, or restart them with an explicit confirmation and a verified result.",
    status: "available",
    featured: true,
  },
  {
    id: "files",
    name: "File manager",
    description:
      "Browse, upload, download, rename, and delete remote files over the authenticated SFTP connection.",
    status: "available",
    featured: true,
  },
  {
    id: "laravel",
    name: "Laravel projects",
    description:
      "Detect Laravel projects at an explicit path and run a fixed set of Artisan actions with bounded, readable output.",
    status: "available",
    featured: false,
  },
  {
    id: "logs-history",
    name: "Logs and history",
    description:
      "Read bounded log tails and review a local, sanitized history of the operations you run.",
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
