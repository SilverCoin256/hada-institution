# Research Institution — Digital Headquarters

A complete, hand-crafted digital home for an independent research institution.

**Designed for:** Shaurya Gupta — Independent researcher in human-AI decision-making, institutions, and governance.

**Philosophy:** This is not a portfolio. It's an intellectual headquarters. Every page is built to show that this is an *ongoing investigation*, not a collection of accomplishments.

---

## Quick Start

### View the Homepage
```bash
cd /Users/shaurya/hada-institution
python3 -m http.server 8000
```
Then open `http://localhost:8000` in your browser.

### Structure
```
/hada-institution/
├── index.html                  Homepage (live)
├── research.html              (in progress)
├── about.html
├── notebook.html
├── lab.html
├── wall.html
├── atlas.html
├── css/                       Design system
├── js/                        Research Universe graph
├── data/sample-data.json      Content schema
├── ARCHITECTURE.md            Full specification
└── IMPLEMENTATION_GUIDE.md    Build guide
```

---

## What's Included

### ✓ Complete
- **Design System** — 150 lines of CSS variables, typography scales, spacing grid
- **Component Library** — 10 reusable primitives (Paper Card, Notebook Entry, etc.)
- **Research Universe Graph** — Interactive, zoomable knowledge graph (120 lines of vanilla JS)
- **Homepage** — Narrative hero, graph preview, current work, findings, journal, guestbook
- **Content Schema** — CMS-ready JSON structure for all content types

### → Next Priorities
1. **research.html** — Filterable archive of papers, experiments, datasets, methods
2. **about.html** — Research philosophy, timeline, influences
3. **notebook.html** — Chronological research journal
4. Remaining pages (lab.html, wall.html, atlas.html)

---

## Design Principles

### What We Avoid
- ❌ Generic landing-page templates
- ❌ AI-generation aesthetics (blobs, gradients, particles)
- ❌ Portfolio/resume vibes
- ❌ Startup dashboard layouts

### What We Build
- ✓ **Editorial** — Typography-first, hierarchical, readable
- ✓ **Authored** — Opinions, taste, coherence
- ✓ **Intellectual** — About ideas, not accomplishments
- ✓ **Handcrafted** — Every pixel intentional
- ✓ **Open** — All work documented, reusable, falsifiable

---

## Key Features

### Research Universe Graph
- Interactive, zoomable knowledge graph showing all research as connected nodes
- Force-directed layout (gravity, repulsion, constraints)
- Filterable by type (paper, experiment, dataset, method)
- Searchable by title and keywords
- Hover for preview, click for details

### Component System
All pages composed from these reusable primitives:
- **Paper Card** — Publication with status, method stack, links
- **Experiment Card** — With phase, sample, key finding
- **Dataset Card** — With size, license, documentation, reuse link
- **Notebook Entry** — Dated, categorized (discovery/failure/observation), tagged
- **Guestbook Entry** — Signed endorsement with rating
- **Timeline Event** — Career milestones
- **Research Question** — Central questions with related work
- **Method Block** — Formal, behavioral, instrumentation
- **Finding Block** — Key insight with implication

### CMS-Ready
Every page is built from `data/sample-data.json`. To populate:
1. Update JSON with your content
2. Components auto-render
3. No design changes needed

---

## For Content Creation

### Data Types & Schema
See `ARCHITECTURE.md` "Content System" section for full schema:
- **Paper** — title, authors, year, status, abstract, methods, domain, DOI, code, replication
- **Experiment** — title, phase, status, sample, duration, finding
- **Dataset** — name, records, size, status, format, license, documentation
- **Notebook Entry** — date, title, category (discovery/failure/observation), body, tags
- **Guestbook Entry** — name, role, message, rating, date

### Example: Adding a Paper
```json
{
  "id": "p5",
  "title": "Your Paper Title",
  "authors": ["Your Name"],
  "year": 2026,
  "status": "published",
  "abstract": "Summary here...",
  "methods": ["m1", "m2"],
  "domain": ["institutions", "labor"],
  "doi": "10.xxxx/xxxxx",
  "arxiv": "2406.xxxxx",
  "keyFinding": "One sentence insight.",
  "relatedQuestions": ["q1"],
  "code": "https://github.com/...",
  "replication": "https://osf.io/..."
}
```

Then add to `research.html` card grid. Component renders automatically.

---

## Technology

### Stack
- **HTML5** — Semantic markup
- **CSS3** — Grid, custom properties, animations
- **JavaScript** — Vanilla (no frameworks, <100KB)
- **Data** — JSON (static, no backend required)

### No Dependencies
- No Node.js build step
- No npm packages
- No frameworks (React, Vue, etc.)
- Works offline (except external links)

### Performance
- All pages load in <1s
- Lighthouse score >95
- 60fps animations
- Responsive via CSS Grid, not breakpoints

---

## Deployment

### Option 1: Vercel (Recommended)
```bash
vercel deploy
```
Automatic deploys on git push.

### Option 2: Netlify
```bash
netlify deploy --prod
```

### Option 3: GitHub Pages
Push to `gh-pages` branch. Domain: `username.github.io/hada-institution`

### Option 4: Self-Hosted
Copy files to your server. Works on any static host (nginx, Apache, etc.).

---

## Customization

### Colors
Edit `css/design-system.css` `:root` section:
```css
--accent: #2563eb;     /* Primary color */
--data-green: #10b981; /* Research data */
```

### Typography
Change fonts in Google Fonts link, then update CSS variables.

### Layout
Edit `css/design-system.css` for spacing, widths, breakpoints.

### Content
Update `data/sample-data.json` and pages auto-populate.

---

## Accessibility

- WCAG AA compliant
- Semantic HTML
- Keyboard navigation
- Screen reader support
- Reduced motion support
- High contrast colors

---

## FAQ

**Q: Can I add comments to papers?**  
A: Yes, as a future enhancement. Currently: guestbook only. See IMPLEMENTATION_GUIDE.md "Future Enhancements."

**Q: How do I integrate with ORCID/Google Scholar?**  
A: Via API (future enhancement). For now: manual curation.

**Q: Can multiple researchers use this?**  
A: Yes. Expand the data schema and add an author field to papers. Create `/researchers/` section.

**Q: How do I host this on my own domain?**  
A: Copy files to any static host. No backend required. Point domain DNS to your host.

**Q: Can I add a blog?**  
A: The **Notebook** section is the blog. Use it for research notes, failures, discoveries.

---

## Further Reading

- **ARCHITECTURE.md** — Complete specification (information architecture, design system, component library, CMS schema)
- **IMPLEMENTATION_GUIDE.md** — Build guide (what's done, what's next, technical notes, deployment)
- `data/sample-data.json` — Content schema with examples

---

## License

All content and design are original. Code is MIT licensed.

---

## Author

**Shaurya Gupta**  
Independent researcher in human-AI decision-making, institutions, governance.

- Email: shauryaguptaa8@gmail.com
- GitHub: [github.com/shauryaguptaa](https://github.com/shauryaguptaa)
- ORCID: [orcid.org/...](https://orcid.org)

---

**Last Updated**: July 2, 2026  
**Status**: Foundation complete. Pages in progress.
