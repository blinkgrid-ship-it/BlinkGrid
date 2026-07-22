import ProjectPanel, { type ProjectPanelData } from "./ProjectPanel";
import RevealOnScroll from "./RevealOnScroll";

interface MoreWorkProps {
  projects: ProjectPanelData[];
  onDemo: (name: string) => void;
}

export default function MoreWork({ projects, onDemo }: MoreWorkProps) {
  return (
    <section className="more-work">
      <div className="more-work__intro">
        <span className="eyebrow">More Work</span>
        <h2 className="font-display more-work__heading">Also shipped</h2>
      </div>
      <div className="more-work__rows">
        {projects.map((project) => (
          <RevealOnScroll key={project.name} className="more-work__row">
            <ProjectPanel project={project} size="md" onDemo={onDemo} />
          </RevealOnScroll>
        ))}
      </div>
    </section>
  );
}
