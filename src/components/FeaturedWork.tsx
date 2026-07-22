import ProjectPanel, { type ProjectPanelData } from "./ProjectPanel";
import ProductProgressRail from "./ProductProgressRail";
import RevealOnScroll from "./RevealOnScroll";

interface FeaturedWorkProps {
  projects: ProjectPanelData[];
  onDemo: (name: string) => void;
  activeIndex: number;
  totalCount: number;
  onSelectProgress: (index: number) => void;
}

export default function FeaturedWork({ projects, onDemo, activeIndex, totalCount, onSelectProgress }: FeaturedWorkProps) {
  return (
    <section id="products" className="featured-work">
      <div className="featured-work__intro">
        <span className="eyebrow">Featured Work</span>
        <h2 className="font-display featured-work__heading">Products we&apos;ve shipped</h2>
        <p className="featured-work__lede">
          Five products across education, real estate, media, operations, and academia — three
          shown in depth below.
        </p>
        <ProductProgressRail count={totalCount} activeIndex={activeIndex} onSelect={onSelectProgress} />
      </div>

      {projects.map((project, i) => (
        <RevealOnScroll
          key={project.name}
          id={`shipped-project-${i}`}
          direction={i === 2 ? "full" : i % 2 === 0 ? "left" : "right"}
          className={`featured-work__row ${
            i === 2 ? "featured-work__row--full" : i % 2 === 0 ? "featured-work__row--a" : "featured-work__row--b"
          }`}
        >
          <div className="featured-work__visual">
            <span className={`visual-glow visual-glow--${project.pattern}`} aria-hidden="true" />
            <ProjectPanel project={project} size="lg" onDemo={onDemo} />
          </div>
          <div className="featured-work__info">
            <span className="featured-work__index font-display">0{i + 1}</span>
            <h3 className="font-display featured-work__name">{project.name}</h3>
            <p className="featured-work__tagline">{project.tagline}</p>
            <p className="featured-work__description">{project.description}</p>
          </div>
        </RevealOnScroll>
      ))}
    </section>
  );
}
