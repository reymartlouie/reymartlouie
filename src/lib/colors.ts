// Central color palette — import from here instead of redefining per-component.
// Dark-card accent themes share the same 3-slot (base / dim / glow) structure.

// ── AboutCard & Quote (blue on dark bg) ───────────────────────────────────────
export const cardBlue = {
  base: 'rgba(160,210,255,0.80)',
  dim:  'rgba(160,210,255,0.45)',
  glow: 'rgba(160,210,255,0.18)',
}

// ── TechStackCard (mint on dark bg) ───────────────────────────────────────────
export const cardMint = {
  base:      'rgba(167,220,195,0.80)',
  dim:       'rgba(167,220,195,0.45)',
  glow:      'rgba(167,220,195,0.18)',
  tagBg:     'rgba(10,30,22,0.55)',
  tagBorder: 'rgba(167,220,195,0.22)',
}

// ── CenturionCard (gold on dark bg) ───────────────────────────────────────────
export const cardGold = {
  base: '#c9a84c',
  dim:  'rgba(201,168,76,0.50)',
  hint: 'rgba(201,168,76,0.12)',
}

// ── PayPalCard (PayPal blue + white overlays on black) ────────────────────────
export const paypalTheme = {
  blue:       '#009cde',
  whiteDim:   'rgba(255,255,255,0.45)',
  whiteFaint: 'rgba(255,255,255,0.15)',
}
