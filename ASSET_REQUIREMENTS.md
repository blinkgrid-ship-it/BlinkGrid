# Asset Requirements — BlinkGrid Kinetic Product Studio Redesign

Tracks every real screenshot/visual asset still needed. Nothing listed here has been fabricated — Phase 1 ships honest local placeholders (icon + real product name/tagline, no invented interfaces) everywhere a real asset is missing.

## Hero product-interface mosaic (Phase 1 — shipped as honest placeholders)

The mosaic in the new hero currently renders icon + name + tagline tiles for all five projects, with no screenshot imagery at all (per the instruction to avoid Microlink/Unsplash/stock photography in the new hero). Real interface screenshots would upgrade these tiles in a later phase:

- [ ] **TestCrack** — real product screenshot (1200×800 recommended, consistent aspect ratio across all five).
- [ ] **Pala Homes** — real product screenshot. No public link exists today (opens the demo-request modal); if no live UI exists yet, confirm whether a clearly-labeled "coming soon" placeholder is preferred instead of a screenshot.
- [ ] **Original Script** — real product screenshot.
- [ ] **FTS — Natural Extracts** — real product screenshot.
- [ ] **Malayalam University** — real product screenshot.

## Existing Products section (unchanged in Phase 1 — pre-existing issue, not fixed yet)

The "Products we've shipped" cards further down the page still use their original thumbnails, which have known issues carried over from before this redesign:

- [ ] TestCrack, Original Script, FTS — Natural Extracts, Malayalam University thumbnails currently load from the third-party `api.microlink.io` live-screenshot service — fragile/rate-limited for production use. Local static screenshots would replace this dependency.
- [ ] Pala Homes thumbnail is currently a generic Unsplash stock photo unrelated to the actual product — the most misleading current asset. Needs either a real screenshot or an honest "preview coming soon" placeholder.

## Metadata (not yet built — future phase)

- [ ] Open Graph / social preview image — no such asset exists today.
- [ ] Favicon — `index.html` currently references `/vite.svg`, but the real brand icon in `public/` is `favicon.svg`. Not changed in Phase 1 (out of the explicit Phase 1 scope); flagged for correction.

## Not needed / explicitly out of scope for Phase 1

- No new icon or illustration assets were required — the hero mosaic reuses the same emoji glyphs already present in the existing product data (`🎯🏡✍️📡🎓`).
