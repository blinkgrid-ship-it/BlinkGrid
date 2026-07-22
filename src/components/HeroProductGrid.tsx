import { useEffect, useState } from "react";
import ProjectPanel, { type ProjectPanelData } from "./ProjectPanel";
import { useReducedMotion } from "../hooks/useReducedMotion";

interface HeroProductGridProps {
  projects: ProjectPanelData[];
  onDemo: (name: string) => void;
}

// An asymmetric, offset composition of project panels — deliberately not a
// grid of five equal cards. Runs one controlled staggered load-in animation.
export default function HeroProductGrid({ projects, onDemo }: HeroProductGridProps) {
  const reducedMotion = useReducedMotion();
  const [loaded, setLoaded] = useState(reducedMotion);

  useEffect(() => {
    if (reducedMotion) return;
    const t = window.setTimeout(() => setLoaded(true), 80);
    return () => window.clearTimeout(t);
  }, [reducedMotion]);

  return (
    <div className="hero-grid" role="list" aria-label="Products we have shipped">
      {projects.map((project, i) => (
        <div
          key={project.name}
          role="listitem"
          className={`hero-grid__cell hero-grid__cell--${i} ${loaded ? "hero-grid__cell--in" : ""}`}
          style={{ transitionDelay: reducedMotion ? "0ms" : `${i * 90}ms` }}
        >
          <ProjectPanel project={project} size="sm" onDemo={onDemo} />
        </div>
      ))}
    </div>
  );
}
