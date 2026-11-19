import latestReleaseData from "./latest-release.json";

export type PlatformId = "windows" | "macos" | "linux";

export type ReleaseStatus = "draft" | "prerelease" | "published";

export type ReleaseAsset = {
  id: string;
  platform: PlatformId;
  architecture: string;
  format: string;
  fileName: string;
  url: string;
  sizeBytes: number;
  sha256: string;
  recommended?: boolean;
};

export type Release = {
  version: string;
  releaseDate: string;
  publishedAt: string | null;
  status: ReleaseStatus;
  notesUrl: string;
  docsUrl: string;
  checksumsUrl: string;
  assets: ReleaseAsset[];
};

export type PlatformMeta = {
  id: PlatformId;
  name: string;
  requirement: string;
  formats: string[];
  note: string;
};

export const platformMeta: PlatformMeta[] = [
  {
    id: "windows",
    name: "Windows",
    requirement: "Windows 10 or newer",
    formats: ["NSIS installer"],
    note: "Per-user install. No administrator account required.",
  },
  {
    id: "macos",
    name: "macOS",
    requirement: "macOS 10.15 or newer",
    formats: ["DMG", "App bundle"],
    note: "Universal build for Intel and Apple silicon.",
  },
  {
    id: "linux",
    name: "Linux",
    requirement: "Ubuntu 22.04+, Debian 12+, Fedora 39+",
    formats: ["AppImage", "DEB", "RPM"],
    note: "Choose the package that matches your distribution.",
  },
];

export const latestRelease = latestReleaseData as Release;

export function releaseTotalBytes(release: Release): number {
  return release.assets.reduce((total, asset) => total + asset.sizeBytes, 0);
}

export function formatBytes(bytes: number): string {
  if (!Number.isFinite(bytes) || bytes <= 0) return "Unknown size";
  const units = ["B", "kB", "MB", "GB"];
  const index = Math.min(Math.floor(Math.log(bytes) / Math.log(1000)), units.length - 1);
  const value = bytes / 1000 ** index;
  return `${value >= 10 || index === 0 ? value.toFixed(0) : value.toFixed(1)} ${units[index]}`;
}

export function formatReleaseDate(value: string): string {
  const date = new Date(`${value}T00:00:00Z`);
  if (Number.isNaN(date.getTime())) return value;
  return new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(date);
}
