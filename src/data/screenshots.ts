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
    src: "/screenshots/overview-0.1.1.webp",
    alt: "ServerDesk v0.1.1 Overview screen with the server selector, connection state, identity panel, and resource monitoring cards.",
    width: 1440,
    height: 900,
  },
  {
    id: "servers",
    view: "Servers",
    src: "/screenshots/servers-0.1.1.webp",
    alt: "ServerDesk v0.1.1 Servers screen listing saved VPS profiles with group, tags, authentication, and connection state.",
    width: 1440,
    height: 900,
  },
  {
    id: "databases",
    view: "Databases",
    src: "/screenshots/databases-0.1.1.webp",
    alt: "ServerDesk v0.1.1 Database Manager with saved PostgreSQL and MySQL connections, an object explorer, and workspace tabs for overview, structure, data, SQL, and sessions.",
    width: 1440,
    height: 900,
  },
  {
    id: "terminal",
    view: "Terminal",
    src: "/screenshots/terminal-0.1.1.webp",
    alt: "ServerDesk v0.1.1 Terminal screen showing the desktop application requirement for interactive SSH sessions.",
    width: 1440,
    height: 900,
  },
  {
    id: "services",
    view: "Services",
    src: "/screenshots/services-0.1.1.webp",
    alt: "ServerDesk v0.1.1 Services screen with a server selector, connection state, and paused service discovery.",
    width: 1440,
    height: 900,
  },
  {
    id: "files",
    view: "File Manager",
    src: "/screenshots/files-0.1.1.webp",
    alt: "ServerDesk v0.1.1 File Manager screen with server selection, root directory controls, and paused file browsing.",
    width: 1440,
    height: 900,
  },
  {
    id: "projects",
    view: "Projects",
    src: "/screenshots/projects-0.1.1.webp",
    alt: "ServerDesk v0.1.1 Projects screen with remote directory controls and a saved projects section.",
    width: 1440,
    height: 900,
  },
];

export const heroScreenshot = productScreenshots.find((shot) => shot.id === "servers")!;
