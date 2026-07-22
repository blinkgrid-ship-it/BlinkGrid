interface ProductProgressRailProps {
  count: number;
  activeIndex: number;
  onSelect: (index: number) => void;
}

/**
 * A small, non-sticky progress indicator inside the Products section — real,
 * genuinely clickable buttons that scroll to the corresponding shipped
 * project. No routing; scrolls within the existing homepage only.
 */
export default function ProductProgressRail({ count, activeIndex, onSelect }: ProductProgressRailProps) {
  return (
    <div className="product-rail" role="group" aria-label="Shipped products progress">
      <ol className="product-rail__list">
        {Array.from({ length: count }, (_, i) => (
          <li key={i} className="product-rail__item">
            <button
              type="button"
              className={`product-rail__marker ${i === activeIndex ? "product-rail__marker--active" : ""}`}
              onClick={() => onSelect(i)}
              aria-current={i === activeIndex ? "true" : undefined}
              aria-label={`Go to product ${i + 1} of ${count}`}
            >
              <span className="product-rail__marker-index">0{i + 1}</span>
            </button>
            {i < count - 1 && <span className="product-rail__connector" aria-hidden="true" />}
          </li>
        ))}
      </ol>
    </div>
  );
}
