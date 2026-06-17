import { useState } from "react";
import {
  ArrowRight, Mail, MessageCircle,
  Code2, Globe, Layers, Zap, Users, Award,
  Menu, X, ChevronRight, ArrowUpRight,
} from "lucide-react";
import DemoModal from "./components/DemoModal";

// ── Social icons (inline SVG — avoids lucide export issues) ───────────────────
const SOCIALS = [
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/company/blinkgrid/",
    svg: (
      <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14zM8.34 18.34V9.99H5.67v8.35h2.67zM7 8.82a1.55 1.55 0 1 0 0-3.1 1.55 1.55 0 0 0 0 3.1zm11.34 9.52v-4.58c0-2.45-1.31-3.59-3.06-3.59-1.41 0-2.04.78-2.39 1.32v-1.14h-2.67c.04.75 0 8.35 0 8.35h2.67v-4.66c0-.24.02-.48.09-.65.19-.48.63-.97 1.37-.97.97 0 1.36.74 1.36 1.82v4.46h2.63z"/>
      </svg>
    ),
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/blinkgrid.official/",
    svg: (
      <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
      </svg>
    ),
  },
  {
    label: "Facebook",
    href: "https://www.facebook.com/profile.php?id=61590734521470&sk=about",
    svg: (
      <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
      </svg>
    ),
  },
];

// ── Products ──────────────────────────────────────────────────────────────────
type Product = {
  name: string;
  tagline: string;
  description: string;
  tag: string;
  tagLabel: string;
  cta: string;
  ctaType: "link" | "demo" | "soon";
  href: string;
  icon: string;
  thumbnail: string;
  thumbnailAlt: string;
};

const PRODUCTS: Product[] = [
  {
    name: "TestCrack",
    tagline: "AI-powered exam preparation",
    description:
      "Adaptive mock tests, real-time analytics, and personalised study plans for competitive exam aspirants. Built for scale.",
    tag: "live", tagLabel: "Live",
    cta: "Visit Platform", ctaType: "link" as const,
    href: "https://www.testcrack.com/",
    icon: "🎯",
    thumbnail: "https://api.microlink.io/?url=https%3A%2F%2Fwww.testcrack.com%2F&screenshot=true&meta=false&embed=screenshot.url",
    thumbnailAlt: "TestCrack platform screenshot",
  },
  {
    name: "Pala Homes",
    tagline: "Real estate, reimagined",
    description:
      "A modern property search experience with verified listings, virtual tours, and AI-driven matching for home seekers.",
    tag: "live", tagLabel: "Live",
    cta: "Request Demo", ctaType: "demo" as const,
    href: "",
    icon: "🏡",
    thumbnail: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=600&q=80&auto=format&fit=crop",
    thumbnailAlt: "Modern real estate property listing",
  },
  {
    name: "Original Script",
    tagline: "Content creation at scale",
    description:
      "End-to-end content pipeline for brands — scriptwriting, production coordination, and campaign management in one place.",
    tag: "live", tagLabel: "Live",
    cta: "Visit Site", ctaType: "link" as const,
    href: "https://original-script.vercel.app/",
    icon: "✍️",
    thumbnail: "https://api.microlink.io/?url=https%3A%2F%2Foriginal-script.vercel.app%2F&screenshot=true&meta=false&embed=screenshot.url",
    thumbnailAlt: "Original Script platform screenshot",
  },
  {
    name: "FTS — Natural Extracts",
    tagline: "Field Tracking System",
    description:
      "Live field-agent tracking, task dispatch, and performance dashboards built for operations-heavy businesses.",
    tag: "live", tagLabel: "Live",
    cta: "Visit Site", ctaType: "link" as const,
    href: "https://new.fruition.in.net/",
    icon: "📡",
    thumbnail: "https://api.microlink.io/?url=https%3A%2F%2Fnew.fruition.in.net%2F&screenshot=true&meta=false&embed=screenshot.url",
    thumbnailAlt: "FTS Natural Extracts platform screenshot",
  },
  {
    name: "Malayalam University",
    tagline: "St. Thomas Malayalam University",
    description:
      "A comprehensive web platform for St. Thomas Malayalam University — academics, admissions, and student resources, unified.",
    tag: "live", tagLabel: "Live",
    cta: "Visit Site", ctaType: "link" as const,
    href: "https://www.malayalamuniversity.org/",
    icon: "🎓",
    thumbnail: "https://api.microlink.io/?url=https%3A%2F%2Fwww.malayalamuniversity.org%2F&screenshot=true&meta=false&embed=screenshot.url",
    thumbnailAlt: "Malayalam University website screenshot",
  },
];

const SERVICES = [
  { icon: <Globe size={20} />, title: "Web & Mobile Development", desc: "Full-stack products built with modern frameworks — React, Next.js, React Native, Node.js. From MVP to enterprise scale." },
  { icon: <Layers size={20} />, title: "Product Design & UI/UX", desc: "User research, wireframing, and pixel-perfect interfaces. We design systems that scale alongside your product." },
  { icon: <Code2 size={20} />, title: "Custom Software Solutions", desc: "Bespoke software for complex workflows — integrations, automations, dashboards, and internal tools." },
  { icon: <Zap size={20} />, title: "AI & Automation", desc: "Embed intelligence into your operations — recommendation engines, document processing, conversational AI, and more." },
  { icon: <Users size={20} />, title: "Tech Consulting", desc: "Architecture reviews, team augmentation, and technology strategy to help you make confident technical decisions." },
  { icon: <Award size={20} />, title: "Quality Engineering", desc: "End-to-end QA, automated testing pipelines, and performance audits to ship with confidence every release." },
];

const STATS = [
  { value: "5+", label: "Products Launched" },
  { value: "3+", label: "Years Building" },
  { value: "20+", label: "Projects Delivered" },
  { value: "100%", label: "Client Satisfaction" },
];

const NAV_LINKS = ["About", "Products", "Services", "Contact"];

// ── Product Card ──────────────────────────────────────────────────────────────
function ProductCard({ p, onDemo }: { p: Product; onDemo: (name: string) => void }) {
  const [imgError, setImgError] = useState(false);

  return (
    <div className="card" style={{ padding: 0, display: "flex", flexDirection: "column", overflow: "hidden" }}>
      {/* Thumbnail */}
      <div style={{
        width: "100%", height: 180, overflow: "hidden", position: "relative",
        background: "var(--surface-alt)", borderBottom: "1px solid var(--line)", flexShrink: 0,
      }}>
        {!imgError ? (
          <img
            src={p.thumbnail}
            alt={p.thumbnailAlt}
            onError={() => setImgError(true)}
            style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top", display: "block" }}
          />
        ) : (
          /* Fallback — icon-based placeholder */
          <div style={{
            width: "100%", height: "100%", display: "flex", flexDirection: "column",
            alignItems: "center", justifyContent: "center", gap: 10,
            background: "linear-gradient(135deg, var(--surface-alt) 0%, var(--green-soft) 100%)",
          }}>
            <span style={{ fontSize: "2.8rem" }}>{p.icon}</span>
            <span style={{ fontSize: "0.75rem", fontWeight: 600, color: "var(--ink-soft)", letterSpacing: "0.04em" }}>{p.name.toUpperCase()}</span>
          </div>
        )}
        {/* Live badge overlay */}
        <span
          className={`tag tag-${p.tag}`}
          style={{ position: "absolute", top: 12, right: 12 }}
        >
          {p.tagLabel}
        </span>
      </div>

      {/* Card body */}
      <div style={{ padding: "24px 28px 28px", display: "flex", flexDirection: "column", gap: 14, flex: 1 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{
            width: 40, height: 40, borderRadius: 8, background: "var(--surface-alt)",
            border: "1px solid var(--line)", display: "flex", alignItems: "center",
            justifyContent: "center", fontSize: "1.2rem", flexShrink: 0,
          }}>{p.icon}</div>
          <div>
            <h3 className="font-display" style={{ fontWeight: 700, fontSize: "1.1rem", marginBottom: 2 }}>{p.name}</h3>
            <p style={{ color: "var(--green)", fontSize: "0.78rem", fontWeight: 600, letterSpacing: "0.02em" }}>{p.tagline}</p>
          </div>
        </div>

        <p style={{ color: "var(--ink-soft)", fontSize: "0.9rem", lineHeight: 1.65 }}>{p.description}</p>

        <div style={{ marginTop: "auto", paddingTop: 4 }}>
          {p.ctaType === "link" && (
            <a href={p.href} target="_blank" rel="noreferrer"
              style={{ display: "inline-flex", alignItems: "center", gap: 6, color: "var(--ink)", fontFamily: "Syne, sans-serif", fontSize: "0.88rem", fontWeight: 700, textDecoration: "none", borderBottom: "2px solid var(--green)", paddingBottom: 2 }}>
              {p.cta} <ArrowUpRight size={15} />
            </a>
          )}
          {p.ctaType === "demo" && (
            <button onClick={() => onDemo(p.name)}
              style={{ background: "none", border: "none", cursor: "pointer", display: "inline-flex", alignItems: "center", gap: 6, color: "var(--ink)", fontFamily: "Syne, sans-serif", fontSize: "0.88rem", fontWeight: 700, padding: 0, borderBottom: "2px solid var(--green)", paddingBottom: 2 }}>
              {p.cta} <ArrowRight size={14} />
            </button>
          )}
          {p.ctaType === "soon" && (
            <span style={{ color: "var(--ink-soft)", fontSize: "0.88rem", fontWeight: 600 }}>Coming Soon</span>
          )}
        </div>
      </div>
    </div>
  );
}

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalProduct, setModalProduct] = useState("");

  const openDemo = (product = "") => { setModalProduct(product); setModalOpen(true); };
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  // Split products: first row (3) + last row (2, centred)
  const firstRow = PRODUCTS.slice(0, 3);
  const lastRow = PRODUCTS.slice(3);

  return (
    <div style={{ background: "var(--bg)", minHeight: "100vh" }}>

      <style>{`
        @media (max-width: 768px) {
          .hidden-mobile { display: none !important; }
          .show-mobile { display: flex !important; }
          .two-col { grid-template-columns: 1fr !important; gap: 48px !important; }
          .services-grid { grid-template-columns: 1fr !important; }
          .products-row { grid-template-columns: 1fr !important; }
          .stats-grid { grid-template-columns: 1fr 1fr !important; }
          .footer-grid { flex-direction: column !important; gap: 40px !important; }
          .hero-h1 { font-size: 2.6rem !important; }
        }
        @media (min-width: 769px) {
          .show-mobile { display: none !important; }
          .products-row { grid-template-columns: repeat(3, 1fr) !important; }
          .services-grid { grid-template-columns: repeat(3, 1fr) !important; }
        }
      `}</style>

      {/* ── Navbar ── */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 50,
        borderBottom: "1px solid var(--line)",
        background: "rgba(251,250,247,0.9)", backdropFilter: "blur(12px)",
      }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px", height: 72, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <button onClick={() => scrollTo("top")}
            className="font-display"
            style={{ background: "none", border: "none", cursor: "pointer", fontWeight: 800, fontSize: "1.3rem", letterSpacing: "0.04em", color: "var(--ink)" }}>
            BLINK<span style={{ color: "var(--green)" }}>GRID</span>
          </button>

          <div style={{ display: "flex", alignItems: "center", gap: 34 }} className="hidden-mobile">
            {NAV_LINKS.map(l => (
              <button key={l} className="nav-link" onClick={() => scrollTo(l.toLowerCase())}>{l}</button>
            ))}
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <button className="btn-ghost hidden-mobile" style={{ padding: "11px 24px" }} onClick={() => scrollTo("contact")}>
              Contact
            </button>
            <button style={{ background: "none", border: "none", color: "var(--ink)", cursor: "pointer" }} className="show-mobile" onClick={() => setMenuOpen(!menuOpen)}>
              {menuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {menuOpen && (
          <div style={{ background: "var(--surface)", borderTop: "1px solid var(--line)", padding: "12px 24px 20px", display: "flex", flexDirection: "column" }}>
            {NAV_LINKS.map(l => (
              <button key={l} onClick={() => scrollTo(l.toLowerCase())}
                style={{ background: "none", border: "none", color: "var(--ink)", fontFamily: "Syne, sans-serif", fontWeight: 600, fontSize: "1.05rem", padding: "14px 0", textAlign: "left", cursor: "pointer", borderBottom: "1px solid var(--line)" }}>
                {l}
              </button>
            ))}
          </div>
        )}
      </nav>

      <div id="top" />

      {/* ── Hero ── */}
      <section className="dot-grid" style={{ paddingTop: 72 }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "100px 24px 90px" }}>
          <div style={{ maxWidth: 760 }}>
            <div className="eyebrow" style={{ marginBottom: 22 }}>Software Studio · Kochi, India</div>
            <h1 className="font-display hero-h1" style={{ fontSize: "clamp(2.6rem, 6.5vw, 4.6rem)", fontWeight: 800, lineHeight: 1.05, letterSpacing: "-0.03em", marginBottom: 26 }}>
              We build products<br />
              <span style={{ color: "var(--green)" }}>people actually use.</span>
            </h1>
            <p style={{ fontSize: "clamp(1.05rem, 2vw, 1.25rem)", color: "var(--ink-soft)", lineHeight: 1.65, maxWidth: 540, marginBottom: 38 }}>
              BlinkGrid turns ambitious ideas into live products — from concept through to scale.
              We ship, then we iterate.
            </p>
            <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
              <button className="btn-primary" onClick={() => scrollTo("products")}>
                See Our Work <ArrowRight size={17} />
              </button>
              <button className="btn-ghost" onClick={() => scrollTo("contact")}>Talk to Us</button>
            </div>
          </div>
        </div>
      </section>

      {/* ── Stats strip ── */}
      <section style={{ background: "var(--ink)" }}>
        <div className="stats-grid" style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px", display: "grid", gridTemplateColumns: "repeat(4, 1fr)" }}>
          {STATS.map((s, i) => (
            <div key={s.label} style={{ padding: "44px 20px", textAlign: "center", borderLeft: i === 0 ? "none" : "1px solid rgba(255,255,255,0.1)" }}>
              <div className="font-display" style={{ fontSize: "2.4rem", fontWeight: 800, color: "#fff", marginBottom: 6 }}>{s.value}</div>
              <div style={{ fontSize: "0.82rem", color: "rgba(255,255,255,0.6)", fontWeight: 500, letterSpacing: "0.03em" }}>{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── About ── */}
      <section id="about" style={{ maxWidth: 1200, margin: "0 auto", padding: "110px 24px" }}>
        <div className="two-col" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "center" }}>
          <div>
            <div className="eyebrow" style={{ marginBottom: 18 }}>About BlinkGrid</div>
            <h2 className="font-display" style={{ fontSize: "clamp(1.9rem, 3.2vw, 2.8rem)", fontWeight: 800, lineHeight: 1.15, letterSpacing: "-0.02em", marginBottom: 24 }}>
              A studio that<br />thinks in products
            </h2>
            <p style={{ color: "var(--ink-soft)", lineHeight: 1.8, fontSize: "1rem", marginBottom: 18 }}>
              BlinkGrid is a Kochi-based software studio. We don't just write code — we build businesses. Our team combines product thinking with engineering depth to create software that solves real problems and grows with you.
            </p>
            <p style={{ color: "var(--ink-soft)", lineHeight: 1.8, fontSize: "1rem", marginBottom: 34 }}>
              From consumer apps to enterprise platforms, we've launched products across EdTech, Real Estate, Media, and Operations — each built with the same attention to craft and commercial clarity.
            </p>
            <button className="btn-ghost" onClick={() => scrollTo("contact")}>Work with us <ChevronRight size={16} /></button>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            {[
              { label: "Engineering-first culture", desc: "We own problems from design to deployment. No handoffs, no silos." },
              { label: "Speed without shortcuts", desc: "We move fast and maintain quality — tested, documented, production-ready." },
              { label: "Long-term partnerships", desc: "We build relationships, not just deliverables. Many clients stay with us for years." },
            ].map(item => (
              <div key={item.label} className="card" style={{ padding: "22px 26px", display: "flex", gap: 18, alignItems: "flex-start" }}>
                <div style={{ width: 34, height: 34, borderRadius: 6, background: "var(--green-soft)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <span style={{ width: 8, height: 8, borderRadius: "50%", background: "var(--green)" }} />
                </div>
                <div>
                  <div className="font-display" style={{ fontWeight: 700, fontSize: "1rem", marginBottom: 5 }}>{item.label}</div>
                  <div style={{ color: "var(--ink-soft)", fontSize: "0.9rem", lineHeight: 1.6 }}>{item.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Products ── */}
      <section id="products" style={{ background: "var(--surface-alt)", borderTop: "1px solid var(--line)", borderBottom: "1px solid var(--line)" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "110px 24px" }}>
          <div style={{ marginBottom: 56, maxWidth: 620 }}>
            <div className="eyebrow" style={{ marginBottom: 16 }}>Our Work</div>
            <h2 className="font-display" style={{ fontSize: "clamp(1.9rem, 3.2vw, 2.8rem)", fontWeight: 800, letterSpacing: "-0.02em", marginBottom: 14 }}>
              Products we've shipped
            </h2>
            <p style={{ color: "var(--ink-soft)", fontSize: "1rem", lineHeight: 1.7 }}>
              Five products across education, real estate, media, operations, and academia.
            </p>
          </div>

          {/* Row 1 — 3 cards */}
          <div className="products-row" style={{ display: "grid", gap: 20, marginBottom: 20 }}>
            {firstRow.map(p => (
              <ProductCard key={p.name} p={p} onDemo={openDemo} />
            ))}
          </div>

          {/* Row 2 — 2 cards, centred */}
          <div style={{ display: "flex", justifyContent: "center", gap: 20, flexWrap: "wrap" }}>
            {lastRow.map(p => (
              <div key={p.name} style={{ width: "calc(33.333% - 10px)", minWidth: 260 }} className="products-last-row-item">
                <ProductCard p={p} onDemo={openDemo} />
              </div>
            ))}
          </div>

          <style>{`
            @media (max-width: 768px) {
              .products-last-row-item { width: 100% !important; }
            }
          `}</style>
        </div>
      </section>

      {/* ── Services ── */}
      <section id="services" style={{ maxWidth: 1200, margin: "0 auto", padding: "110px 24px" }}>
        <div style={{ marginBottom: 56, maxWidth: 620 }}>
          <div className="eyebrow" style={{ marginBottom: 16 }}>Our Expertise</div>
          <h2 className="font-display" style={{ fontSize: "clamp(1.9rem, 3.2vw, 2.8rem)", fontWeight: 800, letterSpacing: "-0.02em", marginBottom: 14 }}>
            Transforming ideas into reality
          </h2>
          <p style={{ color: "var(--ink-soft)", fontSize: "1rem", lineHeight: 1.7 }}>
            The full stack of capabilities to take your idea from zero to shipped.
          </p>
        </div>

        <div className="services-grid" style={{ display: "grid", gap: 20 }}>
          {SERVICES.map(s => (
            <div key={s.title} className="card" style={{ padding: "30px" }}>
              <div style={{ width: 46, height: 46, borderRadius: 10, background: "var(--green-soft)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--green-deep)", marginBottom: 20 }}>{s.icon}</div>
              <h3 className="font-display" style={{ fontWeight: 700, fontSize: "1.05rem", marginBottom: 10 }}>{s.title}</h3>
              <p style={{ color: "var(--ink-soft)", fontSize: "0.9rem", lineHeight: 1.7 }}>{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Contact ── */}
      <section id="contact" style={{ background: "var(--surface-alt)", borderTop: "1px solid var(--line)" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "110px 24px" }}>
          <div className="two-col" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "flex-start" }}>
            <div>
              <div className="eyebrow" style={{ marginBottom: 16 }}>Get in Touch</div>
              <h2 className="font-display" style={{ fontSize: "clamp(1.9rem, 3.2vw, 2.8rem)", fontWeight: 800, lineHeight: 1.15, letterSpacing: "-0.02em", marginBottom: 20 }}>
                Let's talk about<br />your next build
              </h2>
              <p style={{ color: "var(--ink-soft)", lineHeight: 1.8, fontSize: "1rem", marginBottom: 40 }}>
                Whether you have a fully-formed idea or just a problem worth solving, we'd love to hear from you.
              </p>

              <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                <a href="mailto:blinkgrid@gmail.com" style={{ display: "flex", alignItems: "center", gap: 16, textDecoration: "none", color: "var(--ink)" }}>
                  <div style={{ width: 46, height: 46, borderRadius: 10, background: "var(--surface)", border: "1px solid var(--line)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--green)", flexShrink: 0 }}><Mail size={18} /></div>
                  <div>
                    <div style={{ fontSize: "0.75rem", color: "var(--ink-soft)", marginBottom: 2 }}>Email us</div>
                    <div style={{ fontWeight: 600, fontSize: "0.95rem" }}>blinkgrid@gmail.com</div>
                  </div>
                </a>
                <a href="https://wa.me/919995684689" target="_blank" rel="noreferrer" style={{ display: "flex", alignItems: "center", gap: 16, textDecoration: "none", color: "var(--ink)" }}>
                  <div style={{ width: 46, height: 46, borderRadius: 10, background: "var(--surface)", border: "1px solid var(--line)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--green)", flexShrink: 0 }}><MessageCircle size={18} /></div>
                  <div>
                    <div style={{ fontSize: "0.75rem", color: "var(--ink-soft)", marginBottom: 2 }}>WhatsApp</div>
                    <div style={{ fontWeight: 600, fontSize: "0.95rem" }}>+91 99956 84689</div>
                  </div>
                </a>
              </div>
            </div>

            <div className="card" style={{ padding: "38px", background: "var(--surface)" }}>
              <h3 className="font-display" style={{ fontWeight: 700, fontSize: "1.2rem", marginBottom: 8 }}>Send us a message</h3>
              <p style={{ color: "var(--ink-soft)", fontSize: "0.9rem", marginBottom: 28 }}>We reply within 24 hours.</p>
              <ContactForm onDemoRequest={openDemo} />
            </div>
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer style={{ background: "var(--ink)", color: "rgba(255,255,255,0.7)" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "64px 24px 40px" }}>
          <div className="footer-grid" style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 48 }}>
            <div style={{ maxWidth: 300 }}>
              <div className="font-display" style={{ fontWeight: 800, fontSize: "1.3rem", letterSpacing: "0.04em", color: "#fff", marginBottom: 16 }}>
                BLINK<span style={{ color: "var(--green)" }}>GRID</span>
              </div>
              <p style={{ fontSize: "0.9rem", lineHeight: 1.7, marginBottom: 24 }}>
                A software studio from Kochi, Kerala. We build products that matter.
              </p>
              <div style={{ display: "flex", gap: 12 }}>
                {SOCIALS.map(s => (
                  <a key={s.label} href={s.href} target="_blank" rel="noreferrer" aria-label={s.label}
                    style={{ width: 40, height: 40, borderRadius: 8, background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.12)", display: "flex", alignItems: "center", justifyContent: "center", color: "rgba(255,255,255,0.7)", textDecoration: "none", transition: "background 0.2s, color 0.2s" }}
                    onMouseEnter={e => { e.currentTarget.style.background = "var(--green)"; e.currentTarget.style.color = "#fff"; }}
                    onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,255,255,0.06)"; e.currentTarget.style.color = "rgba(255,255,255,0.7)"; }}>
                    {s.svg}
                  </a>
                ))}
              </div>
            </div>

            <div style={{ display: "flex", gap: 64, flexWrap: "wrap" }}>
              <div>
                <div className="font-display" style={{ fontWeight: 700, fontSize: "0.85rem", color: "#fff", marginBottom: 16, letterSpacing: "0.03em" }}>PRODUCTS</div>
                <div style={{ display: "flex", flexDirection: "column", gap: 11 }}>
                  {PRODUCTS.map(p => (
                    <a key={p.name} href={p.href || undefined} target={p.href ? "_blank" : undefined} rel="noreferrer"
                      onClick={p.href ? undefined : () => openDemo(p.name)}
                      style={{ color: "rgba(255,255,255,0.7)", fontSize: "0.88rem", textDecoration: "none", cursor: "pointer" }}
                      onMouseEnter={e => (e.currentTarget.style.color = "#fff")}
                      onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.7)")}>
                      {p.name}
                    </a>
                  ))}
                </div>
              </div>
              <div>
                <div className="font-display" style={{ fontWeight: 700, fontSize: "0.85rem", color: "#fff", marginBottom: 16, letterSpacing: "0.03em" }}>COMPANY</div>
                <div style={{ display: "flex", flexDirection: "column", gap: 11 }}>
                  {["About", "Services", "Contact"].map(l => (
                    <button key={l} onClick={() => scrollTo(l.toLowerCase())}
                      style={{ background: "none", border: "none", color: "rgba(255,255,255,0.7)", fontSize: "0.88rem", cursor: "pointer", textAlign: "left", padding: 0 }}
                      onMouseEnter={e => (e.currentTarget.style.color = "#fff")}
                      onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.7)")}>
                      {l}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div style={{ height: 1, background: "rgba(255,255,255,0.1)", marginBottom: 24 }} />
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
            <p style={{ fontSize: "0.8rem" }}>© {new Date().getFullYear()} BlinkGrid. All rights reserved.</p>
            <p style={{ fontSize: "0.8rem" }}>Built in Kochi, Kerala 🇮🇳</p>
          </div>
        </div>
      </footer>

      <DemoModal isOpen={modalOpen} onClose={() => setModalOpen(false)} product={modalProduct} />
    </div>
  );
}

// ── Inline Contact Form ───────────────────────────────────────────────────────
// ── Inline Contact Form ───────────────────────────────────────────────────────
function ContactForm({ onDemoRequest }: { onDemoRequest: (product: string) => void }) {
  // 1. Added 'whatsapp' to the form state
  const [form, setForm] = useState({ name: "", email: "", whatsapp: "", message: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [sent, setSent] = useState(false);

  const validate = () => {
    const e: Record<string, string> = {};
    
    if (!form.name.trim()) e.name = "Required";

    // 2. Strict Email Validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!form.email.trim()) {
      e.email = "Required";
    } else if (!emailRegex.test(form.email)) {
      e.email = "Please enter a valid email address";
    }

    // 3. Strict WhatsApp Validation (Allows optional '+' and requires 10-15 digits)
    const phoneRegex = /^\+?[1-9]\d{9,14}$/;
    const cleanPhone = form.whatsapp.replace(/[\s-]/g, ''); // strip spaces/dashes for testing
    if (!form.whatsapp.trim()) {
      e.whatsapp = "Required";
    } else if (!phoneRegex.test(cleanPhone)) {
      e.whatsapp = "Please enter a valid mobile number";
    }

    if (!form.message.trim()) e.message = "Required";
    
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const submit = async () => {
    if (!validate()) return;

    // 4. TestCrack-style WhatsApp integration
    const BLINKGRID_WHATSAPP = "919995684689"; 
    const messageText = encodeURIComponent(
      `Hi BlinkGrid team! New contact request:\n\nName: ${form.name}\nEmail: ${form.email}\nWhatsApp: ${form.whatsapp}\n\nMessage: ${form.message}`
    );

    window.open(`https://wa.me/${BLINKGRID_WHATSAPP}?text=${messageText}`, '_blank');
    
    setSent(true);
  };

  if (sent) return (
    <div style={{ textAlign: "center", padding: "24px 0" }}>
      <div style={{ fontSize: "2rem", marginBottom: 12 }}>✅</div>
      <h4 className="font-display" style={{ fontWeight: 700, marginBottom: 8 }}>Redirecting to WhatsApp...</h4>
      <p style={{ color: "var(--ink-soft)", fontSize: "0.9rem" }}>You can now send your message to us directly.</p>
    </div>
  );

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <div>
        <input className={`field ${errors.name ? "field-error" : ""}`} placeholder="Your name" value={form.name}
          onChange={e => { setForm(f => ({ ...f, name: e.target.value })); setErrors(er => ({ ...er, name: "" })); }} />
        {errors.name && <p style={{ color: "#DC2626", fontSize: "0.75rem", marginTop: 4 }}>{errors.name}</p>}
      </div>
      
      <div>
        <input className={`field ${errors.email ? "field-error" : ""}`} placeholder="Email address" type="email" value={form.email}
          onChange={e => { setForm(f => ({ ...f, email: e.target.value })); setErrors(er => ({ ...er, email: "" })); }} />
        {errors.email && <p style={{ color: "#DC2626", fontSize: "0.75rem", marginTop: 4 }}>{errors.email}</p>}
      </div>

      {/* New WhatsApp Field Input */}
      <div>
        <input className={`field ${errors.whatsapp ? "field-error" : ""}`} placeholder="WhatsApp Number (e.g., +91 9876543210)" type="tel" value={form.whatsapp}
          onChange={e => { setForm(f => ({ ...f, whatsapp: e.target.value })); setErrors(er => ({ ...er, whatsapp: "" })); }} />
        {errors.whatsapp && <p style={{ color: "#DC2626", fontSize: "0.75rem", marginTop: 4 }}>{errors.whatsapp}</p>}
      </div>

      <div>
        <textarea className={`field ${errors.message ? "field-error" : ""}`} placeholder="Tell us about your project..." rows={4} value={form.message}
          style={{ resize: "vertical" }}
          onChange={e => { setForm(f => ({ ...f, message: e.target.value })); setErrors(er => ({ ...er, message: "" })); }} />
        {errors.message && <p style={{ color: "#DC2626", fontSize: "0.75rem", marginTop: 4 }}>{errors.message}</p>}
      </div>
      
      {/* Updated CTA text to match the new behavior */}
      <button className="btn-primary" onClick={submit} style={{ justifyContent: "center" }}>Send via WhatsApp</button>
      
      <p style={{ textAlign: "center", color: "var(--ink-soft)", fontSize: "0.8rem" }}>
        Need a product demo?{" "}
        <button onClick={() => onDemoRequest("")}
          style={{ background: "none", border: "none", color: "var(--green)", cursor: "pointer", fontWeight: 600, fontSize: "0.8rem" }}>
          Request one here
        </button>
      </p>
    </div>
  );
}