import { writeFile } from "node:fs/promises";
import { resolve } from "node:path";

const repository = "srosthai/ServerDesk";
const requestedVersion = process.argv[2]?.trim();

const apiUrl = requestedVersion
  ? `https://api.github.com/repos/${repository}/releases/tags/${requestedVersion}`
  : `https://api.github.com/repos/${repository}/releases/latest`;

const headers = {
  Accept: "application/vnd.github+json",
  "User-Agent": "ServerDesk-Website-Sync",
};

async function json(url) {
  const response = await fetch(url, { headers });
  if (!response.ok) {
    throw new Error(`${url} returned ${response.status} ${response.statusText}`);
  }
  return response.json();
}

async function text(url) {
  const response = await fetch(url, { headers });
  if (!response.ok) {
    throw new Error(`${url} returned ${response.status} ${response.statusText}`);
  }
  return response.text();
}

const release = await json(apiUrl);
if (release.draft) {
  throw new Error("refusing to sync a draft release");
}
if (!release.published_at) {
  throw new Error("release has no publication date");
}

const baseUrl = `https://github.com/${repository}/releases/download/${release.tag_name}`;
const assetByName = new Map(release.assets.map((asset) => [asset.name, asset]));

function asset(pattern, label) {
  const match = release.assets.find((candidate) => pattern.test(candidate.name));
  if (!match) {
    throw new Error(`missing ${label} asset in ${release.tag_name}`);
  }
  return match;
}

const checksumsAsset = assetByName.get("SHA256SUMS");
if (!checksumsAsset) {
  throw new Error(`release ${release.tag_name} has no SHA256SUMS asset`);
}

const checksumText = await text(checksumsAsset.browser_download_url);
const hashes = new Map();
for (const line of checksumText.split(/\r?\n/)) {
  const match = line.match(/^([a-f0-9]{64})\s+\*?(.+)$/i);
  if (match) {
    hashes.set(match[2].trim(), match[1].toLowerCase());
  }
}

function sha256(fileName) {
  const hash = hashes.get(fileName);
  if (!hash) {
    throw new Error(`SHA256SUMS has no entry for ${fileName}`);
  }
  return hash;
}

const windows = asset(/-setup\.exe$/i, "Windows NSIS");
const macDmg = asset(/\.dmg$/i, "macOS DMG");
const macZip = assetByName.get("ServerDesk.app.zip") ?? null;
const linuxAppImage = asset(/\.AppImage$/i, "Linux AppImage");
const linuxDeb = asset(/\.deb$/i, "Linux DEB");
const linuxRpm = asset(/\.rpm$/i, "Linux RPM");

const version = release.tag_name.replace(/^v/, "");

function makeAsset({ id, platform, architecture, format, source, recommended = false }) {
  return {
    id,
    platform,
    architecture,
    format,
    fileName: source.name,
    url: `${baseUrl}/${encodeURIComponent(source.name)}`,
    sizeBytes: source.size,
    sha256: sha256(source.name),
    ...(recommended ? { recommended: true } : {}),
  };
}

const assets = [
  makeAsset({
    id: "windows-setup",
    platform: "windows",
    architecture: "x64",
    format: "EXE",
    source: windows,
    recommended: true,
  }),
  makeAsset({
    id: "macos-dmg",
    platform: "macos",
    architecture: "Universal",
    format: "DMG",
    source: macDmg,
    recommended: true,
  }),
  ...(macZip
    ? [
        makeAsset({
          id: "macos-zip",
          platform: "macos",
          architecture: "Universal",
          format: "App ZIP",
          source: macZip,
        }),
      ]
    : []),
  makeAsset({
    id: "linux-appimage",
    platform: "linux",
    architecture: "amd64",
    format: "AppImage",
    source: linuxAppImage,
    recommended: true,
  }),
  makeAsset({
    id: "linux-deb",
    platform: "linux",
    architecture: "amd64",
    format: "DEB",
    source: linuxDeb,
  }),
  makeAsset({
    id: "linux-rpm",
    platform: "linux",
    architecture: "x86_64",
    format: "RPM",
    source: linuxRpm,
  }),
];

const output = {
  version,
  releaseDate: release.published_at.slice(0, 10),
  publishedAt: release.published_at.slice(0, 10),
  status: release.prerelease ? "prerelease" : "published",
  notesUrl: release.html_url,
  docsUrl: "/docs/getting-started/installation",
  checksumsUrl: `${baseUrl}/SHA256SUMS`,
  assets,
};

const outputPath = resolve("src/data/latest-release.json");
await writeFile(outputPath, `${JSON.stringify(output, null, 2)}\n`, "utf8");

console.log(`Synced ${release.tag_name} -> ${outputPath}`);
console.log(`  status: ${output.status}`);
console.log(`  assets: ${assets.length}`);
