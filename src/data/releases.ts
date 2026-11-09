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

const releaseBase = "https://github.com/srosthai/ServerDesk/releases/download/v0.1.0";

/**
 * v0.1.0 is published as a GitHub pre-release. Asset links are public.
 */
export const latestRelease: Release = {
  version: "0.1.0",
  releaseDate: "2026-11-09",
  publishedAt: "2026-11-09",
  status: "prerelease",
  notesUrl: "https://github.com/srosthai/ServerDesk/releases/tag/v0.1.0",
  docsUrl: "/docs/getting-started/installation",
  checksumsUrl: `${releaseBase}/SHA256SUMS`,
  assets: [
    {
      id: "windows-setup",
      platform: "windows",
      architecture: "x64",
      format: "EXE",
      fileName: "ServerDesk_0.1.0_x64-setup.exe",
      url: `${releaseBase}/ServerDesk_0.1.0_x64-setup.exe`,
      sizeBytes: 4084519,
      sha256: "997bcc780628d8d33841b82b6d6f15a7cc91ab0de926d1f3d6d769ea2cad21b3",
      recommended: true,
    },
    {
      id: "macos-dmg",
      platform: "macos",
      architecture: "Universal",
      format: "DMG",
      fileName: "ServerDesk_0.1.0_universal.dmg",
      url: `${releaseBase}/ServerDesk_0.1.0_universal.dmg`,
      sizeBytes: 12113244,
      sha256: "e0135954784364660ee9e31e11f65070a078a259b1e0f0ce730db6991d1253d5",
      recommended: true,
    },
    {
      id: "macos-zip",
      platform: "macos",
      architecture: "Universal",
      format: "App ZIP",
      fileName: "ServerDesk.app.zip",
      url: `${releaseBase}/ServerDesk.app.zip`,
      sizeBytes: 10928045,
      sha256: "33534e220ade098c0a488fa73da2298f465a4321663f200f84fc932430cb3472",
    },
    {
      id: "linux-appimage",
      platform: "linux",
      architecture: "amd64",
      format: "AppImage",
      fileName: "ServerDesk_0.1.0_amd64.AppImage",
      url: `${releaseBase}/ServerDesk_0.1.0_amd64.AppImage`,
      sizeBytes: 84580856,
      sha256: "af37331480f19a39e0da34070a7fa3d8dedf0c956acb51a9ed708aad78ab711e",
      recommended: true,
    },
    {
      id: "linux-deb",
      platform: "linux",
      architecture: "amd64",
      format: "DEB",
      fileName: "ServerDesk_0.1.0_amd64.deb",
      url: `${releaseBase}/ServerDesk_0.1.0_amd64.deb`,
      sizeBytes: 6337156,
      sha256: "360ac1caa58f15cc6fcf29c336e2aae192be9dce0a11035ecd179bc371a0aac0",
    },
    {
      id: "linux-rpm",
      platform: "linux",
      architecture: "x86_64",
      format: "RPM",
      fileName: "ServerDesk-0.1.0-1.x86_64.rpm",
      url: `${releaseBase}/ServerDesk-0.1.0-1.x86_64.rpm`,
      sizeBytes: 6343624,
      sha256: "20d2ec2c934ba11f481614739aa5460d1d5e3ad73b74294468255607b4e273d6",
    },
  ],
};

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
