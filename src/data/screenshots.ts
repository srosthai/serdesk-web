export type ProductScreenshot = {
  id: string;
  view: string;
  src: string;
  alt: string;
  width: number;
  height: number;
};

export const productScreenshots: ProductScreenshot[] = [
  {
    id: "overview",
    view: "Overview",
    src: "/screenshots/overview.webp",
    alt: "ServerDesk Overview screen with the server selector, connection state, identity panel, and resource monitoring cards.",
    width: 1440,
    height: 900,
  },
  {
    id: "servers",
    view: "Servers",
    src: "/screenshots/servers.webp",
    alt: "ServerDesk Servers screen listing saved VPS profiles with group, tags, authentication, and connection state.",
    width: 1440,
    height: 900,
  },
  {
    id: "terminal",
    view: "Terminal",
    src: "/screenshots/terminal.webp",
    alt: "ServerDesk Terminal screen showing the desktop application requirement for interactive SSH sessions.",
    width: 1440,
    height: 900,
  },
  {
    id: "services",
    view: "Services",
    src: "/screenshots/services.webp",
    alt: "ServerDesk Services screen with a server selector, connection state, and paused service discovery.",
    width: 1440,
    height: 900,
  },
  {
    id: "files",
    view: "File Manager",
    src: "/screenshots/files.webp",
    alt: "ServerDesk File Manager screen with server selection, root directory controls, and paused file browsing.",
    width: 1440,
    height: 900,
  },
  {
    id: "projects",
    view: "Projects",
    src: "/screenshots/projects.webp",
    alt: "ServerDesk Projects screen with remote directory controls and a saved projects section.",
    width: 1440,
    height: 900,
  },
];

export const heroScreenshot = productScreenshots.find((shot) => shot.id === "servers")!;
