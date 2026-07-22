const PROOF_POINTS = [
  "Product strategy to engineering",
  "Web, mobile and practical AI systems",
  "Five publicly presented projects",
  "Built in Kochi",
];

export default function ProofStrip() {
  return (
    <div className="proof-strip" aria-label="What we do">
      <ul className="proof-strip__list">
        {PROOF_POINTS.map((point, i) => (
          <li key={point} className="proof-strip__item">
            <span className="proof-strip__index">0{i + 1}</span>
            <span>{point}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
