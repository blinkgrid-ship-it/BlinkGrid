// src/App.tsx
import { useState } from "react";
import DemoModal from "./components/DemoModal";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Manifesto from "./components/Manifesto";
import FeaturedWork from "./components/FeaturedWork";
import MoreWork from "./components/MoreWork";
import Capabilities from "./components/Capabilities";
import Process from "./components/Process";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import type { ProjectPanelData, ProjectPattern } from "./components/ProjectPanel";
import { useReducedMotion } from "./hooks/useReducedMotion";

import testcrackHero from "./assets/projects/testcrack-thumb-hero.jpg";
import testcrackFeatured from "./assets/projects/testcrack-thumb-featured.jpg";
import palaHomesHero from "./assets/projects/pala-homes-thumb-hero.jpg";
import palaHomesFeatured from "./assets/projects/pala-homes-thumb-featured.jpg";
import originalScriptHero from "./assets/projects/original-script-thumb-hero.jpg";
import originalScriptFeatured from "./assets/projects/original-script-thumb-featured.jpg";
import ftsHero from "./assets/projects/fts-thumb-hero.jpg";
import ftsFeatured from "./assets/projects/fts-thumb-featured.jpg";
import malayalamUniversityHero from "./assets/projects/malayalam-university-thumb-hero.jpg";
import malayalamUniversityFeatured from "./assets/projects/malayalam-university-thumb-featured.jpg";

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

// ── Products (facts, URLs, WhatsApp/email details — unchanged from before) ────
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

// Category label per product, drawn directly from the existing, already-published
// copy ("Five products across education, real estate, media, operations, and
// academia.") — not invented. Drives each panel's accent colour and, together
// with the real screenshots below, its visual identity.
const CATEGORY_META: Record<
  string,
  {
    label: string;
    pattern: ProjectPattern;
    heroImage: { src: string; alt: string };
    featuredImage: { src: string; alt: string };
  }
> = {
  "TestCrack": {
    label: "EdTech",
    pattern: "edtech",
    heroImage: { src: testcrackHero, alt: "TestCrack website — the 'Hidden roadblocks limiting your growth' product section" },
    featuredImage: { src: testcrackFeatured, alt: "TestCrack website — the 'Hidden roadblocks limiting your growth' product section with feature cards" },
  },
  "Pala Homes": {
    label: "Real Estate",
    pattern: "realestate",
    heroImage: { src: palaHomesHero, alt: "Pala Homes homepage — dark cinematic hero with the Pala Homes wordmark and city skyline" },
    featuredImage: { src: palaHomesFeatured, alt: "Pala Homes homepage — dark cinematic hero with the Pala Homes wordmark, tagline and city skyline" },
  },
  "Original Script": {
    label: "Media",
    pattern: "media",
    heroImage: { src: originalScriptHero, alt: "Original Script homepage hero — 'The Original Script' scriptural intelligence platform" },
    featuredImage: { src: originalScriptFeatured, alt: "Original Script homepage hero — 'The Original Script' scriptural intelligence platform" },
  },
  "FTS — Natural Extracts": {
    label: "Operations",
    pattern: "operations",
    heroImage: { src: ftsHero, alt: "Fruition Natural Extracts homepage hero — 'Pure Spice Extracts, Globally Trusted' with product imagery" },
    featuredImage: { src: ftsFeatured, alt: "Fruition Natural Extracts homepage hero — spice and extract imagery with product statistics" },
  },
  "Malayalam University": {
    label: "Academia",
    pattern: "academia",
    heroImage: { src: malayalamUniversityHero, alt: "St. Thomas Malayalam University homepage hero — 'Rooted in Faith. Grounded in Heritage.'" },
    featuredImage: { src: malayalamUniversityFeatured, alt: "St. Thomas Malayalam University homepage hero — 'Rooted in Faith. Grounded in Heritage.' with navigation" },
  },
};

const PANEL_PROJECTS: ProjectPanelData[] = PRODUCTS.map((p) => ({
  name: p.name,
  tagline: p.tagline,
  description: p.description,
  category: CATEGORY_META[p.name].label,
  pattern: CATEGORY_META[p.name].pattern,
  heroImage: CATEGORY_META[p.name].heroImage,
  featuredImage: CATEGORY_META[p.name].featuredImage,
  tagLabel: p.tagLabel,
  ctaLabel: p.cta,
  ctaType: p.ctaType,
  href: p.href,
}));

// Featured Work = first 3 (TestCrack, Pala Homes, Original Script); More Work = the rest.
const FEATURED_PROJECTS = PANEL_PROJECTS.slice(0, 3);
const MORE_PROJECTS = PANEL_PROJECTS.slice(3);

const NAV_LINKS = ["About", "Products", "Services", "Contact"];

export default function App() {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalProduct, setModalProduct] = useState("");
  const reducedMotion = useReducedMotion();

  const openDemo = (product = "") => { setModalProduct(product); setModalOpen(true); };
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: reducedMotion ? "auto" : "smooth" });
  };

  return (
    <div className="site">
      <Header navLinks={NAV_LINKS} onNavigate={scrollTo} onCta={() => scrollTo("contact")} />

      <Hero
        projects={PANEL_PROJECTS}
        onPrimaryCta={() => scrollTo("products")}
        onSecondaryCta={() => scrollTo("contact")}
        onDemo={openDemo}
      />

      <Manifesto />

      <FeaturedWork projects={FEATURED_PROJECTS} onDemo={openDemo} />
      <MoreWork projects={MORE_PROJECTS} onDemo={openDemo} />

      <Capabilities />
      <Process />

      <Contact onDemoRequest={openDemo} />

      <Footer
        products={PRODUCTS.map((p) => ({ name: p.name, href: p.href }))}
        socials={SOCIALS}
        onNavigate={scrollTo}
        onDemo={openDemo}
      />

      <DemoModal isOpen={modalOpen} onClose={() => setModalOpen(false)} product={modalProduct} />
    </div>
  );
}
