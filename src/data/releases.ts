export type PlatformId = "windows" | "macos" | "linux";

export type ReleaseAsset = {
  id: string;
  platform: PlatformId;
  architecture: string;
  format: string;
  fileName: string;
  url: string;
  sizeBytes: number;
  sha256?: string;
};

export type Release = {
  version: string;
  releaseDate: string;
  notesUrl: string;
  docsUrl: string;
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
    formats: ["DMG"],
    note: "Universal build for Intel and Apple silicon.",
  },
  {
    id: "linux",
    name: "Linux",
    requirement: "Ubuntu 22.04+, Debian 12+, Fedora 39+",
    formats: ["DEB", "RPM", "AppImage"],
    note: "Choose the package that matches your distribution.",
  },
];

/**
 * Only add assets that have actually been published. Never invent a URL,
 * file name, size, or checksum for a release that does not exist.
 */
export const releases: Release[] = [];

export const latestRelease: Release | null = releases[0] ?? null;

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
