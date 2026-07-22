import ProjectPanel, { type ProjectPanelData } from "./ProjectPanel";
import RevealOnScroll from "./RevealOnScroll";

interface MoreWorkProps {
  projects: ProjectPanelData[];
  onDemo: (name: string) => void;
  /** Global index (across Featured + More Work) that this section's first project continues from. */
  startIndex: number;
}

export default function MoreWork({ projects, onDemo, startIndex }: MoreWorkProps) {
  return (
    <section className="more-work">
      <RevealOnScroll className="more-work__intro">
        <span className="eyebrow">More Work</span>
        <h2 className="font-display more-work__heading">Also shipped</h2>
      </RevealOnScroll>
      <div className="more-work__rows">
        {projects.map((project, i) => (
          <RevealOnScroll key={project.name} id={`shipped-project-${startIndex + i}`} className="more-work__row">
            <span className={`visual-glow visual-glow--${project.pattern}`} aria-hidden="true" />
            <ProjectPanel project={project} size="md" onDemo={onDemo} />
          </RevealOnScroll>
        ))}
      </div>
    </section>
  );
}
