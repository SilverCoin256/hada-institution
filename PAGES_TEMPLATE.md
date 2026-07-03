# Pages Template & Quick Reference

Use this template for building the remaining 5 pages (research, about, notebook, lab, wall, atlas).

---

## Page Structure (Template)

```html
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>[Page Title] — Shaurya Gupta</title>
<meta name="description" content="[Brief description]">

<!-- Fonts -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;700&family=Inter:wght@400;500;600&family=Roboto+Mono:wght@400;500&display=swap" rel="stylesheet">

<!-- Stylesheets -->
<link rel="stylesheet" href="css/design-system.css">
<link rel="stylesheet" href="css/components.css">
<link rel="stylesheet" href="css/[page-specific].css">
</head>
<body>

<!-- Navigation (copy from index.html) -->
<header>
  <nav>
    <div class="nav-brand">Shaurya Gupta</div>
    <ul class="nav-links">
      <li><a href="index.html">Home</a></li>
      <li><a href="research.html" class="active">Research</a></li>
      <!-- ... -->
    </ul>
  </nav>
</header>

<main>
  <!-- Page content here -->
</main>

<!-- Footer (copy from index.html) -->
<footer>
  <!-- ... -->
</footer>

<!-- Scripts -->
<script src="js/research-universe.js"></script>
<script src="js/data-loader.js"></script>
<script>
// Load data and render components
fetch('data/sample-data.json')
  .then(r => r.json())
  .then(data => {
    // Populate page from data
    // Example: renderPapers(data.papers)
  });
</script>
</body>
</html>
```

---

## Page-by-Page Breakdown

### 1. research.html — Research Archive

**Components**: Filter sidebar, Tabs, Paper/Experiment/Dataset/Method cards, Timeline

**Data Used**: `papers`, `experiments`, `datasets`, `methods`

**HTML Structure**:
```html
<header>Filter sidebar</header>
<main>
  <section class="filter-bar">
    <input id="search" placeholder="Search...">
    <div class="filters">
      <div class="filter-group">
        <label>Year</label>
        <select id="year-filter">
          <option value="">All</option>
          <option value="2026">2026</option>
          <option value="2025">2025</option>
        </select>
      </div>
      <!-- More filters: status, method, domain -->
    </div>
  </section>
  <section class="tabs">
    <button class="tab active" data-tab="all">All</button>
    <button class="tab" data-tab="papers">Papers</button>
    <button class="tab" data-tab="experiments">Experiments</button>
    <button class="tab" data-tab="datasets">Datasets</button>
    <button class="tab" data-tab="methods">Methods</button>
    <button class="tab" data-tab="failures">Failures</button>
  </section>
  <section class="content">
    <div id="papers-grid" class="grid-3">
      <!-- Paper cards render here -->
    </div>
    <aside class="timeline">
      <!-- Research timeline renders here -->
    </aside>
  </section>
</main>
```

**JavaScript Needed**:
```javascript
// Filter papers by year, status, method, domain, search
function filterPapers(data, filters) {
  return data.papers.filter(p => {
    if (filters.year && p.year !== filters.year) return false;
    if (filters.status && p.status !== filters.status) return false;
    if (filters.method && !p.methods.includes(filters.method)) return false;
    if (filters.search && !p.title.toLowerCase().includes(filters.search)) return false;
    return true;
  });
}

// Render paper cards
function renderPaperCards(papers) {
  return papers.map(p => `
    <div class="paper-card reveal">
      <div class="year">${p.year}</div>
      <span class="badge ${p.status}">${p.status}</span>
      <h4>${p.title}</h4>
      <div class="authors">${p.authors.join(', ')}</div>
      <div class="method-stack">
        ${p.methods.map(m => `<span class="method-tag">${m}</span>`).join('')}
      </div>
      <div class="links">
        ${p.doi ? `<a href="https://doi.org/${p.doi}">DOI</a>` : ''}
        ${p.arxiv ? `<a href="https://arxiv.org/${p.arxiv}">arXiv</a>` : ''}
        ${p.code ? `<a href="${p.code}">Code</a>` : ''}
      </div>
    </div>
  `).join('');
}
```

---

### 2. about.html — Research Philosophy

**Components**: Text blocks, Timeline, Influence cards

**Data Used**: `metadata`, (custom content)

**Sections**:
1. Research Mission (prose)
2. Why Institutions (visual + text)
3. How I Work / Research OS (tools, methods, principles)
4. Career Timeline (timeline component)
5. Selected Influences (cards with links)
6. Contact / Links

**No JavaScript needed** — mostly static content.

---

### 3. notebook.html — Research Journal

**Components**: Chronological feed of Notebook Entry cards, filters, archive view

**Data Used**: `notebookEntries`

**HTML**:
```html
<section class="filters">
  <input id="search" placeholder="Search notes...">
  <select id="category-filter">
    <option value="">All categories</option>
    <option value="discovery">Discovery</option>
    <option value="failure">Failure</option>
    <option value="observation">Observation</option>
    <option value="hypothesis">Hypothesis</option>
  </select>
</section>

<section id="notebook-feed">
  <!-- Entries render chronologically, most recent first -->
</section>

<section id="archive">
  <!-- Grouped by month/year for browsing -->
</section>
```

**JavaScript**:
```javascript
function renderNotebookFeed(entries) {
  return entries
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .map(e => `
      <div class="notebook-entry reveal">
        <div class="date">${new Date(e.date).toLocaleDateString()}</div>
        <h4>${e.title}</h4>
        <span class="category">${e.category}</span>
        <p>${e.body}</p>
        <div class="tags">
          ${e.tags.map(t => `<span class="tag">${t}</span>`).join('')}
        </div>
      </div>
    `).join('');
}
```

---

### 4. wall.html — Guestbook

**Components**: Guestbook Entry cards (masonry grid), Add Entry form, Rating display

**Data Used**: `guestbook`

**HTML**:
```html
<section class="rating-display">
  <div class="average-rating">
    <span id="avg-rating">4.7</span>
    <span id="rating-count">3 ratings</span>
  </div>
</section>

<section class="filter-bar">
  <select id="role-filter">
    <option value="">All roles</option>
    <option value="Collaborator">Collaborator</option>
    <option value="Reviewer">Reviewer</option>
    <option value="User">User</option>
  </select>
</section>

<form id="add-entry-form" class="entry-form">
  <input id="name" required maxlength="40" placeholder="Your name">
  <input id="role" required maxlength="60" placeholder="Your role / affiliation">
  <input id="message" required maxlength="280" placeholder="A few good words...">
  <div class="rating-input">
    <label>Rate my work: 
      <input id="rating" type="number" min="1" max="5" value="5">
    </label>
  </div>
  <button type="submit" class="btn">Post to the wall →</button>
</form>

<div id="guestbook-grid" class="masonry">
  <!-- Guestbook entries render here -->
</div>
```

**JavaScript**:
```javascript
function renderGuestbookEntry(entry) {
  return `
    <div class="guestbook-entry reveal">
      <div class="quote">"</div>
      <p class="message">${entry.message}</p>
      <div class="author">${entry.name}</div>
      <div class="role">${entry.role}</div>
      <div class="stars">${'★'.repeat(entry.rating)}${'☆'.repeat(5-entry.rating)}</div>
    </div>
  `;
}

// Form submission
document.getElementById('add-entry-form').addEventListener('submit', e => {
  e.preventDefault();
  const entry = {
    name: document.getElementById('name').value,
    role: document.getElementById('role').value,
    message: document.getElementById('message').value,
    rating: parseInt(document.getElementById('rating').value),
    date: new Date().toISOString(),
  };
  
  // For demo: save to localStorage
  let entries = JSON.parse(localStorage.getItem('guestbook') || '[]');
  entries.unshift(entry);
  localStorage.setItem('guestbook', JSON.stringify(entries));
  
  // Refresh display
  location.reload();
});
```

---

### 5. lab.html — Interactive Thinking

**Components**: Custom (visual essays, simulations, concept explorers)

**No standard data structure** — each piece is a sandbox.

**Example structure**:
```html
<section class="lab-piece" id="piece-1">
  <h2>Visual Essay: Oversight Saturation</h2>
  <p class="subtitle">A scroll-driven visualization</p>
  <div class="essay-container">
    <!-- Fable 5 or custom animation here -->
    <canvas id="saturation-viz"></canvas>
  </div>
  <p class="explanation">Explanation of what the visualization shows...</p>
</section>

<section class="lab-piece" id="piece-2">
  <h2>Friction Sandbox</h2>
  <p class="subtitle">Explore decision-making under constraints</p>
  <div class="simulator">
    <!-- Interactive component -->
    <canvas id="friction-sandbox"></canvas>
    <div class="controls">
      <label>Delegation load: <input type="range" id="load" min="0" max="100"></label>
      <!-- More controls -->
    </div>
  </div>
</section>
```

---

### 6. atlas.html — Gateway

**Purpose**: Portal to HADA (Human-AI Decision Atlas)

**Simple structure** (can be one page):
```html
<section class="atlas-hero">
  <h1>Human-AI Decision Atlas</h1>
  <p class="tagline">A live observatory of institutional AI adoption</p>
  <a href="https://atlas.hadaproject.org" class="btn">Enter the Atlas →</a>
</section>

<section class="features">
  <div class="feature">
    <h3>Explorer</h3>
    <p>Zoomable map of 14,000 organizations across 43 jurisdictions.</p>
  </div>
  <!-- More features -->
</section>

<section class="stats">
  <div class="stat">
    <div class="number">14,000</div>
    <div class="label">Organizations in panel</div>
  </div>
  <!-- More stats -->
</section>
```

---

## Common Patterns

### Filtering
```javascript
function applyFilters(items, filters) {
  return items.filter(item => {
    // Check each filter
    if (filters.year && item.year !== filters.year) return false;
    if (filters.status && item.status !== filters.status) return false;
    if (filters.search && !item.title.toLowerCase().includes(filters.search.toLowerCase())) return false;
    return true;
  });
}
```

### Rendering Components
```javascript
function renderComponent(data, componentName) {
  const component = document.createElement('div');
  component.className = 'reveal';
  component.innerHTML = `
    <div class="${componentName}">
      <h3>${data.title}</h3>
      <p>${data.description}</p>
    </div>
  `;
  return component;
}
```

### Pagination (if needed)
```javascript
function paginate(items, pageSize = 12) {
  const pages = [];
  for (let i = 0; i < items.length; i += pageSize) {
    pages.push(items.slice(i, i + pageSize));
  }
  return pages;
}
```

### Data Loading
```javascript
fetch('data/sample-data.json')
  .then(r => r.json())
  .then(data => {
    // data.papers, data.experiments, data.notebookEntries, etc.
    renderPage(data);
  });
```

---

## CSS Patterns

### Responsive Grid
```css
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: var(--space-24);
}
```

### Reveal Animation
```css
.reveal {
  opacity: 0;
  transform: translateY(24px);
  transition: opacity 0.7s cubic-bezier(.16, 1, .3, 1),
              transform 0.7s cubic-bezier(.16, 1, .3, 1);
}

.reveal.in {
  opacity: 1;
  transform: translateY(0);
}
```

### Intersection Observer
```javascript
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
```

---

## Color Usage

For badges/status:
```css
.badge.success  { background: rgba(16, 185, 129, 0.1); color: var(--data-green); }
.badge.warning  { background: rgba(245, 158, 11, 0.1); color: var(--data-amber); }
.badge.error    { background: rgba(239, 68, 68, 0.1); color: var(--data-red); }
.badge.accent   { background: var(--accent-soft); color: var(--accent); }
```

---

## Testing Checklist (per page)

- [ ] All data renders from JSON (no hardcoded values)
- [ ] Responsive (test at 375px, 768px, 1280px)
- [ ] Animations smooth (no jank)
- [ ] Links work (internal and external)
- [ ] Filters work correctly
- [ ] Search/sort functions work
- [ ] No console errors
- [ ] Accessibility: keyboard nav, screen reader
- [ ] Design system followed (spacing, colors, type)

---

## Next Page Priority

**1. research.html** (Most important)
- Most content-heavy
- Sets the tone for archive
- Filters & search are key interactions
- Est. 5–6 hours

**2. about.html** (Core identity)
- Establishes research philosophy
- Career narrative
- Est. 2–3 hours

**3. notebook.html** (Makes it feel alive)
- Chronological feed
- Shows ongoing work
- Est. 2–3 hours

**4. wall.html** (Community)
- Guestbook form
- Rating display
- Est. 2 hours

**5. lab.html** (Depends on content)
- Custom interactive pieces
- Time varies by complexity
- Est. 4–8 hours

**6. atlas.html** (Gateway)
- Simple page
- Links to HADA instance
- Est. 1 hour

---

## File Locations

- Components: `css/components.css`
- Design tokens: `css/design-system.css`
- Data: `data/sample-data.json`
- Graph: `js/research-universe.js`
- Scripts: `js/[new files as needed]`

All reusable. No duplication needed.
