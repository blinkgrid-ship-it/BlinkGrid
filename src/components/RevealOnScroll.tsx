import { useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";
import { useReducedMotion } from "../hooks/useReducedMotion";

interface RevealOnScrollProps {
  children: ReactNode;
  className?: string;
  /** Optional reveal direction consumed by descendant CSS via data-direction. Defaults to "up" (existing behaviour, unchanged). */
  direction?: "left" | "right" | "up" | "full";
  /** Optional id, forwarded to the wrapper div — used by scroll-to-section / IntersectionObserver targeting. */
  id?: string;
}

export default function RevealOnScroll({ children, className = "", direction = "up", id }: RevealOnScrollProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion || !ref.current) {
      setVisible(true);
      return;
    }
    const el = ref.current;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [reducedMotion]);

  return (
    <div
      ref={ref}
      id={id}
      className={`reveal ${className}`}
      data-animate={reducedMotion ? "false" : "true"}
      data-visible={visible ? "true" : "false"}
      data-direction={direction}
    >
      {children}
    </div>
  );
}
