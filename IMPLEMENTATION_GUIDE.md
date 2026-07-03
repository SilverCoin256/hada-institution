# Research Institution — Implementation Guide

## What's Built ✓

### Foundation
- **ARCHITECTURE.md** — Complete specification with information architecture, design system, component primitives, CMS schema
- **css/design-system.css** — Design tokens, typography, spacing, motion, utilities
- **css/components.css** — All reusable primitives: cards, badges, timeline, guestbook, notebook entries, etc.
- **js/research-universe.js** — Interactive, zoomable knowledge graph (force-directed layout, filtering, search)
- **data/sample-data.json** — CMS-ready schema with all content types

### Pages (1 of 6)
- **index.html** — Homepage with narrative hero, Research Universe preview, current investigations, findings, notebook feed, atlas preview, guestbook snippet

---

## What's Remaining

### Pages (5 more)

#### 1. research.html — Research Archive
```
Purpose: Complete publication, experiment, dataset, and method catalog
Components:
  - Filter sidebar (by year, status, method, domain, tag)
  - Tabbed view (All | Papers | Experiments | Datasets | Methods | Failures)
  - Card grid with Paper, Experiment, Dataset, Method components
  - Research Timeline (vertical, clickable)
  - Cross-linking system (papers ↔ datasets, methods ↔ papers, etc.)

Template structure:
  1. Header with filters
  2. Main content area (tabs + grid)
  3. Timeline sidebar
  4. Footer
```

#### 2. about.html — Research Philosophy
```
Purpose: Who, why, and how
Components:
  - Research Mission (2–3 paragraphs)
  - Why Institutions (visual + text explanation)
  - How I Work / Research OS (tools, methods, principles)
  - Career Timeline (milestones, projects, transitions)
  - Selected Influences (researchers, thinkers, projects)
  - Contact / Links

Uses Timeline component
```

#### 3. notebook.html — Public Research Journal
```
Purpose: Chronological research notes
Components:
  - Chronological feed (most recent first)
  - Each entry: Notebook Entry component
  - Filter by category, tag, date range
  - Archive view (monthly/yearly grouping)

Uses Notebook Entry component and filtering logic
```

#### 4. lab.html — Interactive Thinking
```
Purpose: Visual essays, simulations, concept explorers
Components:
  - Visual essays (scroll-driven with Fable 5)
  - Interactive simulations (draggable, responsive)
  - Concept explorers (annotated diagrams)
  - Data stories (visualizations with prose)

Note: Each piece is a standalone sandbox
```

#### 5. wall.html — Public Guestbook
```
Purpose: Signed endorsements from collaborators, reviewers, users
Components:
  - Guestbook grid (3-column masonry on desktop)
  - Filter by role (Collaborator | Reviewer | User | Researcher)
  - Rating display (aggregate stars)
  - Add Entry Form (Name, Role, Message, Rating)
  - Backend: localStorage for demo, Formspree/Firebase for production

Uses Guestbook Entry component
```

#### 6. atlas.html — Separate Product
```
Purpose: Portal to HADA (Human-AI Decision Atlas)
Components:
  - Brief teaser
  - Feature highlights (Explorer, Telemetry, Governance Registry, Sandbox)
  - iFrame or link to separate HADA instance
  - Documentation link

Note: HADA is a standalone product — this page is the gateway
```

---

## Additional Required Files

### Stylesheets
- **css/layout.css** — Page-specific layouts (header, footer, sidebar layouts)
- **css/utilities.css** — Additional utility classes for specific layouts

### Scripts
- **js/interactions.js** — Shared interaction logic (filters, search, reveal animations, nav)
- **js/data-loader.js** — Load and cache sample-data.json, populate components

### Data (expand sample-data.json)
- Add all actual papers, experiments, datasets, notebook entries
- Add all guestbook entries (or wire to API)
- Extend graph nodes with full research universe (currently just 7 sample nodes)

### Documentation
- **API.md** — If building a live API for content
- **CONTENT_GUIDE.md** — How to populate each content type
- **DEPLOYMENT.md** — How to deploy (static site, optional serverless functions)

---

## Build Order (Recommended)

### Phase 1: Layout & Utilities ✓ (Done)
- ✓ Design system
- ✓ Component library
- ✓ Homepage
- → Next: Research page (most complex)

### Phase 2: Archive & Navigation
- Research page (5 hours)
- About page (3 hours)
- Shared navigation & footer (2 hours)
- Layout CSS (2 hours)

### Phase 3: Content System
- Notebook page (3 hours)
- Guestbook wall (3 hours)
- Data loading & filtering logic (3 hours)

### Phase 4: Interactive
- Lab page skeleton (depends on content)
- Atlas page (depends on Atlas itself)

### Phase 5: Polish
- All pages fully responsive
- Motion refinements (Fable 5 integrations)
- Performance optimization

---

## Content Population Strategy

### For Claude Sonnet (future)
Every page is built from CMS primitives. To populate:

1. **Read** the ARCHITECTURE.md Content Schema section
2. **Generate** JSON objects matching the schema
3. **Populate** data/sample-data.json
4. **Components auto-render** from data

Example flow:
```javascript
// Data
{
  "id": "p5",
  "title": "New Paper Title",
  "authors": ["Author Name"],
  "year": 2026,
  "status": "published",
  // ... rest of schema
}

// Component renders automatically
const paperCard = renderPaperCard(data);
```

### For humans (now)
1. Update data/sample-data.json with real papers, experiments, notes
2. For each page, components will auto-render from data
3. No design changes needed—only content

---

## Technical Notes

### Interactivity
- **Research Universe graph** uses custom force simulation (no D3 dependency)
- **Filtering** is client-side (fast, no backend needed)
- **Search** is naive string matching (upgrade with Lunr.js if large dataset)
- **Reveal animations** use Intersection Observer API

### Performance
- All CSS is critical (no large frameworks)
- JavaScript is <100KB minified
- Graph renders smoothly at 60fps
- Responsive without media queries where possible (CSS Grid, CSS clamp)

### Accessibility
- Semantic HTML
- Focus management
- ARIA labels on interactive elements
- Keyboard navigation support
- Reduced motion support

### Browser Support
- Modern browsers (Chrome, Firefox, Safari, Edge)
- ES6 JavaScript
- CSS Grid, CSS Custom Properties
- No IE support (not needed)

---

## Deployment

### Static Site (Recommended)
```bash
# Files to deploy:
index.html
research.html
about.html
notebook.html
lab.html
wall.html
atlas.html
css/
js/
data/
```

### Hosting Options
- **Vercel** (Git + automatic deploys)
- **Netlify** (Git + functions for form submissions)
- **GitHub Pages** (free, simple)
- **Self-hosted** (nginx, Apache)

### Form Submissions (wall.html)
- **Development**: localStorage (built-in)
- **Production**: Formspree (free tier), Firebase, or custom endpoint

---

## Future Enhancements

### Short Term
- [ ] Full-text search (Lunr.js)
- [ ] Download datasets as CSV/JSON
- [ ] Citation exporter (BibTeX, APA, etc.)
- [ ] Dark mode toggle
- [ ] Print stylesheets

### Medium Term
- [ ] Comments on papers/notebook entries
- [ ] Collaborative research tracker (if multiple researchers)
- [ ] Archive versioning (Wayback Machine integration)
- [ ] Related research recommendations

### Long Term
- [ ] GraphQL API for external tools
- [ ] Social: Twitter threads, thread summaries
- [ ] RSS feed for notebook
- [ ] Integration with ORCID, Google Scholar APIs
- [ ] Real-time collaboration (if expanding to a lab)

---

## Quality Checklist

Before considering "done":

### Design
- [ ] All pages follow design system (spacing, type, color)
- [ ] All components are pixel-perfect across breakpoints
- [ ] Motion is intentional (teaches, not decorates)
- [ ] No AI-generation aesthetic (no blobs, gradients, particles)

### Content
- [ ] All research content is accurate and current
- [ ] Papers link to DOI/arXiv
- [ ] Datasets have documentation
- [ ] Notebook is dated and authentic
- [ ] Guestbook has at least 10 entries

### Interaction
- [ ] Research Universe graph is fast and responsive
- [ ] Filters work correctly across all pages
- [ ] Search finds what it should
- [ ] All links are working
- [ ] Forms submit correctly

### Performance
- [ ] Page loads in <2s on 3G
- [ ] Lighthouse score >90
- [ ] All images optimized
- [ ] No console errors or warnings

### Accessibility
- [ ] WCAG AA compliant
- [ ] Keyboard navigation works
- [ ] Screen reader compatible
- [ ] Reduced motion respected

---

## Getting Started (Next Steps)

1. **Choose content** — Decide which papers/experiments to feature
2. **Build research.html** — Most important page after home
3. **Wire data loader** — Make components auto-populate from JSON
4. **Build about.html** — Establish the research philosophy
5. **Add more notebook entries** — Make the journal feel active
6. **Test responsiveness** — Ensure all pages work on mobile
7. **Deploy** — Push to production

---

## File Structure

```
/hada-institution/
├── index.html                 ✓ Homepage
├── research.html              (next)
├── about.html
├── notebook.html
├── lab.html
├── wall.html
├── atlas.html
├── css/
│   ├── design-system.css     ✓
│   ├── components.css        ✓
│   ├── layout.css            (next)
│   └── utilities.css
├── js/
│   ├── research-universe.js  ✓ (interactive graph)
│   ├── interactions.js        (next)
│   └── data-loader.js
├── data/
│   └── sample-data.json      ✓ (CMS schema)
├── assets/                    (images, icons, videos)
├── ARCHITECTURE.md           ✓ (specification)
├── IMPLEMENTATION_GUIDE.md   ✓ (this file)
└── README.md                 (quick start)
```

---

## Design System Reference

### Colors
- `--bg: #ffffff` (background)
- `--ink: #0f0f0f` (primary text)
- `--accent: #2563eb` (research focus)
- Data: green, amber, red
- Border: `#e5e7eb`

### Typography
- **Headlines**: Space Grotesk (bold, editorial)
- **Body**: Inter (neutral, legible)
- **Mono**: Roboto Mono (data, code)

### Spacing
All multiples of 4px, capped at 128px:
`2, 4, 8, 12, 16, 24, 32, 48, 64, 96, 128`

### Motion
- Reveal: 0.7s, `cubic-bezier(.16, 1, .3, 1)`
- Hover: 0.3s, smooth easing
- All motion teaches; none decorates

---

## Contact & Questions

This is a living document. As you build, add notes here about:
- Design decisions made
- Content choices
- Technical solutions
- Future improvements

**Author**: Shaurya Gupta  
**Last Updated**: 2026-07-02  
**Status**: Foundation complete; pages in progress
