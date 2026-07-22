import RevealOnScroll from "./RevealOnScroll";

const STEPS = [
  { n: "01", title: "Discover", desc: "Understand the problem, users and constraints." },
  { n: "02", title: "Define", desc: "Clarify the smallest useful product and technical direction." },
  { n: "03", title: "Build", desc: "Design, engineer and test the production experience." },
  { n: "04", title: "Improve", desc: "Use feedback and real usage to guide the next release." },
];

export default function Process() {
  return (
    <section className="process">
      <div className="process__intro">
        <span className="eyebrow">How We Work</span>
        <h2 className="font-display process__heading">A straightforward process</h2>
      </div>

      <RevealOnScroll>
        <ol className="process__rail">
          {STEPS.map((step) => (
            <li key={step.n} className="process__step">
              <span className="process__step-number font-display">{step.n}</span>
              <h3 className="font-display process__step-title">{step.title}</h3>
              <p className="process__step-desc">{step.desc}</p>
            </li>
          ))}
        </ol>
      </RevealOnScroll>
    </section>
  );
}
