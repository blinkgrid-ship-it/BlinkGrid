import { useRef } from "react";
import { ArrowRight } from "lucide-react";
import HeroProductGrid from "./HeroProductGrid";
import ProofStrip from "./ProofStrip";
import type { ProjectPanelData } from "./ProjectPanel";
import { useReducedMotion } from "../hooks/useReducedMotion";

interface HeroProps {
  projects: ProjectPanelData[];
  onPrimaryCta: () => void;
  onSecondaryCta: () => void;
  onDemo: (name: string) => void;
}

export default function Hero({ projects, onPrimaryCta, onSecondaryCta, onDemo }: HeroProps) {
  const reducedMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);

  const handlePointerMove = (e: React.PointerEvent<HTMLElement>) => {
    if (reducedMotion || !sectionRef.current) return;
    const rect = sectionRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    sectionRef.current.style.setProperty("--pointer-x", `${x}%`);
    sectionRef.current.style.setProperty("--pointer-y", `${y}%`);
  };

  return (
    <section ref={sectionRef} id="top" className="hero hero--interactive" onPointerMove={handlePointerMove}>
      <div className="hero__inner">
        <div className="hero__copy">
          <span className="eyebrow eyebrow--on-dark hero__eyebrow">
            Independent software and product studio · Kochi, India
          </span>
          <h1 className="font-display hero__headline">
            We design and ship software people choose to use.
          </h1>
          <p className="hero__subhead">
            Product strategy, UX design, web and mobile engineering, and practical AI
            automation—from first prototype to scalable product.
          </p>
          <div className="hero__ctas">
            <button type="button" className="btn-lime" onClick={onPrimaryCta}>
              View Our Work <ArrowRight size={17} aria-hidden="true" />
            </button>
            <button type="button" className="btn-ghost btn-ghost--on-dark" onClick={onSecondaryCta}>
              Start a Project
            </button>
          </div>
        </div>

        <div className="hero__grid-wrap">
          <HeroProductGrid projects={projects} onDemo={onDemo} />
        </div>
      </div>

      <ProofStrip />
    </section>
  );
}
