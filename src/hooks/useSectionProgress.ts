import { useEffect, useState } from "react";

/**
 * Tracks which element in a list of DOM ids currently sits closest to the
 * vertical centre of the viewport, for a scroll-driven "chapter" progress
 * indicator. Uses IntersectionObserver only — no scroll-position polling.
 */
export function useSectionProgress(ids: string[]): number {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const elements = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((entry) => entry.isIntersecting);
        if (visible.length === 0) return;

        const viewportCenter = window.innerHeight / 2;
        const closest = visible.reduce((best, entry) => {
          const bestCenter = best.boundingClientRect.top + best.boundingClientRect.height / 2;
          const entryCenter = entry.boundingClientRect.top + entry.boundingClientRect.height / 2;
          return Math.abs(entryCenter - viewportCenter) < Math.abs(bestCenter - viewportCenter) ? entry : best;
        });

        const index = elements.findIndex((el) => el === closest.target);
        if (index !== -1) setActive(index);
      },
      { threshold: [0.3, 0.5, 0.7], rootMargin: "-35% 0px -35% 0px" }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [ids]);

  return active;
}
