import { useEffect, useRef, useState } from "react";
import { ArrowRight, Menu, X } from "lucide-react";

interface HeaderProps {
  navLinks: string[];
  onNavigate: (id: string) => void;
  onCta: () => void;
}

export default function Header({ navLinks, onNavigate, onCta }: HeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const firstLinkRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const closeMenu = () => {
    setMenuOpen(false);
    toggleRef.current?.focus();
  };

  const handleNavigate = (id: string) => {
    onNavigate(id);
    setMenuOpen(false);
  };

  useEffect(() => {
    if (!menuOpen) return;
    firstLinkRef.current?.focus();

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeMenu();
    };
    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <header
      className={`site-header ${scrolled ? "site-header--solid" : ""} ${menuOpen ? "site-header--menu-open" : ""}`}
    >
      <div className="site-header__bar">
        <button
          type="button"
          className="site-header__logo font-display"
          onClick={() => handleNavigate("top")}
          aria-label="BlinkGrid — go to top"
        >
          BLINK<span className="site-header__logo-accent">GRID</span>
        </button>

        <nav className="site-header__nav" aria-label="Primary">
          {navLinks.map((link) => (
            <button
              key={link}
              type="button"
              className="site-header__link"
              onClick={() => handleNavigate(link.toLowerCase())}
            >
              {link}
            </button>
          ))}
        </nav>

        <div className="site-header__actions">
          <button type="button" className="btn-lime site-header__cta" onClick={() => { onCta(); setMenuOpen(false); }}>
            Start a Project <ArrowRight size={15} aria-hidden="true" />
          </button>
          <button
            type="button"
            ref={toggleRef}
            className="site-header__toggle"
            onClick={() => setMenuOpen((open) => !open)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
          >
            {menuOpen ? <X size={26} aria-hidden="true" /> : <Menu size={26} aria-hidden="true" />}
          </button>
        </div>
      </div>

      <nav id="mobile-menu" className="site-header__mobile-menu" aria-label="Mobile" aria-hidden={!menuOpen}>
        {navLinks.map((link, i) => (
          <button
            key={link}
            ref={i === 0 ? firstLinkRef : undefined}
            type="button"
            tabIndex={menuOpen ? 0 : -1}
            className="site-header__mobile-link"
            onClick={() => handleNavigate(link.toLowerCase())}
          >
            {link}
          </button>
        ))}
        <button
          type="button"
          tabIndex={menuOpen ? 0 : -1}
          className="btn-lime site-header__mobile-cta"
          onClick={() => { onCta(); setMenuOpen(false); }}
        >
          Start a Project <ArrowRight size={16} aria-hidden="true" />
        </button>
      </nav>
    </header>
  );
}
