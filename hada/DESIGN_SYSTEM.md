# HADA Design System v0.1 — "Cartographer"

Governing register: **50% research institute · 20% Financial Times · 15% Apple · 10% Stripe · 5% MIT Media Lab.**
Governing principle: *trust before beauty; evidence before opinion.* Every visual element must either carry information or carry authority. Nothing decorative survives review.

## 1. Surfaces

| Token | Value | Use |
|---|---|---|
| `--paper` | `#FAF7F0` | page ground — warm archival paper, never startup white |
| `--paper-2` | `#F4EFE4` | plates, figure wells, footer |
| `--paper-3` | `#EDE6D6` | hard-shadow offset on the dossier card |
| `--ink` | `#131C26` | headings, frames, the cite block ground |
| `--ink-2` | `#3B4856` | body text |
| `--ink-3` | `#6D7885` | kickers, captions, metadata |
| `--hairline` | `rgba(19,28,38,.16)` | rules and borders — 1px always |
| `--accent` | `#93321F` | oxide red. Rules, links, contradiction, section numbers. **Scarce by design** — if a page is >2% accent, it is wrong. |

## 2. Confidence scale (semantic — never decorative)

| Grade | Color | Meaning |
|---|---|---|
| Robust | `#1E5F47` | ≥3 independent studies, ≥2 designs, replicated, no unresolved contradiction |
| Moderate | `#8A6D1E` | consistent core, confined contexts/horizons |
| Limited | `#A85C1C` | single study or setting |
| Contested | `#93321F` | credible studies disagree; dashed stroke |
| Insufficient | `#5E6B77` | no usable evidence; **dashed hollow** — a gap has no fill because it has no content |

These five colors appear **only** as grades. Using them for anything else corrupts the encoding.

## 3. Typography

- **Display serif — Newsreader** (opsz axis): headlines, claims, footer mission. Academic without being antique. Weight 500, tight leading (1.06 for h1), letter-spacing −0.022em.
- **Text sans — Inter**: body, UI. 1.0625rem / 1.72.
- **Mono — IBM Plex Mono**: identifiers, kickers, figure numbers, evidence metadata, legends. Mono is HADA's "instrument voice" — anything measured, coded, or registered speaks in mono.
- Italic serif in oxide red = the *emphasis of conviction* (hero: "actually know"). Use once per screen at most.

## 4. Layout

- Container 1140px; section rhythm 6.5rem; hairline rule between every section.
- Kickers: `NN — SECTION NAME` mono smallcaps with a trailing hairline that runs to the margin (FT device).
- Grids are ruled, not carded: ledgers, frameworks, principles are border-separated rows — no drop shadows, no rounded corners anywhere. The single exception: the dossier's hard offset shadow (`6px 6px 0 --paper-3`), a printed-plate gesture, used once per page.

## 5. Core components

- **Claim card / dossier** — framed 1px ink; header = domain line + serif claim + ID chip + grade badge; body = 7/5 split (evidence | contradiction, uncertainty, citation).
- **Evidence item** — source line (bold name, gray venue) + design tag (mono, boxed) + finding. Every number in a finding traces to the named source.
- **Grade badge** — dot + mono smallcaps in grade color, 1px border. Insufficient's dot is dashed-hollow.
- **Contradiction panel** — oxide hairline frame, ≠ mark, A/B poles, moderator note. Ends with the house line: *records the disagreement; does not vote.*
- **Uncertainty panel** — dashed border, `?` bullets: "what would change this grade."
- **Citation block** — ink ground, mono, copy button. The only dark surface on the page: citation is the product, so it gets the strongest figure-ground.
- **Claim identifier** — `HADA·W-001 · v0.1` mono chip. Anatomy documented in §10 of the homepage.
- **Gap card** — dashed borders + 45° hatch ground (the map's "uncharted" texture carried into components).

## 6. Cartographic language (Plate I)

Graticule + cartouche + legend + evidence frontier + hatched uncharted region. Rules:
- Node **area = independent studies on file** (sqrt scale; r = 14·√n). If the count isn't backed by a dossier, the caption says "provisional."
- Positions are editorial and the caption says so. Never imply computed layout.
- Contested edges: dashed oxide, slow dash-drift animation (the only ambient motion on the page).
- Gaps are drawn *inside* the map. The uncharted region is content, not background.

## 7. Motion

Scroll-reveal only: 14px rise + fade, 0.7s, once. Dash-drift on contested edges. Arrow nudge on link hover. Everything honors `prefers-reduced-motion`. No parallax, no counters, no typewriter effects — motion that performs enthusiasm reads as marketing, and marketing reads as untrustworthy.

## 8. Voice rules (copy is part of the design system)

- Sentences assert; hedges live in grades, not adverbs.
- Honesty features are load-bearing: founding-phase disclosure, provisional counts, "not yet externally reviewed," review dates. Never remove them to look bigger — smallness stated plainly reads as integrity; smallness disguised reads as fraud.
- Banned vocabulary: *empowering, unlocking, transforming, revolutionize, insights, delve, landscape, cutting-edge.*
- Every figure caption states what is schematic, interpolated, or provisional.

## 9. Provenance rule (absolute)

Every statistic on any page traces to a named published artifact. No artifact → no number. Applies to prose, figures, node sizes, and status-strip counts (the strip counts exactly what the page shows: 1 domain, 6 claims, 1 dossier, 7 cited studies).
