import RevealOnScroll from "./RevealOnScroll";

const PRINCIPLES = [
  { n: "01", text: "Engineering and product thinking stay connected." },
  { n: "02", text: "Move quickly without sacrificing production quality." },
  { n: "03", text: "Build software that can improve after launch." },
];

export default function Manifesto() {
  return (
    <section id="about" className="manifesto">
      <div className="manifesto__inner">
        <RevealOnScroll className="manifesto__intro">
          <span className="eyebrow">About BlinkGrid</span>
          <h2 className="font-display manifesto__heading">A studio that thinks in products</h2>
          <p className="manifesto__statement">
            We think in products, not deliverables — every build is judged by whether people
            actually use it.
          </p>
        </RevealOnScroll>

        <RevealOnScroll className="manifesto__detail">
          <p className="manifesto__paragraph">
            BlinkGrid is a Kochi-based software studio. We don&apos;t just write code — we build
            businesses. Our team combines product thinking with engineering depth to create
            software that solves real problems and grows with you.
          </p>
          <p className="manifesto__paragraph">
            From consumer apps to enterprise platforms, we&apos;ve launched products across EdTech,
            Real Estate, Media, and Operations — each built with the same attention to craft and
            commercial clarity.
          </p>

          <ol className="manifesto__principles">
            {PRINCIPLES.map((p) => (
              <li key={p.n} className="manifesto__principle">
                <span className="manifesto__principle-number font-display">{p.n}</span>
                <span className="manifesto__principle-text">{p.text}</span>
              </li>
            ))}
          </ol>
        </RevealOnScroll>
      </div>
    </section>
  );
}
