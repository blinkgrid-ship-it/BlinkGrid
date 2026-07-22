import { useState } from "react";
import { Box, GraduationCap, Globe, Layers, Palette, ShoppingCart } from "lucide-react";

const SERVICES = [
  {
    icon: <Globe size={22} aria-hidden="true" />,
    title: "Custom Web & App Development",
    desc: "Full-stack development across web, iOS, and Android for businesses across multiple sectors.",
  },
  {
    icon: <GraduationCap size={22} aria-hidden="true" />,
    title: "LMS & EdTech Platforms",
    desc: "Course delivery, assessments, and analytics platforms informed by TestCrack and Malayalam University project experience.",
  },
  {
    icon: <ShoppingCart size={22} aria-hidden="true" />,
    title: "E-commerce & Custom ERP",
    desc: "Digital storefronts and custom back-office systems that support day-to-day business operations, including work for Fruition.",
  },
  {
    icon: <Box size={22} aria-hidden="true" />,
    title: "3D / WebGL Immersive UI",
    desc: "Three.js-powered, animation-led digital experiences and immersive interfaces, including Pala Homes.",
  },
  {
    icon: <Layers size={22} aria-hidden="true" />,
    title: "CMS for Institutions & Communities",
    desc: "Content platforms for churches, nonprofits, educational institutions, and cultural organisations, including Original Script.",
  },
  {
    icon: <Palette size={22} aria-hidden="true" />,
    title: "UI/UX Design & Modernization",
    desc: "Clean, accessible, modern redesigns for legacy institutional software and outdated digital experiences.",
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
