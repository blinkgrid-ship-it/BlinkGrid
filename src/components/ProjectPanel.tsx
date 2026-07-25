import { useEffect, useRef, type CSSProperties } from "react";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { useReducedMotion } from "../hooks/useReducedMotion";

export type ProjectPattern = "edtech" | "realestate" | "media" | "operations" | "academia";

/** Corner the live text overlay anchors to — chosen per image to sit in its
 *  safest negative space and never cover the dominant subject or logo. */
export type OverlayPosition = "bottom-left" | "bottom-right" | "top-left" | "top-right";

/** Per-project overlay palette, applied as CSS custom properties so the live
 *  HTML overlay harmonises with each thumbnail's own colours. `surface` is an
 *  "r, g, b" triplet consumed with varying alpha by the scrim gradient. */
export interface OverlayTheme {
  surface: string;
  text: string;
  textSoft: string;
  accent: string;
  accent2?: string;
}

export interface ProjectImage {
  src: string;
  alt: string;
}

export interface ProjectPanelData {
  name: string;
  tagline: string;
  description?: string;
  category: string;
  pattern: ProjectPattern;
  tagLabel: string;
  ctaLabel: string;
  ctaType: "link" | "demo" | "soon";
  href: string;
  /** Tighter crop used for the small hero-grid tiles. */
  heroImage: ProjectImage;
  /** Wider, more immersive crop used for Featured Work / More Work. */
  featuredImage: ProjectImage;
  /** Overlay anchor corner (defaults to bottom-left). */
  overlayPosition?: OverlayPosition;
  /** Overlay colour palette (defaults to the neutral midnight treatment). */
  overlayTheme?: OverlayTheme;
}

interface ProjectPanelProps {
  project: ProjectPanelData;
  size?: "sm" | "md" | "lg";
  onDemo?: (name: string) => void;
  className?: string;
}

/**
 * A real, locally-stored screenshot of the live project — never a fabricated
 * interface. See ASSET_REQUIREMENTS.md for provenance/crop notes per project.
 */
export default function ProjectPanel({ project, size = "sm", onDemo, className = "" }: ProjectPanelProps) {
  const { name, tagline, category, pattern, tagLabel, ctaLabel, ctaType, href, featuredImage, overlayPosition = "bottom-left", overlayTheme } = project;
  // Every panel — including the small hero tiles — shows the full 16:9 banner so
  // the complete artwork is visible uncropped at all sizes.
  const image = featuredImage;

  // Overlay palette flows in as CSS custom properties so the live HTML overlay
  // can tint itself per project without any per-project stylesheet.
  const themeStyle = overlayTheme
    ? ({
        "--ov-surface": overlayTheme.surface,
        "--ov-text": overlayTheme.text,
        "--ov-text-soft": overlayTheme.textSoft,
        "--ov-accent": overlayTheme.accent,
        "--ov-accent2": overlayTheme.accent2 ?? overlayTheme.accent,
      } as CSSProperties)
    : undefined;
  const panelRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  // Subtle pointer-responsive tilt — Featured Work / More Work panels only,
  // fine pointers only, never under reduced motion, resets on pointer leave.
  useEffect(() => {
    if (size === "sm" || reducedMotion) return;
    if (typeof window === "undefined" || !window.matchMedia("(pointer: fine)").matches) return;
    const el = panelRef.current;
    if (!el) return;

    let frame = 0;
    const reset = () => {
      el.style.setProperty("--tilt-rx", "0deg");
      el.style.setProperty("--tilt-ry", "0deg");
      el.style.setProperty("--tilt-tx", "0px");
      el.style.setProperty("--tilt-ty", "0px");
    };
    const handleMove = (e: PointerEvent) => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        const rect = el.getBoundingClientRect();
        const px = (e.clientX - rect.left) / rect.width - 0.5;
        const py = (e.clientY - rect.top) / rect.height - 0.5;
        el.style.setProperty("--tilt-ry", `${px * 4}deg`);
        el.style.setProperty("--tilt-rx", `${-py * 4}deg`);
        el.style.setProperty("--tilt-tx", `${px * 10}px`);
        el.style.setProperty("--tilt-ty", `${py * 10}px`);
        frame = 0;
      });
    };

    el.addEventListener("pointermove", handleMove);
    el.addEventListener("pointerleave", reset);
    return () => {
      el.removeEventListener("pointermove", handleMove);
      el.removeEventListener("pointerleave", reset);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [size, reducedMotion]);

  const cta =
    ctaType === "link" ? (
      <a href={href} target="_blank" rel="noopener noreferrer" className="project-panel__cta">
        {ctaLabel} <ArrowUpRight size={16} aria-hidden="true" />
      </a>
    ) : ctaType === "demo" ? (
      <button type="button" className="project-panel__cta" onClick={() => onDemo?.(name)}>
        {ctaLabel} <ArrowRight size={16} aria-hidden="true" />
      </button>
    ) : (
      <span className="project-panel__cta project-panel__cta--soon">Coming Soon</span>
    );

  return (
    <div
      ref={panelRef}
      className={`project-panel project-panel--${size} project-panel--${pattern} project-panel--pos-${overlayPosition} ${className}`}
      style={themeStyle}
    >
      <span className="project-panel__top-bar" aria-hidden="true" />
      <img
        className="project-panel__image"
        src={image.src}
        alt={image.alt}
        loading={size === "sm" ? "eager" : "lazy"}
      />
      <div className="project-panel__scrim" aria-hidden="true" />

      <div className="project-panel__top">
        <span className="project-panel__status">
          <span className="project-panel__status-dot" aria-hidden="true" />
          {tagLabel}
        </span>
        <span className="project-panel__category">{category}</span>
      </div>

      {/* Size-aware overlay hierarchy — the source artwork already carries the
          project's own branding/headline, so the live overlay stays deliberately
          light and never duplicates content shown beside the panel:
            sm  (hero grid)     → project name only (status/category sit up top)
            md  (More Work)     → name + one tagline + CTA (no description)
            lg  (Featured Work) → CTA only; name/tagline/description live in the
                                   adjacent text column, so the art stays focal. */}
      <div className="project-panel__body">
        {size !== "sm" && <span className="project-panel__accent" aria-hidden="true" />}
        {size === "md" && <h3 className="font-display project-panel__name">{name}</h3>}
        {size === "md" && <p className="project-panel__tagline">{tagline}</p>}
        {size !== "sm" && <div className="project-panel__cta-row">{cta}</div>}
      </div>
    </div>
  );
}
