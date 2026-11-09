export const site = {
  name: "ServerPilot",
  tagline: "Your servers. One desktop. Full control.",
  description:
    "Manage your VPS servers from one local desktop application. Connect over SSH, monitor resources, manage services, browse files, and run commands without switching between terminals and dashboards.",
  github: "https://github.com/srosthai/ServerDesk",
  releases: "https://github.com/srosthai/ServerDesk/releases",
  contact: "https://github.com/srosthai/ServerDesk/issues",
} as const;

export const primaryNav = [
  { label: "Features", href: "/features" },
  { label: "Download", href: "/download" },
  { label: "Documentation", href: "/docs" },
] as const;

export const footerColumns = [
  {
    heading: "Product",
    links: [
      { label: "Features", href: "/features" },
      { label: "Download", href: "/download" },
      { label: "Changelog", href: "/changelog" },
    ],
  },
  {
    heading: "Platforms",
    links: [
      { label: "Windows", href: "/download#windows" },
      { label: "macOS", href: "/download#macos" },
      { label: "Linux", href: "/download#linux" },
    ],
  },
  {
    heading: "Project",
    links: [
      { label: "Documentation", href: "/docs" },
      { label: "GitHub", href: site.github, external: true },
      { label: "Releases", href: site.releases, external: true },
      { label: "Contact", href: site.contact, external: true },
    ],
  },
] as const;

export const legalLinks = [
  { label: "About", href: "/about" },
  { label: "License", href: "/about#license" },
  { label: "Privacy", href: "/about#privacy" },
] as const;
