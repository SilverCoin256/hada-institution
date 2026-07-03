# Research Institution Digital Headquarters
## Complete Architecture & Design System

**Owner:** Shaurya Gupta  
**Identity:** Independent researcher in human-AI decision-making, institutions, governance  
**Date:** 2026-07-02

---

## INFORMATION ARCHITECTURE

```
HOME
├─ Narrative Hero (institutions → AI → breakdown)
├─ Central Research Question
├─ Research Universe Graph (interactive knowledge graph)
├─ Current Investigations (3–4 active projects)
├─ Selected Findings
├─ Research Timeline
├─ Notebook Feed (3 recent)
├─ Atlas Preview
└─ Guestbook Wall (snippet)

RESEARCH
├─ Papers (filterable: status, method, domain, year)
├─ Experiments (phase, sample, status)
├─ Datasets (reusable, documented, linked)
├─ Methods (formal models, behavioral designs, instrumentation)
├─ Open Science (code, replication packages, preprints)
├─ Failures (explicitly documented falsifications)
├─ Research Timeline (chronological)
└─ Cross-linking system

HADA ATLAS (standalone product)
├─ Explorer (interactive zoomable map)
├─ Telemetry (live indicators)
├─ Governance Registry
├─ Simulation Sandbox
├─ Data + Methodology
└─ API Docs

LAB (interactive thinking)
├─ Visual Essays
├─ Interactive Simulations
├─ Data Stories
├─ Concept Explorers
└─ Research Visualizations

NOTEBOOK (chronological journal)
├─ Public research entries
├─ Dated observations
├─ Dead ends & discoveries
├─ Hypotheses
├─ Data notes
└─ Reflections

ABOUT (research philosophy)
├─ Research Mission
├─ Why Institutions Matter
├─ How I Work
├─ Research OS (tools, methods, principles)
├─ Timeline
├─ Selected Influences
└─ Contact

WALL (signed guestbook)
├─ Public entries (researchers, collaborators, reviewers, users)
├─ 5-star rating system
├─ Chronological feed
└─ Filter by role
```

---

## DESIGN SYSTEM

### Typography Stack
```
Headlines:     Space Grotesk (400, 500, 700) – handcrafted, editorial
Body:          Inter (400, 500, 600) – neutral, legible
Monospace:     Roboto Mono (400, 500) – data, code, metadata
```

### Color Palette
```
Background:    #FFFFFF
Ink (primary): #0F0F0F
Ink (secondary): #666666
Accent:        #2563EB (cobalt – research focus)
Data:          #10B981 (data green), #F59E0B (warning amber), #EF4444 (critical red)
Border:        #E5E7EB
Hover:         #F3F4F6
```

### Spacing Scale
```
2px, 4px, 8px, 12px, 16px, 24px, 32px, 48px, 64px, 96px, 128px
Gaps:    8px (tight), 16px (normal), 24px (spacious)
Padding: 16px (card), 24px (section), 32px (container)
```

### Grids & Layout
```
Max-width:     1280px (main content)
Columns:       12-column for flexibility
Breakpoints:   768px (tablet), 1024px (desktop)
Gutter:        24px
```

### Motion Principles
```
Reveal:       opacity 0→1, translateY(24px)→0, 0.7s ease
Hover:        subtle scale/highlight, no spin/wobble
Scroll-driven: teach through motion, not decorate
Transitions:  cubic-bezier(.16, 1, .3, 1) for snappiness
```

---

## COMPONENT PRIMITIVES

Every page is composed from CMS-populatable primitives:

### 1. Research Question Card
```
[Question Title]
[Subtitle]
[Status indicator]
[Related papers count]
[Visual: simple icon]
```

### 2. Paper Card (minimal)
```
[Year] [Status badge: Under Review | Published | Preprint]
[Title]
[Authors]
[Method stack: Formal | Empirical | Instrumentation]
[DOI / arXiv link]
```

### 3. Experiment Card
```
[Title]
[Phase / Status]
[Duration]
[Sample details]
[Key findings (1 line)]
```

### 4. Dataset Card
```
[Dataset name]
[Records / Size]
[Status: Raw | Processed | Validated]
[Reuse link]
[License]
```

### 5. Method Block
```
[Method category: Formal Modeling | Behavioral | Instrumentation]
[Name]
[Description (1 paragraph)]
[Papers using this method]
```

### 6. Timeline Event
```
[Date range or single date]
[Title]
[Description]
[Status dot]
[Link]
```

### 7. Notebook Entry
```
[Date]
[Title]
[Category: Discovery | Failure | Observation | Hypothesis]
[Body text]
[Tags]
[Related papers/datasets]
```

### 8. Institution/Actor Card
```
[Name]
[Role in decision flow]
[Involvement type]
[Link to Atlas]
```

### 9. Finding Block
```
[Title]
[One key insight]
[Implication]
[Link to paper]
```

### 10. Quote Block
```
[Text]
[Source / Author / Context]
[Related work]
```

---

## RESEARCH UNIVERSE GRAPH

### Core Concept
A zoomable, interactive knowledge graph at the heart of the site. Users can:
- See all papers, experiments, datasets as nodes
- Understand connections between research threads
- Filter by domain, method, status, year
- Click nodes to drill into detail
- See research as an interconnected system

### Node Types & Colors
```
Research Question  → Navy blue
Paper             → Cobalt
Experiment        → Teal
Dataset           → Green
Finding           → Gold
Institution       → Gray
Concept           → Lavender
```

### Edge Types
```
Builds on         → solid line
Contradicts       → dashed line
Uses              → arrow
Informs           → dotted line
```

### Interaction
```
Hover nodes       → expand, show preview
Click nodes       → navigate to detail page
Drag background   → pan
Scroll wheel      → zoom (0.5x → 4x)
Filter sidebar    → by year, method, domain, status
Search bar        → find node by title/keyword
```

---

## NAVIGATION SYSTEM

### Primary Navigation
```
Top header, sticky:
[Logo: Shaurya Gupta]
  HOME | RESEARCH | HADA ATLAS | LAB | NOTEBOOK | ABOUT | CONTACT
[Research Universe icon / toggle]
```

### Breadcrumb (on detail pages)
```
HOME > RESEARCH > [Paper Title]
```

### Footer Navigation
```
Column 1: About this institution
Column 2: Research (Papers, Datasets, Methods)
Column 3: Public (Atlas, Notebook, Wall)
Column 4: Connect (Email, GitHub, Twitter, ORCID)
```

### Research Universe Global
```
Always accessible via icon in header
Opens fullscreen interactive graph
Overlay search, filters, legend
```

---

## PAGE BLUEPRINTS

### HOME
```
1. Narrative Hero
   "Institutions were built for human decisions."
   "We are now routing those decisions through machines."
   "I study what breaks."
   [Scroll to transform: human → org → institution → AI → network]

2. Central Research Question
   [Main question statement]
   [Visual: subtle animated flow]

3. Research Universe Preview
   [Zoomable graph (40% of viewport height)]
   [Caption: "Explore the full research map below"]

4. Current Investigations
   [3–4 cards: active projects, status, next steps]

5. Selected Findings
   [3 most recent key findings with links]

6. Research Timeline
   [Last 2 years, key milestones]

7. Notebook Feed
   [3 most recent notebook entries]

8. Atlas Preview
   [One striking visualization from HADA]
   [Teaser: "Live observatory of institutional AI adoption"]

9. Wall Preview
   [3 recent guestbook entries]

10. Footer with Research Universe link
```

### RESEARCH
```
1. Header
   [Title: "Research Archive"]
   [Subtitle: "Papers, experiments, datasets, methods"]

2. Filter/Search Sidebar
   [By year, status, method, domain, tag]

3. Main Content Area
   [Tabs: All | Papers | Experiments | Datasets | Methods | Failures]
   [Filterable card grid]
   [Each card links to detail page]

4. Research Timeline (always visible)
   [Vertical timeline, clickable events]
```

### ABOUT
```
1. Research Mission
   [Core paragraph on institutional AI research]

2. Why Institutions
   [Visual + text: why institutions as unit of analysis]

3. How I Work (Research OS)
   [Tools, methods, principles]
   [Visual: diagram of research workflow]

4. Timeline
   [Key career/research milestones]

5. Selected Influences
   [Researchers, thinkers, projects that shaped the work]

6. Contact
   [Email, GitHub, Twitter, ORCID, CV]
```

### NOTEBOOK
```
1. Chronological feed
   [Most recent first]

2. Each entry:
   [Date | Title | Category | Body | Tags | Related work]

3. Filter/sort
   [By category, tag, date range]

4. Archive view
   [Monthly grouping, year grouping]
```

### WALL
```
1. Guestbook grid
   [3-column masonry on desktop, 1 on mobile]

2. Filter by role
   [Collaborator | Reviewer | User | Researcher]

3. Rating system
   [Aggregate stars, recent first]

4. Add Entry Form
   [Name, Role, Rating, Message (max 280 chars)]
   [localStorage for demo, Formspree for production]
```

### LAB
```
1. Interactive experiments
   [Each piece has its own sandbox]

2. Visual essays
   [Scroll-driven storytelling with Fable 5]

3. Concept explorers
   [Draggable, interactive diagrams]

4. Data stories
   [Annotated visualizations]
```

### HADA ATLAS
```
[Treat as standalone product]
[See ATLAS.md for full specs]
[Link back to HOME, not integrated into nav]
```

---

## CMS CONTENT SCHEMA

Every piece of content is structured for automated population:

### Paper
```
{
  id: string
  title: string
  authors: string[]
  year: number
  status: "preprint" | "under-review" | "published"
  abstract: string
  doi: string (optional)
  arxiv: string (optional)
  methods: string[] (refs to Method IDs)
  domain: string[] (institution, labor, governance, cognition)
  dataset_ids: string[]
  code_url: string (optional)
  replication_url: string (optional)
  falsified: boolean
  key_finding: string (1 sentence)
  related_questions: string[] (question IDs)
  published_date: ISO 8601
  created_date: ISO 8601
}
```

### Experiment
```
{
  id: string
  title: string
  phase: number
  status: "planning" | "running" | "complete"
  duration: string
  sample_size: number
  sample_description: string
  methodology: string (ref to Method ID)
  key_finding: string
  dataset_id: string
  paper_ids: string[]
  start_date: ISO 8601
  end_date: ISO 8601 (nullable)
}
```

### Dataset
```
{
  id: string
  name: string
  description: string
  records: number
  size: string
  status: "raw" | "processed" | "validated"
  access_url: string
  documentation_url: string
  license: string
  format: string[] (CSV, JSON, etc.)
  paper_ids: string[]
  created_date: ISO 8601
  updated_date: ISO 8601
}
```

### Notebook Entry
```
{
  id: string
  date: ISO 8601
  title: string
  category: "discovery" | "failure" | "observation" | "hypothesis"
  body: string (markdown)
  tags: string[]
  related_papers: string[] (paper IDs)
  related_datasets: string[] (dataset IDs)
  visibility: "public" | "draft"
}
```

### Method
```
{
  id: string
  name: string
  category: "formal-modeling" | "behavioral" | "instrumentation"
  description: string (1 paragraph)
  papers_using: string[] (paper IDs)
  tools: string[]
  references: string[]
}
```

### Guestbook Entry
```
{
  id: string
  name: string
  role: string
  affiliation: string (optional)
  message: string (max 280)
  rating: number (1–5)
  date: ISO 8601
  visibility: "public" | "pending"
}
```

---

## TECHNICAL STACK

```
Frontend:     HTML5, CSS3, JavaScript (vanilla)
Motion:       Fable 5 (scroll-driven storytelling)
Graph:        Three.js or D3.js (research universe)
Data:         JSON (CMS-ready)
Deployment:   Static site (can be populated by LLM)
Hosting:      Vercel / Netlify (optional)
```

---

## SUCCESS METRICS

After 90 seconds on HOME:
> "This is not a portfolio. This is a researcher building an intellectual ecosystem."

After 10 minutes in RESEARCH:
> "I understand the rigor and methods behind this work."

After 20 minutes of exploration:
> "I'm discovering new connections and ideas."

The Research Universe graph should be the centerpiece that makes the work feel cohesive, not scattered.

---

## NEXT STEPS

1. Build Research Universe graph (interactive, zoomable)
2. Create component library (all primitives as reusable modules)
3. Build HOME page (narrative hero + graph preview)
4. Build RESEARCH page (filter system + card grid)
5. Build ABOUT page (mission + timeline)
6. Build NOTEBOOK page (chronological feed)
7. Build WALL page (guestbook)
8. Integrate LAB (interactive pieces)
9. CMS integration (content population system)
10. Deploy and populate with real content
