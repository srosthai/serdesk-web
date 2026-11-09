import { useEffect, useState } from "react";
import {
  AppleLogoIcon,
  LinuxLogoIcon,
  WindowsLogoIcon,
} from "@phosphor-icons/react";
import {
  formatBytes,
  platformMeta,
  type PlatformId,
  type Release,
} from "../../data/releases";

type Props = {
  release: Release | null;
};

const platformIcons = {
  windows: WindowsLogoIcon,
  macos: AppleLogoIcon,
  linux: LinuxLogoIcon,
} satisfies Record<PlatformId, typeof WindowsLogoIcon>;

function detectPlatform(): PlatformId | null {
  const userAgent = navigator.userAgent.toLowerCase();
  if (userAgent.includes("windows")) return "windows";
  if (userAgent.includes("mac os") || userAgent.includes("macintosh")) return "macos";
  if (userAgent.includes("linux")) return "linux";
  return null;
}

export default function OsSelector({ release }: Props) {
  const [detected, setDetected] = useState<PlatformId | null>(null);

  useEffect(() => {
    setDetected(detectPlatform());
  }, []);

  const detectedName = platformMeta.find((platform) => platform.id === detected)?.name;

  return (
    <div>
      <p
        aria-live="polite"
        className="font-mono text-[0.6875rem] leading-5 text-graphite"
      >
        {
          detectedName
            ? `Detected platform: ${detectedName}. All three choices remain available.`
            : "Choose your platform."
        }
      </p>

      <div className="mt-5 grid gap-4 md:grid-cols-3">
        {platformMeta.map((platform) => {
          const Icon = platformIcons[platform.id];
          const assets = release?.assets.filter((asset) => asset.platform === platform.id) ?? [];
          const isDetected = detected === platform.id;

          return (
            <article
              key={platform.id}
              id={platform.id}
              className={`flex scroll-mt-24 flex-col rounded-[14px] border bg-paper p-6 ${
                isDetected ? "border-ink" : "border-rule"
              }`}
            >
              <div className="flex items-start justify-between gap-3">
                <Icon className="size-5 text-ink" aria-hidden="true" />
                {isDetected ? (
                  <span className="font-mono text-[0.625rem] leading-4 text-graphite">
                    Your platform
                  </span>
                ) : null}
              </div>

              <h3 className="mt-5 text-[1.25rem] font-medium tracking-[-0.03em]">
                {platform.name}
              </h3>
              <p className="mt-1 text-[0.8125rem] leading-5 text-graphite">
                {platform.requirement}
              </p>

              <p className="mt-5 text-[0.9375rem] leading-6 text-ink">
                {platform.formats.join(", ")}
              </p>
              <p className="mt-1 text-[0.8125rem] leading-5 text-graphite">{platform.note}</p>

              <div className="mt-6 border-t border-rule pt-4">
                {assets.length > 0 ? (
                  <ul className="space-y-3">
                    {assets.map((asset) => (
                      <li key={asset.id}>
                        <a
                          href={asset.url}
                          className="button button-primary w-full"
                          aria-label={`Download ${asset.fileName} for ${platform.name}`}
                        >
                          Download {asset.format}
                        </a>
                        <p className="mt-2 font-mono text-[0.625rem] leading-4 text-graphite">
                          {asset.architecture} / {formatBytes(asset.sizeBytes)}
                        </p>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <div>
                    <p className="text-[0.8125rem] leading-5 text-graphite">
                      {release
                        ? "No installer for this platform in the current release."
                        : "No public installer published yet."}
                    </p>
                    <a
                      href="/docs"
                      className="mt-3 inline-block text-[0.8125rem] font-medium text-ink underline decoration-rule underline-offset-4 hover:decoration-ink"
                    >
                      Installation guide
                    </a>
                  </div>
                )}
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}
