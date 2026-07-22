import type { ReactNode } from "react";

interface FooterProduct { name: string; href: string; }
interface FooterSocial { label: string; href: string; svg: ReactNode; }

interface FooterProps {
  products: FooterProduct[];
  socials: FooterSocial[];
  onNavigate: (id: string) => void;
  onDemo: (name: string) => void;
}

export default function Footer({ products, socials, onNavigate, onDemo }: FooterProps) {
  return (
    <footer className="site-footer">
      <div className="site-footer__inner">
        <div className="site-footer__top">
          <div className="site-footer__brand">
            <img
              src="/brand/blinkgrid-logo-transparent.png"
              alt="BlinkGrid"
              width={149}
              height={48}
              className="site-footer__logo-img"
            />
            <p className="site-footer__statement">
              A software studio from Kochi, Kerala. We build products that matter.
            </p>
            <div className="site-footer__socials">
              {socials.map((s) => (
                <a key={s.label} href={s.href} target="_blank" rel="noreferrer" aria-label={s.label} className="site-footer__social">
                  {s.svg}
                </a>
              ))}
            </div>
          </div>

          <div className="site-footer__columns">
            <div className="site-footer__column">
              <div className="site-footer__column-title font-display">Products</div>
              {products.map((p) =>
                p.href ? (
                  <a key={p.name} href={p.href} target="_blank" rel="noopener noreferrer" className="site-footer__link">
                    {p.name}
                  </a>
                ) : (
                  <button key={p.name} type="button" className="site-footer__link" onClick={() => onDemo(p.name)}>
                    {p.name}
                  </button>
                )
              )}
            </div>
            <div className="site-footer__column">
              <div className="site-footer__column-title font-display">Company</div>
              {["About", "Services", "Contact"].map((l) => (
                <button key={l} type="button" className="site-footer__link" onClick={() => onNavigate(l.toLowerCase())}>
                  {l}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="site-footer__divider" />

        <div className="site-footer__bottom">
          <p>© {new Date().getFullYear()} BlinkGrid. All rights reserved.</p>
          <p>Built in Kochi, Kerala 🇮🇳</p>
        </div>
      </div>
    </footer>
  );
}
