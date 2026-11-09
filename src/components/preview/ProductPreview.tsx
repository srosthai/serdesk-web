import { useEffect, useId, useRef, useState } from "react";
import { createPortal } from "react-dom";
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  ArrowsOutIcon,
  XIcon,
} from "@phosphor-icons/react";
import type { ProductScreenshot } from "../../data/screenshots";

type Props = {
  screenshots: ProductScreenshot[];
};

export default function ProductPreview({ screenshots }: Props) {
  const [active, setActive] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const overlayRef = useRef<HTMLDivElement | null>(null);
  const closeRef = useRef<HTMLButtonElement | null>(null);
  const restoreFocusRef = useRef<HTMLElement | null>(null);
  const baseId = useId().replace(/:/g, "");
  const tabId = (index: number) => `${baseId}-tab-${index}`;
  const panelId = `${baseId}-panel`;
  const titleId = `${baseId}-lightbox-title`;

  const current = screenshots[active];

  function selectTab(index: number) {
    setActive(index);
  }

  function onTabKeyDown(event: React.KeyboardEvent<HTMLButtonElement>, index: number) {
    let next = index;

    if (event.key === "ArrowRight") next = (index + 1) % screenshots.length;
    else if (event.key === "ArrowLeft")
      next = (index - 1 + screenshots.length) % screenshots.length;
    else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = screenshots.length - 1;
    else return;

    event.preventDefault();
    setActive(next);
    tabRefs.current[next]?.focus();
  }

  function openLightbox() {
    restoreFocusRef.current = document.activeElement as HTMLElement;
    setLightboxOpen(true);
  }

  function closeLightbox() {
    setLightboxOpen(false);
  }

  function step(direction: 1 | -1) {
    setActive((index) => (index + direction + screenshots.length) % screenshots.length);
  }

  useEffect(() => {
    if (!lightboxOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        closeLightbox();
        return;
      }

      if (event.key === "ArrowRight") {
        event.preventDefault();
        step(1);
        return;
      }

      if (event.key === "ArrowLeft") {
        event.preventDefault();
        step(-1);
        return;
      }

      if (event.key !== "Tab" || !overlayRef.current) return;

      const focusable = Array.from(
        overlayRef.current.querySelectorAll<HTMLElement>(
          'button:not([disabled]), [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
        ),
      );
      if (focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = previousOverflow;
      restoreFocusRef.current?.focus();
    };
  }, [lightboxOpen]);

  return (
    <div>
      <div
        role="tablist"
        aria-label="Product views"
        className="flex gap-6 overflow-x-auto border-b border-rule pb-3 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {screenshots.map((shot, index) => (
          <button
            key={shot.id}
            ref={(node) => {
              tabRefs.current[index] = node;
            }}
            type="button"
            role="tab"
            id={tabId(index)}
            aria-selected={index === active}
            aria-controls={panelId}
            tabIndex={index === active ? 0 : -1}
            onClick={() => selectTab(index)}
            onKeyDown={(event) => onTabKeyDown(event, index)}
            className={`relative shrink-0 pb-1 text-[0.8125rem] font-medium transition-colors ${
              index === active ? "text-ink" : "text-graphite hover:text-ink"
            }`}
          >
            {shot.view}
            <span
              aria-hidden="true"
              className={`absolute right-0 -bottom-3 left-0 h-px transition-opacity ${
                index === active ? "bg-ink opacity-100" : "opacity-0"
              }`}
            />
          </button>
        ))}
      </div>

      <div
        role="tabpanel"
        id={panelId}
        aria-labelledby={tabId(active)}
        tabIndex={0}
        className="mt-6 outline-none"
      >
        <div className="overflow-hidden rounded-[16px] border border-rule bg-paper p-1.5">
          <div className="relative aspect-[16/10] overflow-hidden rounded-[11px] border border-rule bg-mist">
            {screenshots.map((shot, index) => (
              <img
                key={shot.id}
                src={shot.src}
                alt={index === active ? shot.alt : ""}
                width={shot.width}
                height={shot.height}
                loading={index === 0 ? "eager" : "lazy"}
                decoding="async"
                aria-hidden={index === active ? undefined : "true"}
                className={`absolute inset-0 size-full object-cover transition-opacity duration-[350ms] ${
                  index === active ? "opacity-100" : "opacity-0"
                }`}
              />
            ))}
          </div>
        </div>

        <div className="mt-4 flex flex-wrap items-center justify-between gap-4">
          <p className="text-[0.8125rem] leading-6 text-graphite">
            {current.view} view of the ServerDesk desktop workspace.
          </p>
          <button
            type="button"
            onClick={openLightbox}
            className="inline-flex items-center gap-2 text-[0.8125rem] font-medium text-ink underline decoration-rule underline-offset-4 transition-colors hover:decoration-ink"
          >
            <ArrowsOutIcon className="size-4" aria-hidden="true" />
            View larger
          </button>
        </div>
      </div>

      {lightboxOpen
        ? createPortal(
            <div
              ref={overlayRef}
              role="dialog"
              aria-modal="true"
              aria-labelledby={titleId}
              className="fixed inset-0 z-[80] flex flex-col bg-band/95 p-4 text-band-foreground backdrop-blur-sm md:p-6"
              onMouseDown={(event) => {
                if (event.target === event.currentTarget) closeLightbox();
              }}
            >
              <div className="flex items-center justify-between gap-4">
                <p id={titleId} className="font-mono text-[0.75rem] text-band-foreground/70">
                  {current.view}
                </p>
                <button
                  ref={closeRef}
                  type="button"
                  onClick={closeLightbox}
                  className="inline-flex size-10 items-center justify-center rounded-[10px] border border-band-foreground/25 text-band-foreground transition-colors hover:bg-band-foreground/10"
                  aria-label="Close larger view"
                >
                  <XIcon className="size-5" aria-hidden="true" />
                </button>
              </div>

              <div className="flex min-h-0 flex-1 items-center justify-center gap-3 py-4 md:gap-6 md:py-8">
                <button
                  type="button"
                  onClick={() => step(-1)}
                  aria-label="Previous view"
                  className="inline-flex size-10 shrink-0 items-center justify-center rounded-[10px] border border-band-foreground/25 text-band-foreground transition-colors hover:bg-band-foreground/10"
                >
                  <ArrowLeftIcon className="size-4" aria-hidden="true" />
                </button>

                <img
                  src={current.src}
                  alt={current.alt}
                  width={current.width}
                  height={current.height}
                  className="max-h-full min-h-0 w-auto max-w-full rounded-[10px] border border-band-foreground/15 object-contain"
                />

                <button
                  type="button"
                  onClick={() => step(1)}
                  aria-label="Next view"
                  className="inline-flex size-10 shrink-0 items-center justify-center rounded-[10px] border border-band-foreground/25 text-band-foreground transition-colors hover:bg-band-foreground/10"
                >
                  <ArrowRightIcon className="size-4" aria-hidden="true" />
                </button>
              </div>

              <p className="mx-auto max-w-[70ch] text-center text-[0.8125rem] leading-6 text-band-foreground/60">
                {current.alt}
              </p>
            </div>,
            document.body,
          )
        : null}
    </div>
  );
}
