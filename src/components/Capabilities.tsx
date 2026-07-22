import { useState } from "react";
import { Award, Code2, Globe, Layers, Users, Zap } from "lucide-react";

const SERVICES = [
  {
    icon: <Globe size={22} aria-hidden="true" />,
    title: "Web & Mobile Development",
    desc: "Full-stack products built with modern frameworks — React, Next.js, React Native, Node.js. From MVP to enterprise scale.",
  },
  {
    icon: <Layers size={22} aria-hidden="true" />,
    title: "Product Design & UI/UX",
    desc: "User research, wireframing, and pixel-perfect interfaces. We design systems that scale alongside your product.",
  },
  {
    icon: <Code2 size={22} aria-hidden="true" />,
    title: "Custom Software Solutions",
    desc: "Bespoke software for complex workflows — integrations, automations, dashboards, and internal tools.",
  },
  {
    icon: <Zap size={22} aria-hidden="true" />,
    title: "AI & Automation",
    desc: "Embed intelligence into your operations — recommendation engines, document processing, conversational AI, and more.",
  },
  {
    icon: <Users size={22} aria-hidden="true" />,
    title: "Tech Consulting",
    desc: "Architecture reviews, team augmentation, and technology strategy to help you make confident technical decisions.",
  },
  {
    icon: <Award size={22} aria-hidden="true" />,
    title: "Quality Engineering",
    desc: "End-to-end QA, automated testing pipelines, and performance audits to ship with confidence every release.",
  },
];

export default function Capabilities() {
  const [active, setActive] = useState(0);

  return (
    <section id="services" className="capabilities">
      <div className="capabilities__intro">
        <span className="eyebrow eyebrow--on-dark">Our Expertise</span>
        <h2 className="font-display capabilities__heading">Transforming ideas into reality</h2>
      </div>

      <div className="capabilities__body">
        <ul className="capabilities__list" role="list">
          {SERVICES.map((s, i) => (
            <li key={s.title}>
              <button
                type="button"
                className={`capabilities__item ${active === i ? "capabilities__item--active" : ""}`}
                onClick={() => setActive(i)}
                onFocus={() => setActive(i)}
                onMouseEnter={() => setActive(i)}
                aria-expanded={active === i}
                aria-controls={`capability-panel-${i}`}
              >
                <span className="capabilities__item-index font-display">0{i + 1}</span>
                <span className="capabilities__item-title font-display">{s.title}</span>
              </button>
              <div
                id={`capability-panel-${i}`}
                role="region"
                aria-label={s.title}
                className={`capabilities__accordion ${active === i ? "capabilities__accordion--open" : ""}`}
              >
                <p>{s.desc}</p>
              </div>
            </li>
          ))}
        </ul>

        <div className="capabilities__detail" key={active} aria-live="polite">
          <span className="capabilities__detail-icon">{SERVICES[active].icon}</span>
          <h3 className="font-display capabilities__detail-title">{SERVICES[active].title}</h3>
          <p className="capabilities__detail-desc">{SERVICES[active].desc}</p>
        </div>
      </div>
    </section>
  );
}
