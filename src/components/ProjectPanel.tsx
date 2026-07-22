import { ArrowRight, ArrowUpRight } from "lucide-react";

export type ProjectPattern = "edtech" | "realestate" | "media" | "operations" | "academia";

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
  const { name, tagline, description, category, pattern, tagLabel, ctaLabel, ctaType, href, heroImage, featuredImage } = project;
  const image = size === "sm" ? heroImage : featuredImage;

  const cta =
    ctaType === "link" ? (
      <a href={href} target="_blank" rel="noreferrer" className="project-panel__cta">
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
    <div className={`project-panel project-panel--${size} project-panel--${pattern} ${className}`}>
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

      <div className="project-panel__body">
        <h3 className="font-display project-panel__name">{name}</h3>
        <p className="project-panel__tagline">{tagline}</p>
        {size !== "sm" && description && <p className="project-panel__description">{description}</p>}
        {size !== "sm" && <div className="project-panel__cta-row">{cta}</div>}
      </div>
    </div>
  );
}
