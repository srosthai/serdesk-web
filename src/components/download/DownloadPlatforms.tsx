import { useEffect, useState } from "react";
import {
  AppleLogoIcon,
  ArrowUpRightIcon,
  LinuxLogoIcon,
  WindowsLogoIcon,
} from "@phosphor-icons/react";
import AnimatedContent from "../reactbits/AnimatedContent";
import {
  formatBytes,
  platformMeta,
  type PlatformId,
  type Release,
  type ReleaseAsset,
} from "../../data/releases";

type Props = {
  release: Release;
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

function primaryAsset(assets: ReleaseAsset[]) {
  return assets.find((asset) => asset.recommended) ?? assets[0] ?? null;
}

export default function DownloadPlatforms({ release }: Props) {
  const [detected, setDetected] = useState<PlatformId | null>(null);
  const isAvailable = release.status !== "draft";

  useEffect(() => {
    setDetected(detectPlatform());
  }, []);

  return (
    <div>
      <p aria-live="polite" className="font-mono text-[0.875rem] leading-5 text-graphite">
        {detected
          ? `Recommended for this computer: ${platformMeta.find((platform) => platform.id === detected)?.name}.`
          : "Choose the build for your computer."}
      </p>

      <AnimatedContent
        className="mt-5 grid gap-4 md:grid-cols-3"
        distance={22}
        direction="vertical"
        duration={0.65}
        ease="power3.out"
        initialOpacity={0}
        animateOpacity
        blur={3}
        threshold={0.08}
        stagger={0.08}
        once
        data-animated-content
      >
        {platformMeta.map((platform) => {
          const Icon = platformIcons[platform.id];
          const assets = release.assets.filter((asset) => asset.platform === platform.id);
          const primary = primaryAsset(assets);
          const secondary = assets.filter((asset) => asset !== primary);
          const isRecommended = detected === platform.id;

          return (
            <article
              key={platform.id}
              id={platform.id}
              className={`flex scroll-mt-24 flex-col rounded-[14px] border bg-paper p-6 transition-[border-color,transform] duration-200 hover:-translate-y-0.5 hover:border-graphite ${
                isRecommended ? "border-ink" : "border-rule"
              }`}
            >
              <div className="flex items-start justify-between gap-3">
                <Icon className="size-5 text-ink" aria-hidden="true" />
                {isRecommended ? (
                  <span className="font-mono text-[0.875rem] leading-4 text-graphite">Recommended</span>
                ) : null}
              </div>

              <h3 className="mt-5 text-[1.25rem] font-medium tracking-[-0.03em]">{platform.name}</h3>
              <p className="mt-1 text-[0.875rem] leading-5 text-graphite">{platform.requirement}</p>

              <div className="mt-6 flex-1">
                {primary ? (
                  <>
                    <p className="font-mono text-[0.875rem] leading-4 text-graphite">
                      {primary.format} / {primary.architecture}
                    </p>
                    {isAvailable ? (
                      <a href={primary.url} className="button button-primary mt-2 w-full">
                        Download {primary.format}
                      </a>
                    ) : (
                      <span
                        aria-disabled="true"
                        className="button button-secondary mt-2 w-full cursor-not-allowed text-graphite"
                      >
                        Awaiting publication
                      </span>
                    )}
                    <p className="mt-2 text-[0.875rem] text-graphite">{formatBytes(primary.sizeBytes)}</p>
                  </>
                ) : null}

                {secondary.length > 0 ? (
                  <details className="mt-4 border-t border-rule pt-3">
                    <summary className="cursor-pointer list-none font-mono text-[0.875rem] leading-4 text-graphite [&::-webkit-details-marker]:hidden">
                      Other formats
                    </summary>
                    <ul className="mt-2 space-y-2">
                      {secondary.map((asset) => (
                        <li key={asset.id}>
                          {isAvailable ? (
                            <a
                              href={asset.url}
                              className="inline-flex items-center gap-1 text-[0.875rem] text-ink underline decoration-rule underline-offset-4 hover:decoration-ink"
                            >
                              {asset.format}
                              <ArrowUpRightIcon className="size-3" aria-hidden="true" />
                            </a>
                          ) : (
                            <span className="text-[0.875rem] text-ink">{asset.format}</span>
                          )}
                          <span className="ml-2 font-mono text-[0.875rem] text-graphite">
                            {formatBytes(asset.sizeBytes)}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </details>
                ) : null}
              </div>

              <p className="mt-5 border-t border-rule pt-4 text-[0.875rem] leading-5 text-graphite">
                {platform.note}
              </p>
            </article>
          );
        })}
      </AnimatedContent>
    </div>
  );
}
